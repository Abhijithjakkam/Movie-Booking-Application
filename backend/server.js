const mongoose = require("mongoose");
const { httpsServer } = require("./websockets");
const url = process.env.MONGODB_URL;
const PORT = process.env.PORT;

mongoose
  .connect(url, {})
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((error) => {
    console.log(error);
  });



// // Start the server
httpsServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
