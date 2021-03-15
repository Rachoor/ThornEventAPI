const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const authController = require('./../controllers/authController');

const router = express.Router({
  mergeParams: true
});

router.use(authController.getToken);

router
  .route('/')
  .get(categoriesController.getCategories)


module.exports = router;
