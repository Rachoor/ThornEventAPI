const express = require('express');
const sessionsController = require('../controllers/sessionsController');
const authController = require('./../controllers/authController');

const router = express.Router({
  mergeParams: true
});

router.use(authController.getToken);


router
  .route('/:eventID')
  .get(sessionsController.getSessions)
  .post(
    sessionsController.validateSessionsData,
    sessionsController.createSession
  );

router
  .route('/:eventID/:sessionID')
  .get(sessionsController.getSession)
  .patch(
    //   create validate function to validate sessions data
      sessionsController.updateSession)
  .delete(sessionsController.deleteSession);

module.exports = router;
