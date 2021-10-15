const User = require('../models/users');
const jwt = require('jsonwebtoken');

const activatekey = 'accountactivatekey123';
const clientURL = 'http.//localhost:8000';

const mailgun = require("mailgun-js");
const mailgunAPIKEY = '6f6d760c6f190803848618474dac05f8-2ac825a1-bdb5f87b';
const DOMAIN = 'sandboxb693200df98f45fda0347d40fefe22d3.mailgun.org';

const mg = mailgun({apiKey: mailgunAPIKEY, domain: DOMAIN});


module.exports.emailAuth = function(req,res){

    const {name, email, password, confirmPassword} = req.body;
    console.log(name , email, password, confirmPassword);
    console.log(req.body);
    if( password != confirmPassword){
        alert('Password and Confirm Password should be same');
        return res.redirect('back');
    }
    
    User.findOne({email : email}, function(err , user){
        if(err){
            console.log('Error in finding user in Sign-in ');
            return res.redirect('back');
        }
        
        if(!user){

            const token = jwt.sign({name, email, password},activatekey,{expiresIn : '20m'});

            const data = {
                from: 'noreply@student.com',
                to: req.body.email,
                subject: 'Account Activation Key',
                html : `
                    <h2>Please click  on below link to activate your account</h2>
                    <a href="${clientURL}/authentication/activate/${token}">CLICK HERE</a>
                    
                `
            };
            mg.messages().send(data, function (error, body) {
                if(error){
                    console.log(error.message);
                    return res.redirect('back');
                }
                console.log('Email has been sent for vecrification');
                return res.redirect('back');    
            });

            // User.create(req.body,function(err,user){
            //     if(err){
            //         console.log('Error in creating a user while sign-in');
            //         return res.redirect('back');
            //     }else{
            //         console.log("SignUp successfully!!");
            //         return res.redirect('back');
            //     }
            // });
        }else{
            console.log('User with this email already exist!!');
        }
    });
}

module.exports.activateAccount = function(req,res){
    const token = req.body.token;
    if(token){
        jwt.verify(token,activatekey, function(err, decodedToken){
            if(err){
                console.log('Incorrect or expire link');
                return res.redirect('back');
            }
            const{name , email , password, confirmPassword} = decodedToken;
            User.findOne({email : email}, function(err , user){
                if(err){
                    console.log('Error in finding user in Sign-in ');
                }
                
                if(!user){
                    User.create(req.body,function(err,user){
                        if(err){
                            console.log('Error in creating a user while accoun activation');
                            return res.redirect('back');
                        }
                    });
                }else{
                    console.log("SignUp successfully!!");
                    return res.redirect('back');
                }
            });
        });
    }else{
        console.log('Something went wrong!!');
        return res.redirect('back');
    }
}