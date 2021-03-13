const express = require('express');
const eventsController = require('../controllers/eventsController');
const authController = require('./../controllers/authController');

const router = express.Router({
  mergeParams: true
});

router.use(authController.getToken);

router
  .route('/')
  .get(eventsController.getEvents)
  .post(
    eventsController.validateEventsData,
    eventsController.createEvent
  );

router
  .route('/:eventID')
  .get(eventsController.getEvent);

router
.route('/registerAttendee')
.post(
    eventsController.registerAttendee
    );
router
.route('/registerAttendees')
.post(
    eventsController.registerAttendees
    );


module.exports = router;
