const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");



router.post('/sendEmail',async (req,res,next)=>{

    const receiverEmail = req.body.receiverEmail;
    const senderMail = ''; // add sender email 
    const password = ''; // add password
  
    // allow less secure feature on in chrome
    // link - https://myaccount.google.com/lesssecureapps
  
  try{
  
      
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: senderMail, 
      pass: password,
    },
    tls:{
        rejectUnauthorized : false
    }
  });
  let HelperOptions =  { from: senderMail, // sender address
  to: receiverEmail, // list of receivers
  subject: "Warning Message", // Subject line
  text: "", // plain text body
  html: `
  <h3>Sensor Details</h3>
  <li>location: ${req.body.location}</li>
  <li>CO2 level: ${req.body.co2Level}</li>
  <li>H20 level: ${req.body.h2oLevel}</li>
  <h3>Message</h3>
  <p>${req.body.message}</p>`
  };
  transporter.sendMail(HelperOptions,(error,info) =>{
    if(error){
        return console.log(error);
    }
    console.log("The message was sent!");
    console.log(info);
  
    res.json(info);
  });
  
  }
  catch(e){
      console.log(e);
  }
  });

module.exports = router;