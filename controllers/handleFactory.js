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
              // response sending
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
  
exports.createData = (Subject,req,res) =>{
  const subject = nforce.createSObject(Subject);
  Object.keys(req.body).map((key) => subject.set(key, req.body[key]));
   authController.org.insert({sobject:subject, oauth:JSON.parse(process.env.OAUTH)},function(err, resp){
      if(!err)  {
        // response sending
          res.status(201).json({
              status: 'success',
              data: {
                data: resp
              }
            }); 
      }
      else {
        res.status(err.statusCode).json(err);
      }
    });
}

exports.getQueryData = async(query) =>{
  let result = await authController.org.query({ query, oauth:JSON.parse(process.env.OAUTH) });
  return result;
}    

exports.getData = async (req,res,query)=>{
  let result = await this.getQueryData(query);
  return res.status(200).json({
    records:result.records, 
    totalSize:result.totalSize
  });
}

exports.updateData = async (req,res,query)=>{
  let result = await this.getQueryData(query);
  if(result && result.records) {
    let acc = result.records[0];
    Object.keys(req.body).map(key=>acc.set(key, req.body[key]));
    await authController.org.update({sobject:acc, oauth:JSON.parse(process.env.OAUTH)}, (err,resp)=>{
      if(!err) {
        res.status(204).json({data:"success"});
      }
      else{
        res.json({err})
      }
    });
  }
}
