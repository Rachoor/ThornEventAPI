// @ts-nocheck
const { validate, ValidationError, Joi } = require('express-validation')

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory= require('./handleFactory');
const authController = require('./authController');
  
exports.createEvent = factory.createOne('ThornEvent__c');

exports.creatseSession = factory.createOne('Session__c');
  
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
                    Category__r.id,
                    status__c,
                    imageURL__c 
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
    Category__r.id,
    seatsRemaining__c,
    imageURL__c
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
    Category__r.id,
    seatsRemaining__c,
    imageURL__c
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
    Category__r.id,
    seatsRemaining__c,
    imageURL__c
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

  exports.deleteEvent = async (req,res)=>{}

  exports.searchEvent = async (req,res,next) =>{
    let query = `
    SELECT 
    Id,
    title__c, 
    imageURL__c,
    startDate__c, 
    endDate__c, 
    registrationLimit__c, 
    startTime__c, 
    endTime__c, 
    description__c, 
    status__c,
    Category__r.name__c,
    Category__r.name,
    seatsRemaining__c
    FROM 
    ThornEvent__c
    WHERE
    title__c 
    LIKE
    '%${req.params.searchName}%'`;


    await factory.getData(req,res,query);
  }

  exports.registerAttendee = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  
