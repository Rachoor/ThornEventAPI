const { validate, ValidationError, Joi } = require('express-validation')

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory= require('./handleFactory');
const authController = require('./authController');



exports.validateSessionsData = (req,res,next)=>{
  const JoiSchema = Joi.object({
      event__c:Joi.string  ().required(),
      status__c:Joi.string().required().valid('Draft', 'Open', 'Sold Out', 'Closed'),
      registrationLimit__c:Joi.number().required(),
      remainingSeats:Joi.number(),
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

exports.createSession = factory.createOne('Session__c');

exports.getSessions = async (req,res)=>{
    let query =  `SELECT
                    Id, 
                    title__c, 
                    startDate__c, 
                    endDate__c, 
                    registrationLimit__c, 
                    startTime__c, 
                    endTime__c, 
                    description__c, 
                    status__c,
                    event__r.title__c,
                    event__r.Id,
                    seatsRemaining__c,
                    category__r.name__c,
                    createdUserId__c 
                    FROM 
                    Session__c
                    WHERE 
                    event__c = '${req.params.eventID}'
                    `;
     await factory.getData(req,res,query);
  }

exports.deleteSession = async (req,res) =>{
        res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  }

exports.getSession = async (req,res)=>{
    let query =  `SELECT
                    Id, 
                    title__c, 
                    startDate__c, 
                    endDate__c, 
                    registrationLimit__c, 
                    startTime__c, 
                    endTime__c, 
                    description__c, 
                    status__c,
                    event__r.title__c,
                    event__r.Id,
                    seatsRemaining__c,
                    category__r.name__c,
                    createdUserId__c 
                    FROM 
                    Session__c
                    WHERE 
                    event__c='${req.params.eventID}'
                    AND
                    Id='${req.params.sessionID}'
                    `;
     await factory.getData(req,res,query);
  }

exports.updateSession = async (req,res)=>{
    let query =  `SELECT
                    Id, 
                    title__c, 
                    startDate__c, 
                    endDate__c, 
                    registrationLimit__c, 
                    startTime__c, 
                    endTime__c, 
                    description__c, 
                    status__c,
                    event__r.title__c,
                    seatsRemaining__c,
                    category__r.name__c,
                    createdUserId__c 
                    FROM 
                    Session__c
                    WHERE 
                    event__c='${req.params.eventID}'
                    AND
                    Id='${req.params.sessionID}'
                    `;
     await factory.updateData(req,res,query);
  }

  exports.registerAttendee = async (req,res,next)=>{
    // use same function to loop through sessions Array to register Attendee in multiple sessions
    // req.body.session__c.map(async session=>{
      let query =  `SELECT
                    Id, 
                    title__c, 
                    startDate__c, 
                    endDate__c, 
                    registrationLimit__c, 
                    startTime__c, 
                    endTime__c, 
                    description__c, 
                    status__c,
                    event__r.title__c,
                    seatsRemaining__c,
                    category__r.name__c,
                    createdUserId__c 
                    FROM 
                    Session__c
                    WHERE
                    Id='${req.params.sessionID}'`;
      let result = await factory.getQueryData(query);
      if(result.records[0]._fields.seatsremaining__c > 1) {
        result.records[0].set('seatsremaining__c', result.records[0]._fields.seatsremaining__c + 1);
        await authController.org.update({sobject:result.records[0], oauth:JSON.parse(process.env.OAUTH)}, (err,resp)=>{
          if(!err) {
            // update seats remaining in events`
            factory.createData('ThornEventAttendees__c', req,res);
  
          }
          else{
            res.json({err})
          }
        });
      }
    // })
    }