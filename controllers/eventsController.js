// @ts-nocheck
const { validate, ValidationError, Joi } = require('express-validation')

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory= require('./handleFactory');



exports.validateEventsData = (req,res,next)=>{
  const JoiSchema = Joi.object({
      title:Joi.string  ().required(),
      status:Joi.string().required().valid('Draft', 'Open', 'Sold Out', 'Closed'),
      registrationLimit:Joi.number().required(),
      remainingSeats:Joi.number().required(),
      start:Joi.date().required(),
      startTime:Joi.string().required().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
      end:Joi.date().required(),
      endTime:Joi.string().required().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
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

exports.createEvent = async (req, res) => {
    // const resp = await factory.createOne('Event', req.body, req.headers.authorization.split(' ')[1]);
    const data = factory.createOne('Event', req.body, process.env.OAUTH, (err,resp)=>{
      console.log(err);console.log(resp);
    });
    res.json({'data':data()});
  };
  
  exports.getEvent = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  
  exports.getEvents = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  };
  
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
  
