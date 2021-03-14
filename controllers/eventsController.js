// @ts-nocheck
const { validate, ValidationError, Joi } = require('express-validation')

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory= require('./handleFactory');
const authController = require('./authController');



exports.validateEventsData = (req,res,next)=>{
  const JoiSchema = Joi.object({
      title__c:Joi.string  ().required(),
      status__c:Joi.string().required().valid('Draft', 'Open', 'Sold Out', 'Closed'),
      registrationLimit__c:Joi.number().required(),
      // remainingSeats:Joi.number().required(),
      startDate__c:Joi.date().required(),
      startTime__c:Joi.string().required().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
      endDate__c:Joi.date().required(),
      endTime__c:Joi.string().required().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
      description__c:Joi.string().required()
    })
  

  const validation = JoiSchema.validate(req.body);
  if( validation.error ) {
    return res.status(400).json({
      message : validation.error.details
    })
  } else{
    next();
  }
}
  
exports.createEvent = factory.createOne('ThornEvent__c');
  

  exports.getEvent = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  
  // exports.getEvents = (req, res) => {
  //   var q = 'SELECT title__c, startDate__c, endDate__c, registrationLimit__c, startTime__c, endTime__c, description__c, status__c FROM ThornEvent__c';
  //   authController.org.query({ query: q, oauth:JSON.parse(process.env.OAUTH) }, function(err, resp){
  //     if(!err) {
  //       res.status(200).json({
  //       status: 'success',
  //       data:resp.records
  //   });
  //   }
  //   else {
  //     res.status(err.statusCode).json(err);
  //     }
  //   });
  // };

  exports.getEvents = factory.getAll(`
  SELECT 
  id,
  title__c, 
  category__c,
  imageURL__c,
  startDate__c, 
  endDate__c, 
  registrationLimit__c, 
  startTime__c, 
  endTime__c, 
  description__c, 
  status__c 
  FROM 
  ThornEvent__c
  `);
  
  exports.registerAttendee = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };

  exports.registerAttendees = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  
