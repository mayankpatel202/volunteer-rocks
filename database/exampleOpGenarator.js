const rrad = require('rrad')
const axios = require('axios')
const _ = require('underscore');
const models = require('./models.js');
const mongoose = require('mongoose');
const saveToDb = require('./saveToDb.js');

function saveExampleOpportunity() {
  const opportunities = {};
  for (var i = 0; i < 2200; i++) {
    const randomAddress = rrad.addresses[Math.floor(Math.random() * rrad.addresses.length)];
    opportunities['title'] = "Community Service";
    opportunities['description'] = "Help make the world a better place";
    opportunities['cause'] = "Clean our neighborhood";
    opportunities['address'] = `${randomAddress.address1} ${randomAddress.city} ${randomAddress.state} ${randomAddress.postalCode}`;
    opportunities['start_date'] = '06/09/2018';
    opportunities['end_date'] = '07/09/2018';
    opportunities['phone'] = '1234567890';
    opportunities['email'] = 'help@helpwanted.com';
    opportunities['volunteerers'] = [];

    console.log(opportunities);
    //saveToDb.newOpportunity(opportunities);
  }
}

module.exports.saveExampleOpportunity = saveExampleOpportunity;

// title: {
//     type: String,
//     required: true
//   },
//   description: String,
//   cause:String,
//   address:{
//     street:String,
//     city: String,
//     state: String,
//     zipcode: String,
//   },
//   formatted_address: String,
//   start_date: Date,
//   end_date:Date,
//   phone: String,
//   email: String,

// { address1: '503 Blackwood Terrace Southeast',
//   address2: '',
//   city: 'Calhoun',
//   state: 'GA',
//   postalCode: '30701',
//   coordinates: { lat: 34.459017, lng: -84.914659 } }

// const axios = require('axios')
// const _ = require('underscore');
// const models = require('./models.js');
// const mongoose = require('mongoose');
// const saveToDb = require('./saveToDb.js');

// var list = _.range(1, 20)
// var allZips = [];
// var results = {};

// function saveExampleOpportunity(mile, zip) {


//    let opportunities = {
//     title: mile,
//     description: "",
//     cause: "",
//     'address.zipcode': zip,
//     start_date: {},
//     end_date: {},
//     phone: "",
//     email: ""
//    }

//    saveToDb.newOpportunity(opportunities);
// }


// function getDataAndStore() {
//   list.forEach(number => {
//     axios.get(`https://www.zipcodeapi.com/rest/CGD29JR5AjFk8ohMiSIiYSiWKtAIuKzOv01fkWwrAKLBIUPaVpgPBr9HhAkPww7G/radius.json/94102/${number}/mile`)
//       .then(response => {
//         response.data.zip_codes.forEach(function(zip) {
//           console.log(zip.zip_code)
//           saveExampleOpportunity(number, zip.zip_code);
//         });
//       }).catch((err) => {
//         console.log("ERROR ", err)
//       })
//   });
// }


// module.exports.getDataAndStore = getDataAndStore;