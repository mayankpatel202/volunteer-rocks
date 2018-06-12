const models = require('./models.js');
const bcrypt = require('bcrypt');
const session = require('express-session');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCRAApdBppT4hFHnGCq5hFczdWLkAKoeqU',
  Promise: Promise
});

let Volunteer = models.Volunteers;
let Organization = models.Organizations;
let Opportunity = models.Opportunities;

const newVolunteer = function (volunteer, done) {
  let aNewVolunteer = new Volunteer({
    googleId: volunteer.googleId,
    name: volunteer.name,
    address: volunteer.address,
    phone: volunteer.phone,
    email: volunteer.email,
    TODO: 'Insert opList',
    picture: volunteer.picture.slice(0, -2) + '30'
  });

  aNewVolunteer.save(function (err, volunteer) {
    if (err) {
      throw err;
    }
    console.log(`A new volunteer, ${volunteer.name}, has been saved`);
    return done(err, volunteer);
  });
};

const newOrganization = function (organization, res, req, session) {
  let hashPassword = '';

  bcrypt.hash(organization.password, 10, function (err, hash) {
    hashPassword = hash;

    let aNewOrganization = new Organization({
      name: organization.name,
      password: hashPassword,
      address: organization.address,
      phone: organization.phone,
      email: organization.email,
      password: hashPassword
      //TODO: 'Insert opList'
    });

    aNewOrganization.save(function (err, organization) {
      if (err) {
        throw err;
      }

      console.log(`A new organization, ${organization.name}, has been saved`);
      req.session.userId = organization._id;
      req.session.name = organization.name;
      console.log(req.session.user);
      res.status(201).end();
    });

  });
};

const newOpportunity = function (opportunity) {

  googleMapsClient.geocode({
      address: opportunity.address
    }).asPromise()
    .then((response) => {
      let zipcode = '';
      let gmapi = response.json.results[0];
      for (var i = 0; i < gmapi.address_components.length; i++) {
        if (gmapi.address_components[i].types[0] === 'postal_code') {
          zipcode = gmapi.address_components[i].short_name;
        }
      }

      let aNewOpportunity = new Opportunity({
        title: opportunity.title,
        description: opportunity.description,
        cause: opportunity.cause,
        zipcode: zipcode,
        formatted_address: gmapi.formatted_address,
        start_date: opportunity.start_date,
        end_date: opportunity.end_date,
        phone: opportunity.phone,
        email: opportunity.email,
        location: {
          lat: gmapi.geometry.location.lat,
          lng: gmapi.geometry.location.lng
        }
      });
      aNewOpportunity.save(function (err, opportunity) {
        if (err) {
          console.log(err);
        }
        console.log("Success in saving newOpportunity")
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.newOpportunity = newOpportunity;
module.exports.newOrganization = newOrganization;
module.exports.newVolunteer = newVolunteer;
``