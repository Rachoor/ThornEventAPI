const nforce = require('nforce');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authController = require('./authController');

exports.createOne = (Subject, body, token) =>
    catchAsync(async ()=>{
        const subject = nforce.createSObject(Subject);
        Object.keys(body).map((key) => subject.set(key, body[key]));
        authController.org.insert({sobject:subject, oauth:process.env.OAUTH},function(err, resp){
            if(!err) console.log(resp);
            else return err; 
          });
    });