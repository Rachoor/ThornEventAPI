// @ts-nocheck
const { validate, ValidationError, Joi } = require('express-validation')

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory= require('./handleFactory');
const authController = require('./authController');


exports.JoiEventSchema = Joi.object({
    title__c:Joi.string  ().required(),
    status__c:Joi.string().required().valid('Draft', 'Open', 'Sold Out', 'Closed'),
    registrationLimit__c:Joi.number().required(),
    startDate__c:Joi.date().required(),
    startTime__c:Joi.string().required().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
    endDate__c:Joi.date().required(),
    endTime__c:Joi.string().required().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
    description__c:Joi.string().required(),
    seatsRemaining__c:Joi.number(),
    category__c:Joi.string().required(),
    createdUserId__c:Joi.string().required()
  });
  
  exports.JoiAttendeeSchema = Joi.object({
      firstName__c:Joi.string().required(),
      lastName__c:Joi.string().required(),
      email__c:Joi.string().email().required(),
      phone__c:Joi.number().integer().min(10**9).max(10**10 - 1).required(),
      company__c:Joi.string().required(),
      session__c:Joi.string().required(),
      event__c:Joi.string().required()
    });
  
    exports.JoiSessionSchema = Joi.object({
      title__c:Joi.string().required(),
      startDate__c:Joi.date().required(),
      endDate__c:Joi.date().required(),
      status__c:Joi.string().required().valid('Draft', 'Open', 'Sold Out', 'Closed'),
      registrationLimit__c:Joi.number().required(),
      startTime__c:Joi.string().required().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
      endTime__c:Joi.string().required().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
      description__c:Joi.string().required(),
      event__c:Joi.string().required(),
      seatsRemaining__c:Joi.number(),
      category__c:Joi.string().required(),
      createdUserId__c:Joi.string().required()
    });
  
  exports.validateData = Schema=> (req,res,next)=>{
    const validation = Schema.validate(req.body);
    if( validation.error ) {
      return res.status(400).json({
        message : validation.error.details
      })
    } else{
      next();
    }
  }