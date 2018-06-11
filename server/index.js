const express = require('express');
const session = require('express-session');
const saveToDb = require('../database/saveToDb.js');
const retrieveFromDb = require('../database/retrieveFromDb.js');
const VolunteerModel = require('../database/models.js').Volunteers;
const checkdb = require('../database/checkdbs.js');
const axios = require('axios');
const saveExampleOpportunity = require('../database/exampleOpGenarator.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cookieParser = require('cookie-parser');
const addVolunteerToOpp = require('../database/addVolunteerToOpp').checkIfEnrolled;


const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.use(session({secret: 'Is it really a secret', cookie:{maxAge: 365*24*60*60, _expires: false}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// saveExampleOpportunity.saveExampleOpportunity();

passport.use(new GoogleStrategy({
    clientID: '177608482290-e9id899c90egnaq61bu5acppkrnenm12.apps.googleusercontent.com',
    clientSecret: 'RfKLyzUdC7PMcr-_G_hxkVg0',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    let name = profile.displayName;
    let profileId = profile.id;

    VolunteerModel.findOne({
      googleId: profileId
    }, function (err, volunteer) {
      if (err) {
        throw err;
      }

      if (!volunteer) {
        saveToDb.newVolunteer({
          googleId: profile.id,
          name: name,
          picture: profile.photos[0].value
        }, done)
        return;
      }

      return done(err, volunteer);
    });
  }
));

passport.serializeUser(function (volunteer, done) {
  console.log('serialize')
  console.log(volunteer)
  done(null, volunteer);
});

passport.deserializeUser(function (serializedObj, done) {
  console.log('serializedobj', serializedObj)
  VolunteerModel.findOne({
    googleId: serializedObj.googleId
  }, function (err, volunteer) {
    console.log('deserialize', volunteer)
    done(err, volunteer);
  });
});


//MAIN PAGE GET REQUEST
// app.get('/main', (req, res) => {
//   checkdb.checkSessionId(req.session.id, res);
// });


app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));


app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));


app.get('/main', (req, res) => {
  var sessionTest = ('user' in req) ? `*** SESSION EXISTS for ${req.session.passport.user.name}` : "*** NO SESSION ***";
  console.log(sessionTest);

  if ('user' in req) {
    console.log('user in req', req.session.passport.user)
    res.status(200).send(req.session.passport.user).end('true');
  } else if ('userId' in req.session) {
    console.log('userId org', req.session.name)
    res.status(200).send(req.session)
  }
});

app.post('/login', (req, res) => {
  checkdb.checkUserCredential(req.body, res, session, req);
});


app.get('/logout', function(req, res) {
  req.session.destroy();
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

//ORGANIZATION SIGNUP POST REQUEST
app.post('/signup', (req, res) => {
  checkdb.checkOrganizationExists(req, res);
});

//OPPORTUNITIES GET REQUEST

app.get('/myOps', (req, res) => {
  retrieveFromDb.myOpportunities(req.session.passport.user._id, res);
})

app.post('/newOpp', (req, res) => {
  saveToDb.newOpportunity(req.body);
  res.sendStatus(200);
});

app.post('/opportunities', (req, res) => {
  let zipApiUrl = `https://www.zipcodeapi.com/rest/O4i5XLUvKKDgHEb3Sw8QNYxNG6NW8Sk7KqQ3kVKI0sodef9qD1THnwOHrd4u4KvD/radius.json/${req.body.zipcode}/50/mile`;

  axios.get(zipApiUrl)
    .then(response => {
      //console.log('From zipapi ' + response.data.zip_codes[0].zip_code);
      retrieveFromDb.getZipCodeSearch(response.data.zip_codes, res);
    }).catch(err => console.log('Err', err));

  // retrieveFromDb.getOpportunities(5, res);
});

app.get('/opportunities/all', (req, res) => {
  retrieveFromDb.getOpportunities(1000, res);
});

app.post('/enroll', (req, res) => {
  let opportunity = req.body.opportunity;
  console.log('This is the opportunity in ENROLL', opportunity)

  if (req.user) {
    addVolunteerToOpp(opportunity, req.user._id, res);
  } else {
    res.send('login')
  }

});

module.exports = app;