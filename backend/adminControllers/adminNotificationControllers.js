const notificationSubscriptionModel = require("../models/notificationSubscriptionModel");
const webpush = require('web-push');

const apiKeys = {
    publicKey: "BORNiMxIHeXXornTwCKSsj_RO1rxFJmNTbLG54B0s65RJoVfSHU3JstKgKJMEmpVz3YPom_crEhiaPxa8YonSFM",
    privateKey: "8ioY9ccXghSdSZj7-He97liDlGUVXT18SO-ylvCJFVI"
}

webpush.setVapidDetails(
    'mailto:YOUR_MAILTO_STRING',
    apiKeys.publicKey,
    apiKeys.privateKey
)

async function sendNotification(req, res) {

    try {
        const { message } = req.body;
        if ((!message) || (typeof (message) !== "string")) {
            return res.status(400).json({ message: "Please send a valid string message" });
        }
        const subscriptions = await notificationSubscriptionModel.find({});
        const result = await Promise.all(subscriptions.map(async ({ subscription }) => {
            return await webpush.sendNotification(subscription, message);
        }))

        return res.status(200).json({ "message": "Message sent to push service" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Oops! Try again after sometime' });
    }
}

module.exports = { sendNotification };