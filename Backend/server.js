const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const session = require("express-session");
const path = require('path');

require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: true,
    credentials: true,
}
const timezone = 'Asia/Manila';
process.env.TZ = timezone;

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ secret: process.env.PUBLICVAPIDKEY, resave: false, saveUninitialized: false }))

const Auth = require("./routes/auth.routes");
const Template = require('./routes/template.routes');
const AdminsRoute = require('./routes/admins.routes');
const Affiliate = require("./routes/affiliation.routes");
const Occupation = require("./routes/occupation.routes");
const Occupation_Checklist = require("./routes/occupation_checklist.routes");
const Affiliate_Checklist = require("./routes/affiliation_checklist.routes");
const Profile = require("./routes/profile.routes");
const Profile_Checklist = require("./routes/profile_checklist.routes");
const Address = require("./routes/address.routes");


// File Upload API
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.static('public'));
// Email Sender

app.use("/auth", Auth);
app.use("/template", Template);
app.use("/admins", AdminsRoute);
app.use("/affiliation", Affiliate);
app.use("/occupation", Occupation);
app.use("/affiliation_checklist", Affiliate_Checklist);
app.use("/occupation_checklist", Occupation_Checklist);
app.use("/profile", Profile);
app.use("/profile_checklist", Profile_Checklist);
app.use("/address", Address);

app.get('/', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome developer! Build Date: 01232023');
});

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// comment this if production
// app.post('/samplepost', function (req, res) {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('This is a post!');
// });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});