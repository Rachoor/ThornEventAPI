const nforce= require('nforce');
const {SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, REDIRECT_URL, MODE, ENVIRONMENT, VERSION} = process.env;
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.org = nforce.createConnection({
  clientId: OAUTH_CLIENT_ID,
  clientSecret: OAUTH_CLIENT_SECRET,
  redirectUri: REDIRECT_URL,
  apiVersion: VERSION,  // optional, defaults to current salesforce API version
  environment:ENVIRONMENT ,  // optional, salesforce 'sandbox' or 'production', production default
  mode: MODE, // optional, 'single' or 'multi' user mode, multi default
  autoRefresh:true,
  onRefresh: function(newOauth, oldOauth, cb) {
    process.env.OAUTH = JSON.stringify(newOauth);
  }
});

exports.authenticateUser = catchAsync(async (req,res)=>{
  // check if user has valid token from salesforce;
});


exports.getToken = catchAsync(async(req,res,next)=>{
//   if request has BEARER Token:
// 	use that TOKEN in controller and use next();
// if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     req.OAUTH  = req.headers.authorization.split(' ')[1];
//     return next();
    
//   }
// else:
// else{
  // 	if request has USERNAME, PASSWORD:
  // if(req.body && (req.body.userName && req.body.password)) {
  //   const {userName, password} = req.body;
  //   // 		get USERNAME, PASSWORD FROM REQUEST
  //   this.org.authenticate({ username: userName, password: password}, async function(err, resp){
  //     // 			if request success: send TOKEN in response
  //     if(!err) {
  //       req.OAUTH = await resp;
  //       return next();
  //     }
  //     else{
  //       // 			else: send error to check USERNAME and PASSWORD
  //       return next(new AppError(
  //         'There is some problem with Username/ or Password.',
  //         403
  //       ));
  //     }
  //   });
  // }
  // else{
    // 		if TOKEN in env variables:
    if(process.env.OAUTH) {
      // 			use existed TOKEN in controller and use next();
      return next();
    }
    else{
      // 			get USERNAME, PASSWORD FROM env variables
      this.org.authenticate({ username: SF_USERNAME, password: SF_PASSWORD}, async function(err, resp){
        // 			if request success: save in env varibales
        if(!err) {
          process.env.OAUTH = await JSON.stringify(resp);
          return next();
          }
          // 			else: send error as SERVER Error
          else{
            return next(new AppError(
              'There is some problem with Server Authentication.',
              535
            ));
          }
      });
    }
  // }
// }
});

exports.login = catchAsync(async (req,res)=>{
  if(req.body && (req.body.userName && req.body.password)) {
    const {userName, password} = req.body;
    // 		get USERNAME, PASSWORD FROM REQUEST
    this.org.authenticate({ username: userName, password: password}, function(err, resp){
      // 			if request success: send TOKEN in response
      if(!err) {
        res.status(200).json({
          status:'success',
          data:resp
        })
      }
      else{
        console.log(err);
        // 			else: send error to check USERNAME and PASSWORD
        return new AppError(
          'There is some problem with Username/ Password.',
          403
        );
      }
    });
  }
});

// exports.protect = catchAsync(async (req, res, next) => {
//   // 1) Getting token and check of it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return next(
//       new AppError('You are not logged in! Please log in to get access.', 401)
//     );
//   }

//   // 2) Verification token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError(
//         'The user belonging to this token does no longer exist.',
//         401
//       )
//     );
//   }

//   // 4) Check if user changed password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError('User recently changed password! Please log in again.', 401)
//     );
//   }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   next();
// });