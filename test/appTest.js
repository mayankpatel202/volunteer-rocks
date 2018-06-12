const expect = require('chai').expect;
const request = require('request');
const app = require('../server/index.js');
const models = require('../database/models.js');
const saveToDb = require('../database/saveToDb.js');
const VolunteerSchema = models.Volunteers.schema.obj;
const OrganizationSchema = models.Organizations.schema.obj;
const OpportunitiesSchema = models.Opportunities.schema.obj;
let server;
let db;


before(function () {
  server = app.listen(4568, function () {});

  db = require('../database/connectDb.js');
});

after(function () {
  server.close();
  db.disconnect();
});

describe('Database', function () {

  describe('Volunteers', function () {

    describe('Volunteer Schema', function () {

      it('Should have a name property', function () {
        expect(VolunteerSchema.name).to.exist;
      });
      it('Should have a address property', function () {
        expect(VolunteerSchema.address).to.exist;
      });
      it('Should have a phone property', function () {
        expect(VolunteerSchema.phone).to.exist;
      });
      it('Should have a email property', function () {
        expect(VolunteerSchema.email).to.exist;
      });

    });

    describe('Create a new volunteer', function () {

      before(function () {
        let newVolunteer = saveToDb.newVolunteer({
          name: 'Volunteer One',
          address: {
            street: '1234 Example St.',
            city: 'Example City',
            state: 'Example State',
            zipCode: '12345'
          },
          phone: '(123)456-7890',
          email: 'exampleEmail@example.com',
        });
      });

      after(function () {
        models.Volunteers.findOneAndDelete({
          name: 'Volunteer One'
        }, function (err, volunteer) {
          if (err) {
            throw err;
          }
        });
      })

      it('Should be able to save a new volunteer to the database', function () {

        let testSave = models.Volunteers.findOne({
          name: 'Volunteer One'
        }, function (err, volunteer) {});

        return testSave.then(function (result) {
          expect(result.name).to.equal('Volunteer One');
        });
      });

    });

  });

  describe('Organizations', function () {

    describe('Organization Schema', function () {

      it('Should have a name property', function () {
        expect(OrganizationSchema.name).to.exist;
      });
      it('Should have a address property', function () {
        expect(OrganizationSchema.address).to.exist;
      });
      it('Should have a phone property', function () {
        expect(OrganizationSchema.phone).to.exist;
      });
      it('Should have a email property', function () {
        expect(OrganizationSchema.email).to.exist;
      });

    });

    describe('Create a new organization', function () {

      before(function () {
        let newOrganization = saveToDb.newOrganization({
          name: 'New Organization',
          address: {
            street: '1234 Example St.',
            city: 'Example City',
            state: 'Example State',
            zip: '12345',
          },
          phone: '(123)456-7890',
          email: 'exampleEmail@example.com',
        });
      });

      after(function () {
        models.Organizations.findOneAndDelete({
          name: 'New Organization'
        }, function (err, organization) {
          if (err) {
            throw err;
          }
        });
      });

      it('Should save a new organization into the database', function () {
        let testSave = models.Organizations.findOne({
          name: 'New Organization'
        }, function (err, organizatioin) {});

        return testSave.then(function (result) {
          expect(result.name).to.equal('New Organization');
        })
      });

    });

  });

  describe('Opportunitiess', function () {

    describe('Opportunity Schema', function () {

      it('Should have a title property', function () {
        expect(OpportunitiesSchema.title).to.exist;
      });
      it('Should have a description property', function () {
        expect(OpportunitiesSchema.description).to.exist;
      });
      it('Should have a cause property', function () {
        expect(OpportunitiesSchema.cause).to.exist;
      });
      it('Should have a address property', function () {
        expect(OpportunitiesSchema.address).to.exist;
      });
      it('Should have a start date property', function () {
        expect(OpportunitiesSchema.start_date).to.exist;
      });
      it('Should have a end date property', function () {
        expect(OpportunitiesSchema.end_date).to.exist;
      });
      it('Should have a phone property', function () {
        expect(OpportunitiesSchema.phone).to.exist;
      });
      it('Should have a email property', function () {
        expect(OpportunitiesSchema.email).to.exist;
      });

    });

    describe('Create a new opportunity', function () {

      before(function () {
        let newOpportunity = saveToDb.newOpportunity({
          title: "New Opportunity"
        });
      });

      after(function () {
        models.Opportunities.findOneAndDelete({
          title: 'New Opportunity'
        }, function (err, opportunity) {
          if (err) {
            throw err;
          }
        });
      });

      it('Should be able to save a new opportunity to database', function () {
        let testSave = models.Opportunities.findOne({
          title: 'New Opportunity'
        }, function (err, opportunity) {});

        return testSave.then(function (result) {
          expect(result.title).to.equal('New Opportunity');
        });
      });

    });

  });

});