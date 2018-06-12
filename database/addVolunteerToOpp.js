const models = require('./models.js');
let Volunteers = models.Volunteers;
let Organizations = models.Organizations;
let Opportunities = models.Opportunities;

const checkIfEnrolled = function (opportunity, volId, res) {
  Opportunities.findById(opportunity._id, function (err, opportunity) {
    if (err) {
      throw err;
    }

    let volunteerers = opportunity.volunteerers;

    if (volunteerers.indexOf(volId) > -1) {
      res.send('already');
    } else {
      addVolunteerToOpp(opportunity, volId, res);
    }
  });
}

const addVolunteerToOpp = function (opportunity, volId, res) {
  Opportunities.findByIdAndUpdate(opportunity._id, {
    $push: {
      volunteerers: volId
    }
  }, function (err, foundOpp) {
    if (err) {
      throw err;
    }

    Volunteers.findByIdAndUpdate(volId, {
      $push: {
        opList: opportunity
      }
    }, function (err, volunteer) {
      if (err) {
        throw err;
      }

      res.send('enrolled');
    });
  });
};

module.exports.addVolunteerToOpp = addVolunteerToOpp;
module.exports.checkIfEnrolled = checkIfEnrolled;