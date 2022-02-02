require('dotenv').config()
const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const username = process.env.USERNAME;
const pass = process.env.PASSWORD;

const PORT = process.env.PORT || 5000;

const app = express();

//Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
});

app.post("/", (req, res)=>{
    console.log(req.body);

    //used to send the emailn
    //Still have to figure out OAuth2 for gmail!
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: username,
            pass: pass
        }
    });

    //passing information from front end body request
    const mailOptions = {
        from: req.body.email,
        to: "ilariahaartestemail@gmail.com",
        subject: `Nieuw bericht van ${req.body.email}, ${req.body.names}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send("error");
        }else{
            console.log("Email sent: " + info.response);
            res.send("succes");
        }
    });
});

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
});