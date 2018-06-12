const models = require('./models.js');
const bcrypt = require('bcrypt');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;
let retrieveFromDb = require('./retrieveFromDb.js');
let saveToDb = require('./saveToDb.js');


const checkSessionId = function (clientSessionId, res) {
  Organizations.find({
    'sessionId': clientSessionId
  }, (err, sessionIdExist) => {
    if (err) throw err;
    sessionIdExist.length > 0 ? retrieveFromDb.getOpportunities(5, res) : res.status(204);
  });
}

const checkOrganizationExists = function (req, res, session) {

  Organizations.find({
    'name': req.body.name
  }, (err, orgExist) => {
    if (err) throw err;

    if (orgExist.length) {
      res.status(200).end('true')
    } else {
      saveToDb.newOrganization(req.body, res, req, session);
    }

  });
}

const checkUserCredential = function (userCredential, res, session, req) {
  console.log('are we in checkuser?')
  Organizations.findOne({
    name: userCredential.username
  }, (err, user) => {
    if (err) throw err;
    if (user) { // if username found check password
      bcrypt.compare(userCredential.password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) { // if password send 200 status
          console.log('ismatch is true')
          req.session.userId = user._id;
          req.session.name = user.name; // create session
          res.status(200).end(user.name)
        } else {
          console.log(user, ' user in checkuser ================')
          res.status(401).end('false');
        }

      });

    } else {
      res.status(401).end('false'); //if username not found
    }

  }).select('+password');
}

module.exports.checkSessionId = checkSessionId;
module.exports.checkOrganizationExists = checkOrganizationExists;
module.exports.checkUserCredential = checkUserCredential;