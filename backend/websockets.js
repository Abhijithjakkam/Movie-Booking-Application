const { Server } = require("socket.io");
const { app, corsOptions } = require("./app");
const https = require("https");
const fs = require("fs");
const path = require("path");

const selectedSeatMap = {};
const socketSeatMap = {};



//Setting up ssl
const options = {
    key: fs.readFileSync(path.join(__dirname, "./cert/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "./cert/cert.pem")),
};
//websockets config
const httpsServer = https.createServer(options, app);
const io = new Server(httpsServer, {
    cors: corsOptions,
});

function sendAcknowledgement(ackFunction, message) {
    if (typeof (ackFunction) == "function") {
        ackFunction({
            status: message
        });
    }
}

function getArg(args, key) {
    let result;
    try {
        if (typeof (args) == "string") {
            result = JSON.parse(args)[key];
        }
        else if (typeof (args) == "object") {
            result = args[key];
        }
    }
    catch (err) {

    }
    return result;
}

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        //Making socket seat map typesafe
        if (typeof (socketSeatMap[socket.id]?.size) != "number") {
            socketSeatMap[socket.id] = new Set();
        }

        let seats = {};

        for (const showIdandSeatNumber of socketSeatMap[socket.id]) {
            const [show_id, seatNumber] = showIdandSeatNumber.split('+');


            //Make selected seat map type safe
            if (typeof (selectedSeatMap[show_id]) != "object") {
                selectedSeatMap[show_id] = {}
            }

            //Deselect the seat
            if (selectedSeatMap[show_id][seatNumber]) {
                seats[show_id] = seats[show_id] || [];
                seats[show_id].push(seatNumber);
                delete selectedSeatMap[show_id][seatNumber]
            }
        }

        Object.keys(seats).forEach(show_id => {
            //Broadcast to everyone that seats were deselected
            socket.broadcast.to(show_id).emit("deselected seats", {
                show_id: show_id,
                seatNumbers: seats[show_id]
            })
        })



        //Delete the map
        delete socketSeatMap[socket.id];
    })


    socket.on("viewing show", async (args, ackFunction) => {
        let show_id = getArg(args, "show_id");
        if (typeof (show_id) != "string") {
            sendAcknowledgement(ackFunction, "failed");
            return;
        }
        await socket.join(show_id);
        sendAcknowledgement(ackFunction, "ok");

        if (typeof (selectedSeatMap[show_id]) != "object") {
            selectedSeatMap[show_id] = {};
        }

        socket.emit("previously selected seats", Object.keys(selectedSeatMap[show_id]))

    })


    socket.on("not viewing show", async (args, ackFunction) => {
        let show_id = getArg(args, "show_id");
        if (typeof (show_id) != "string") {
            sendAcknowledgement(ackFunction, "failed");
            return;
        }
        await socket.leave(show_id);

        //Making socket seat map typesafe
        if (typeof (socketSeatMap[socket.id]?.size) != "number") {
            socketSeatMap[socket.id] = new Set();
        }

        let seats = {};

        for (const showIdandSeatNumber of socketSeatMap[socket.id]) {
            const [show_id_in_map, seatNumber] = showIdandSeatNumber.split('+');

            //if this isn't for his show id, skip
            if (show_id != show_id_in_map) {
                continue;
            }


            //Make selected seat map type safe
            if (typeof (selectedSeatMap[show_id_in_map]) != "object") {
                selectedSeatMap[show_id_in_map] = {}
            }

            //Deselect the seat
            if (selectedSeatMap[show_id_in_map][seatNumber]) {
                seats[show_id_in_map] = seats[show_id_in_map] || [];
                seats[show_id_in_map].push(seatNumber);
                delete selectedSeatMap[show_id_in_map][seatNumber]
            }
        }

        Object.keys(seats).forEach(show_id => {
            //Broadcast to everyone that seats were deselected
            socket.broadcast.to(show_id).emit("deselected seats", {
                show_id: show_id,
                seatNumbers: seats[show_id]
            })
        })
        sendAcknowledgement(ackFunction, "ok");

    })


    socket.on("selected seat", async (args, ackFunction) => {

        //Get and type check the arguments
        let seatNumber = getArg(args, "seatNumber");
        let show_id = getArg(args, "show_id");
        if ((typeof (seatNumber) != "string") || (typeof (show_id) != "string")) {

            sendAcknowledgement(ackFunction, "failed");
            return;
        }

        //Make selected seat map type safe
        if (typeof (selectedSeatMap[show_id]) != "object") {
            selectedSeatMap[show_id] = {}
        }

        //Is the seat already selected?
        if (selectedSeatMap[show_id][seatNumber]) {
            //Fails
            sendAcknowledgement(ackFunction, "failed");
            return;
        }

        //Making socket seat map typesafe
        if (typeof (socketSeatMap[socket.id]?.size) != "number") {
            socketSeatMap[socket.id] = new Set();
        }


        //Book the seat
        selectedSeatMap[show_id][seatNumber] = true;

        //This socket booked this seat
        socketSeatMap[socket.id].add(show_id + "+" + seatNumber);

        //Success, broadcast it to everyone viewing this show page
        sendAcknowledgement(ackFunction, "ok");
        socket.broadcast.to(show_id).emit("selected seat", {
            show_id,
            seatNumber
        })
    })


    socket.on("deselected seat", async (args, ackFunction) => {

        //Get and type check the arguments
        let seatNumber = getArg(args, "seatNumber");
        let show_id = getArg(args, "show_id");
        if ((typeof (seatNumber) != "string") || (typeof (show_id) != "string")) {

            sendAcknowledgement(ackFunction, "failed");
            return;
        }

        //Make selected seat map type safe
        if (typeof (selectedSeatMap[show_id]) != "object") {
            selectedSeatMap[show_id] = {}
        }

        //Is the seat not selected already?
        if (!selectedSeatMap[show_id][seatNumber]) {
            //Fails
            sendAcknowledgement(ackFunction, "failed");
            return;
        }

        //Making socket seat map typesafe
        if (typeof (socketSeatMap[socket.id]?.size) != "number") {
            socketSeatMap[socket.id] = new Set();
        }

        //Was this seat selected by someone else?
        if (!socketSeatMap[socket.id].has(show_id + "+" + seatNumber)) {
            //Fails
            sendAcknowledgement(ackFunction, "failed");
            return;
        }


        //Deselect the seat
        delete selectedSeatMap[show_id][seatNumber];
        socketSeatMap[socket.id].delete(show_id + "+" + seatNumber);

        //Success, broadcast it to everyone
        sendAcknowledgement(ackFunction, "ok");
        socket.broadcast.to(show_id).emit("deselected seat", {
            show_id,
            seatNumber
        })
    })
});

module.exports = { httpsServer };