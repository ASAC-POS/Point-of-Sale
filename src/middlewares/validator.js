function validator(req,res,next){
    // console.log(typeof(req.body.username));
   //const check = /^[0-9]+$/;
   //const result =(req.body.username).match(check)
   //console.log(result);
   
   if ( (req.body.username) !== "" && isNaN(req.body.username))
   {
   next()
   }
   else{
   
   next('The Name You Entered NOT valid! try again');
   //console.log('The Name You Entered NOT valid! try again');
   }
   }
   
   
   
   module.exports =validator;