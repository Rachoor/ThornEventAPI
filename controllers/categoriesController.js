const factory = require('./handleFactory');

exports.getCategories = async (req,res)=>{
    // make OAUTH token checking here
    let query = `SELECT 
                Id,
                name__c 
                FROM 
                Category__c`;
    await factory.getData(req,res,query);
  }