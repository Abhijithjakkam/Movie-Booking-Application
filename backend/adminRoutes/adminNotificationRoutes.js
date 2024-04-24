const express = require('express')
const adminNotificationRouter = express.Router();
const { sendNotification } = require('../adminControllers/adminNotificationControllers.js');



// POST /api/admin/send_notification
// Send a notification to everyone
adminNotificationRouter.post('/send_notification', sendNotification);
 

module.exports = {adminNotificationRouter};