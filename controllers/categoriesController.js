const factory = require('./handleFactory');

exports.getCategories = async (req,res)=>{
    // make OAUTH token checking here
    let query = `
    SELECT 
    Id,
    name__c 
    FROM 
    Category__c
    `;
    const result = await factory.getData(query);
    return res.json({
      records:result.records, 
      totalSize:result.totalSize
    });
  }