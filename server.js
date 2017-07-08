// Nexmo for SMS messaging 
var config = require("./app/config/config.js");

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: config.apiKey,
  apiSecret: config.apiSecret
});

