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

exports.validateAttendeeData = (req,res,next)=>{
  const JoiSchema = Joi.object({
    firstName__c:Joi.string().required(),
    lastName__c:Joi.string().required,
    email__c:Joi.email().required(),
    phone__c:Joi.phone().required(),
    company__c:Joi.string().required(),
    // session
  });
};
  

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
  
exports.getEvent = async (req,res)=>{
    let query =  `SELECT
                    Id, 
                    title__c, 
                    startDate__c, 
                    endDate__c, 
                    registrationLimit__c, 
                    startTime__c, 
                    endTime__c, 
                    description__c, 
                    Category__r.name__c,
                    status__c 
                    FROM 
                    ThornEvent__c
                    WHERE 
                    Id='${req.params.eventID}'
                    `;
     await factory.getData(req,res,query);
  }


  exports.getEvents = async (req,res)=>{
    // make OAUTH token checking here
    let query = `
    SELECT 
    Id,
    title__c, 
    startDate__c, 
    endDate__c, 
    registrationLimit__c, 
    startTime__c, 
    endTime__c, 
    description__c, 
    status__c,
    Category__r.name__c,
    seatsRemaining__c
    FROM 
    ThornEvent__c
    `;
    await factory.getData(req,res,query);
  }

  exports.getAllUserEvents = async (req,res)=>{
    let query = `
    SELECT 
    Id,
    title__c, 
    startDate__c, 
    endDate__c, 
    registrationLimit__c, 
    startTime__c, 
    endTime__c, 
    description__c, 
    status__c,
    Category__r.name__c,
    seatsRemaining__c
    FROM 
    ThornEvent__c
    WHERE
    createdUserId__c='${req.params.userID}'
    `;
    await factory.getData(req,res,query);
  }

  exports.getAllUserEvent = async (req,res)=>{
    let query = `
    SELECT 
    Id,
    title__c, 
    startDate__c, 
    endDate__c, 
    registrationLimit__c, 
    startTime__c, 
    endTime__c, 
    description__c, 
    status__c,
    Category__r.name__c,
    seatsRemaining__c
    FROM 
    ThornEvent__c
    WHERE
    createdUserId__c='${req.params.userID}'
    AND
    Id='${req.params.eventID}'
    `;
    await factory.getData(req,res,query);
  }
  
  exports.updateEvent = async(req,res) =>{
    // query to retrieve record    
    let query = `SELECT 
                  Id,
                  title__c, 
                  startDate__c, 
                  endDate__c, 
                  registrationLimit__c, 
                  startTime__c, 
                  endTime__c, 
                  description__c, 
                  status__c,
                  category__c,
                  seatsRemaining__c
                  FROM 
                  ThornEvent__c
                  WHERE
                  Id='${req.params.eventID}'`;
    await factory.updateData(req,res,query);
  }

  exports.deleteEvent = async (req,res)=>{
    
  }
  
  exports.registerAttendee = (req, res) => {
    console.log(req.body)
    // res.status(500).json({
    //   status: 'error',
    //   message: 'This route is not yet defined!'
    // });
  };

  exports.registerAttendees = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  
