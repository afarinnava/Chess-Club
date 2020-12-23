// clubServer with nedb database 
// Open an existing database and get all the documents
// Make sure you run actDBInit.js before you run this file.

const express = require('express');
let app = express(); // Can't use const if exporting
const session = require('express-session');
const bcrypt = require('bcryptjs');
const Datastore = require('nedb-promises');
app.use(express.static('public')); // For static assets

// To validate the data against the schema
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true });
var schemaMem = require('./memberSchema.json'); // member schema
var validateMem = ajv.compile(schemaMem);
var schemaAct = require('./activitySchema.json'); // activity schema
var validateAct = ajv.compile(schemaAct);
var schemaApp = require('./applicantSchema.json'); // applicant schema
var validateApp = ajv.compile(schemaApp);

const cookieName = "gt6879Hello"; // Session ID cookie name to start with my NETID
app.use(session({
    secret: 'Afarin Says Hello!!',
    resave: false,
    saveUninitialized: false,
    name: cookieName,
}));

// Databases imported
const events = Datastore.create('./actDB');
const members = Datastore.create('./memDB');

// To initialize session state
function setUpSessionMiddleware(req, res, next) {
    if (!req.session.user) {
        req.session.user = { role: "guest" };
    };
    next();
};

app.use(setUpSessionMiddleware);

// Use this middleware to restrict paths to only logged in users
function memberOnly(req, res, next) {
    // console.log(`\nSession info: ${JSON.stringify(req.session)} \n`);
    if (req.session.user.role === "guest") {
        res.status(401).json({ error: "Forbidden" });
    } else {
        next();
    }
};

// Use this middlewave to restrict paths only to admins
function adminOnly(req, res, next) {
    if (req.session.user.role !== "admin") {
        // console.log(`role is:  ${req.session.user.role}`);
        res.status(401).json({ error: "Forbidden" });
    } else {
        next();
    }
};

let infoJson = {
    "clubName": "Conta Costa County Chess Club",
    "ownerName": "Afarin Navayazdan",
    "ownerNetId": "gt6879"
};

// To GET the website info
app.get('/info', function (req, res) {
    res.json(infoJson);
});

// To GET the activities
app.get('/activities', async function (req, res) {
    let act = await events.find({});
    res.status(200).json(act);
});

// To POST a new activity
app.post('/activities', memberOnly, express.json({ limit: '2kb' }), async function (req, res) {
    let valid = validateAct(req.body); //to validate the schema
    // console.log(`validate is ${valid}`);
    if (valid) {
        console.log(`path /activities received: ${JSON.stringify(req.body)}`);
        let info = await events.insert(req.body);
        let act = await events.find({});
        res.status(201).json(act);
    } else {
        console.log(validateAct.errors);
        res.status(404).json({ error: true, message: validateAct.errors });
    }
}, function jsonErrors(err, req, res, next) {
    res.status(400).json({
        message: "Size is larger than 2KB",
        error: true
    });
    console.log(JSON.stringify(err));
    return;
});

// To DELETE an activity
app.delete('/activities/:id', memberOnly, express.json(), async function (req, res) {
    let tempId = req.params.id; // activity ID
    console.log(`id is ${tempId}`);
    tempId = tempId.substring(1, tempId.length);
    let info = await events.remove({ _id: tempId });
    console.log(`Trying to delete activity: ${tempId}`);
    console.log(info);
    if (info === 0) {
        // NOT FOUND message
        console.log(`No activity with id ${tempId} was found.`);
        res.status(400).json({ error: true, message: `Activity Id not found...` });
        return;
    } else {
        let act = await events.find({});
        res.status(200).json(act);
    }
});

// To GET all members
app.get('/members', adminOnly, async function (req, res) {
    let mems = await members.find({});
    res.status(200).json(mems)
});

// To POST a new member
app.post('/members', adminOnly, express.json({ limit: '2kb' }), async function (req, res) {
    let valid = validateMem(req.body); // to validate schema
    if (valid) {
        console.log(`path /members received: ${JSON.stringify(req.body)}`);
        let info = await members.insert(req.body);
        let mems = await members.find({});
        res.status(201).json(mems);
    } else {
        console.log("JSON Too Big!")
        console.log(validateMem.errors);
        res.status(404).json({ error: true, message: validateMem.errors });
    }
}, function jsonErrors(err, req, res, next) {
    res.status(400).json({
        message: "Size is larger than 2KB",
        error: true
    });
    console.log(JSON.stringify(err));
    return;
});

// To DELETE a member
app.delete('/members/:id', adminOnly, express.json(), async function (req, res) {
    let tempId = req.params.id; // member ID
    tempId = tempId.substring(1, tempId.length);
    // console.log(`id is ${tempId}`);
    let info = await members.remove({ _id: tempId });
    console.log(`Trying to delete member: ${tempId}`);
    console.log(info);
    if (!info) {
        // NOT FOUND message
        console.log(`No member with id ${tempId} was found.`);
        res.status(400).json({ error: true, message: `Member Id not found...` });
        return;
    } else {
        let mem = await members.find({});
        res.status(200).json(mem);
    }
});

// To POST login data
app.post('/login', express.json(), async function (req, res) {
    let tempEmail = req.body.email;
    let passw = req.body.password;
    // console.log(`email is:  ${tempEmail}\npass is:  ${passw}`);
    // Find user
    let auser = await members.findOne({ email: tempEmail });
    // console.log(`auser is:  ${auser.firstName}`);
    if (!auser) {// Not found because of wrong email
        res.status(401).json({ error: true, message: "User/Password error" });
        return;
    }
    let verified = bcrypt.compareSync(passw, auser.passHash);
    if (verified) {
        let oldInfo = req.session.user;
        req.session.regenerate(function (err) {
            if (err) {
                console.log(err);
            }
            let newUserInfo = Object.assign(oldInfo, auser);


            delete newUserInfo.passHash;
            // console.log(`newInfo Pass is:  ${newUserInfo.passHash}`);
            req.session.user = newUserInfo;
            res.status(200).json(newUserInfo);
        });
    } else { // Wrong password
        res.status(401).json({ error: true, message: "User/Password error" });
    }
});

// To GET logout
app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); // the cookie name and options
        res.json({ message: "Goodbye" });
    })
});

// To POST an applicant
app.post('/applicants', express.json({ limit: '1kb' }), function (req, res) {
    let applicant = req.body;
    let valid = validateApp(applicant);
    if (valid) {
        res.status(200).json({ message: "Thank you for your application!" });
        // applicants1.push(req.body);
        console.log(`path /applicants received: ${JSON.stringify(req.body)}`);
    } else {
        console.log(validateApp.errors);
        res.status(401).json({ error: true, message: validateApp.errors });
    }
}, function jsonErrors(err, req, res, next) {
    res.status(400).json({ error: true, message: "Size is larger than 1KB" });
    console.log(JSON.stringify(err));
    return;
});

// module.exports = app;
const host = '127.0.0.1';
const port = '3039';
app.listen(port, host, function () {
    console.log("Club server listening on IPv4: " + host +
        ":" + port);
});
