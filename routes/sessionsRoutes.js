const express = require('express');
const sessionsController = require('../controllers/sessionsController');
const authController = require('./../controllers/authController');
const validateController = require('./../controllers/validateController');

const router = express.Router({
  mergeParams: true
});

router.use(authController.getToken);


router
  .route('/:eventID')
  .get(sessionsController.getSessions)
  .post(
    validateController.validateData(validateController.JoiSessionSchema),
    sessionsController.createSession
  );

router
  .route('/:eventID/:sessionID')
  .get(sessionsController.getSession)
  .patch(
      validateController.validateData(validateController.JoiUpdateSessionSchema),
      sessionsController.updateSession)
  .delete(sessionsController.deleteSession);

module.exports = router;
