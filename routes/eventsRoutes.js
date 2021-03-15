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
  .route('/registerAttendee')
  .post(
      eventsController.registerAttendee
      );
  router
  .route('/registerAttendees')
  .post(
      eventsController.registerAttendees
      );
router
  .route('/:eventID')
  .get(eventsController.getEvent)
  .patch(
    // create a validate function for checking incoming data
    eventsController.updateEvent)

router
    .route('/:userID/myEvents')
    .get(eventsController.getAllUserEvents)

router
    .route('/:userID/:eventID')
    .get(eventsController.getAllUserEvents)
    


module.exports = router;
