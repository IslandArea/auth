const auth = require('./index.js');
const authCode = new auth.authCode();

console.log(authCode.createCode(), authCode.create2StepCode(), authCode.create3StepCode());