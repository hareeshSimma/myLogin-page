const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database'); 
const User = require('../models/user');
var nodemailer=require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// Register router
router.post('/register', (req,res, next ) => {
    var newuser = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
    User.addUser(newuser, (err, data ) => {
        if(err) {
            res.json({ success : false, msg: 'Failed to register user'});
        }else {
            res.json({ success : true, msg : 'User Registered Successfully'})
        }
    });
    // res.send("hii")
});

// Authentication router
router.post('/authenticate', (req,res, next ) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({ success: false, msg: 'User Not Found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({ 
                    success : true,
                    token : 'JWT' +token,
                    user : {
                        id: user._id,
                        name : user.name,
                        username : user.username,
                        email : user.email
                }
            });
            } else {
                return res.json({ success: false, msg: 'Wrong Password'});
            }
        })
    });
});

// profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req,res) => {
    res.json({user: req.user});
});


// send otp to mail

router.post('/forgotpassword', (req,res, next ) => {
    console.log("kjdskfsfk")
const email = req.body.email

User.getEmailAlert(email, (err, data ) => {
    console.log(data)
        if(err) {
            res.json({ success : false, msg: 'err'});
        }else {

if(data==null){
    console.log("user not found")

         res.json({ success : false, msg: 'Enter valid Email'});
}else{

const email = req.body.email;

// const str="14@$5!45#46";
//const firstFive = email.toString().slice(0,4);
//const firstFour = str.toString().replace(/ /g,'').slice(0,5);
const Otp=Math.floor(Math.random() * 200000);
console.log(Otp)
 console.log(email)

 User.update({email:email},{$set:{otp:Otp}},function(err,docs){
    console.log("*********************************");
    console.log(docs)
        if(err){
            res.json('error')
        }else{
       

     const nodemailer = require('nodemailer');
     const xoauth2 = require('xoauth2');

            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                    type: 'OAuth2',
                    user: 'innobankindia@gmail.com',
                    clientId: '648860037400-juj2jjut5f6tnhk322ma9ti1u7pak0q0.apps.googleusercontent.com',
                    clientSecret: 'xUHvvlkXTlmWAhenb9K9bpUD',
                    refreshToken: '1/YYSzlgJaWjmGl89RuYxneeUzp92Jqd4cNu9NqMCBVOM',
                    accessToken: 'ya29.GlsMBAX1weZ1zkP0V3IuIcL2T2LxNyg3n5Of1fp6GLVbjCIY0flHrtZvOKcwc9GB98LglG7ZUSPQ9OTPYxZ77RTJ6P4daTwTOawSgEGirjmBdtB3_UajCukk8Qxk'
                
                }
            })

            var mailOptions = {
                from: 'admin <innobankindia@gmail.com>',
                to: req.body.email,
                subject: 'Password Request Send',
                html: '<h3>Hello User<h3><br><br>This is to convey that your password was reset, you can enjoy our services from now on <br> One time password:'+Otp+'<br>Your Email id:'+email+'<br>Get Password Here <a href="http://localhost:3000/users/setPassword">Change Password</a>'
            }

            transporter.sendMail(mailOptions, function (err, res) {
                if(err){
                    console.log('Error'+err);
                } else {
                    console.log('Email Sent');
                }
            })


        }

    })


    res.json({ success : true, msg : 'otp send to the mail id'})
}

        }
    });

});

//set  forgot password
router.post('/setPassword', (req,res, next ) => {

    var newuser = new User({
        otp : req.body.otp,
        password:req.body.newpswd,
        cpassword : req.body.cpswd
    });
    
     User.setpswd(newuser,(err, data ) => {

      console.log(data+"888888888888888888")
        
 if(err) {
            res.json({ success : false, msg: 'Failed to register user'});
        }
else{


const otp=req.body.otp;
User.find({otp:otp},function(err,docs){
console.log(docs);
if(err)
    {
        throw err;
    }
    else{
        console.log(docs);

if(docs[0]== null){
   res.json({ success : false, msg : 'User Not Found'}); 
}else{
const newpswd=req.body.newpswd;
const cpswd=req.body.cpswd;
    if(newpswd!=cpswd){
res.json({ success : false, msg : 'password does nor match....'});
console.log("Password does not match")
    }else{

User.update({otp:otp},{$set:{password:newuser.password}},function(err,docs){
 console.log("***************hjjkjjkj******************");
    console.log(docs)
if(err){
    res.json({ success : false, msg : 'User not updated'}); 
}else{
    res.json({ success : true, msg : 'password updated Successfully'});
}




})//update closing



}//else close



}//


    } //find else closing


})//find closing

 
}//main else closing



     })//set password closing




})//post closing


module.exports = router;



