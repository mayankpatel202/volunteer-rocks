const mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var volunteerSchema = mongoose.Schema({
  googleId: String,
  name: {
    type: String,
    required: true
  },
  address: {
    street: String,
    City: String,
    State: String,
    zipCode: String,
  },
  phone: String,
  email: String,
  opList: [Schema.ObjectId],
  created_at: {
    type: Date,
    default: Date.now
  },
  picture: String
});

var organizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
  },
  phone: String,
  email: String,
  //opList: [Schema.ObjectId]
});

var opportunitiesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  cause: String,
  zipcode: String,
  formatted_address: String,
  start_date: Date,
  end_date: Date,
  phone: String,
  email: String,
  location: {
    lat: Number,
    lng: Number
  },
  volunteerers: []
});


var Volunteers = mongoose.model('Volunteers', volunteerSchema);
var Organizations = mongoose.model('Organizations', organizationSchema);
var Opportunities = mongoose.model('Opportunities', opportunitiesSchema);

module.exports.Volunteers = Volunteers;
module.exports.Organizations = Organizations;
module.exports.Opportunities = Opportunities;






// const saveOpportunities = () => {
//   const oppor = new Opportunities({
//     title: "Senior Care",
//     description:"Make seniors happy ",
//     cause: "Community",
//     address:{
//       street: "123 Creek Ave",
//       city: "Austin",
//       state: "Tx",
//       zipCode: "52378"
//     },
//     start_date: "08/06/2018",
//     end_date:"8/19/2018",
//     phone: "503-879-688",
//     email:"sc@seniorhome.com"
//   })
//   oppor.save((err,opp) => {
//     if (err) {
//       console.log("Opportunities Err " + err);
//     } else {
//       console.log("Successfully Added Opportunity to Database");
//     }
//   })
// }

// module.exports.getOrganizaions = (callpack, limit) => {
//   Organizations.find().limit(limit);

// }

// module.exports.getOpportunities = (callpack, limit) => {
//   Opportunities.find({},(err,oppData)=> {
//     if (err) {
//       console.log("Opportunities Err " + err);
//     } else {
//       callpack(oppData);
//     }
//   }).limit(limit);

// }

// const saveOrganizations = (data) => {
//   const orgs = new Organizations({
//   name: "Canine Corral",
//   address:{
//     street:"2045 Woodard Rd",
//     City: "San Jose",
//     State: "CA",
//     zipCode: "95124",
//   },
//   phone: "408-377-6788",
//   email:"cc@abc.com"
//   //opList: ["5b11bf504d9e7205ae19067f"],
//   //created_at: {type: Date, default: Date.now}
// });

//   orgs.save((err,orgs) => {
//     if (err) {
//       console.log("Voluteers Err " + err);
//     } else {
//       console.log("Successfully Added Organizations to Database");
//     }
//   })
// }

// const saveVolunteers = () => {
//   const volunteers = new Volunteers({
//   name: "Lee",
//   address:{
//     street:"786 1st Stree",
//     city: "Fremont",
//     State: "CA",
//     zipCode: "94131",
//   },
//   phone: "333-444-555",
//   email:"lee@abc.com",
//   opList: ["5b11bf504d9e7205ae19067f"]
//   //created_at: {type: Date, default: Date.now}
// });

//   volunteers.save((err,vol) => {
//     if (err) {
//       console.log("Voluteers Err " + err);
//     } else {
//       console.log("Successfully Added Volunteers to Database");
//     }
//   })
// }