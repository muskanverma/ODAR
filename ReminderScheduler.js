const nodemailer = require("nodemailer");
const connectDB = require('./config/db');
connectDB();
const Reminder = require('./models/Reminder');
getReminders = async () => {
    try{
        var d1 = new Date();
        var d2 = new Date(d1.getFullYear(),d1.getMonth(),d1.getDate(),d1.getHours(),d1.getMinutes());
        console.log(d2);
        let reminders = await Reminder.find({date: d2});
        // console.log(reminders);
        reminders.forEach( async (reminder)=>{
            sendmail(reminder.email,reminder.text);
        });
    } catch(err){
        console.error("Error");
    }
}
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "nitishkalra1998@gmail.com",
        pass: "20020809me"
    }
});
sendmail = (id,text) =>{
    
    transporter.sendMail({
        from: "nitishkalra1998@gmail.com",
        to: id,
        subject: "A Reminder For You",
        text: text
    },function(err,info){
        if(err) console.error(err);
        else console.log("Sent Successfully to " + id);
    });
}
getReminders();
// var nodemailer = require('nodemailer');
// const Reminder = require('./Reminder');
// const connectDB = require('./db');
// connectDB();
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user: 'nitishkalra1998@gmail.com',
//         pass: '20020809me' 
//     }
// });

// getReminders = async () => {
//     try {
//         var currReminders = await Reminder.find({date: "2019-10-11T18:30:00.000+00:00"})
//         console.log(currReminders);
//         currReminders.forEach(element => {
//             const mailOptions = {
//                 from:  'nitishkalra1998@gmail.com',
//                 to: element.email,
//                 //subject: 'nodemailer check krwa ra tha muskan se - nitish',
//                 text: element.test
//             };
//             transporter.sendMail(mailOptions,function(err,info){
//                 if(err)
//                 console.log(err);
//                 console.log('sent succesfully');
//             });
//         });
//     } catch(err){
//         console.error(err);
//     }
// }
// getReminders();






