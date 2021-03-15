const nforce = require('nforce');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authController = require('./authController');

exports.createOne = (Subject) =>
 (req,res,next)=>{
        const subject = nforce.createSObject(Subject);
        Object.keys(req.body).map((key) => subject.set(key, req.body[key]));
         authController.org.insert({sobject:subject, oauth:JSON.parse(process.env.OAUTH)},function(err, resp){
            if(!err)  {
                res.status(201).json({
                    status: 'success',
                    data: {
                      data: resp
                    }
                  });
            }
            else res.status(err.statusCode).json(err);
          });
    };

<<<<<<< HEAD
// exports.getAll = (query) => (req,res,next)=>{
//     authController.org.query({ query, oauth:JSON.parse(process.env.OAUTH) }, function(err, resp){
//         if(!err && resp) {
//           res.status(200).json({
//           status: 'success',
//           data:resp.records
//       });
//       }
//       else {
//         res.status(err.statusCode).json(err);
//         }
//       });
// };

exports.getData = async (query)=>{
  let result = await authController.org.query({ query, oauth:JSON.parse(process.env.OAUTH) });
  return result;
}
=======
exports.getAll = (query) => (req,res,next)=>{
    authController.org.query({ query, oauth:JSON.parse(process.env.OAUTH) }, function(err, resp){
        if(!err) {
          res.status(200).json({
          status: 'success',
          data:resp.records
      });
      }
      else {
        res.status(err.statusCode).json(err);
        }
      });
      
};

>>>>>>> c06424eff778f768e7a4bba22a0062819f0830d7
