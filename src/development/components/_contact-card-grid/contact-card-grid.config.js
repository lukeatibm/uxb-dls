"use strict";

const request = require("request-promise-native"); // require the request-promise-native module

// make the request to the API, returns a Promise
const response = request({
  uri:
    "https://a686b21c.eu-gb.apiconnect.appdomain.cloud/uxb-design-systems/attendees",
  json: true
});

// do some post-processing on the response to wrangle it into the correct format
response.then(function(attendeeApiData) {
  const attendeeData = [];
  for (let attendee of attendeeApiData.attendees) {
    attendeeData.push(attendee);
  }
  return attendeeData;
});

module.exports = {
  context: {
    contactCardList: response // use the response as context data for our template.
  }
};
