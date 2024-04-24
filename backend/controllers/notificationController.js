const notificationSubscriptionModel = require("../models/notificationSubscriptionModel");

async function saveSubscription(req, res) {
    try {
        await notificationSubscriptionModel.create({
            subscription: req.body
        })
        res.status(201).json({ message: "Subscription saved!" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Oops! Try again after sometime' });
    }
}

module.exports= { saveSubscription }