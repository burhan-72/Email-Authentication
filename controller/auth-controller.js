const User = require('../models/users');

module.exports.emailAuth = function(req,res){
    console.log(req.body);
    res.redirect('back');
    // if( req.body.password != req.body.confirmPassword){
    //     return res.redirect('back');
    // }
    
    // User.findOne({email : req.body.email}, function(err , user){
    //     if(err){
    //         console.log('Error in finding user in Sign-in ');
    //     }
        
    //     if(!user){
    //         User.create(req.body,function(err,user){
    //             if(err){
    //                 console.log('Error in creating a user while sign-in');
    //                 return res.redirect('./users/sign-in');
    //             }
    //         });
    //     }else{
    //         console.log("SignUp successfully!!");
    //         return res.redirect('back');
    //     }
    // });
}