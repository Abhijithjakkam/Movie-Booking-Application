const express = require('express')
const notificationRouter = express.Router();
const { saveSubscription } = require('../controllers/notificationController.js');



// POST /api/notification/add_subscription
// Save a notification subscription
notificationRouter.post('/add_subscription', saveSubscription);
 

module.exports = {notificationRouter};