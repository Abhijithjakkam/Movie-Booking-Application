const mongoose = require('mongoose');

const notificationSubscriptionSchema = new mongoose.Schema({
    subscription : {
        type:Object,
        required:true
    }
});

const notificationSubscriptionModel = mongoose.model('notificationSubscription', notificationSubscriptionSchema);
module.exports = notificationSubscriptionModel;