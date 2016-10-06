const db = require('./db');

const nodemailer = require('nodemailer');
const configAuth = process.env.googleClientId
  ? {
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    refreshToken: process.env.googleRefreshToken,
  }
  : require('./config/googleCredentials');

const nm = module.exports;

const smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    XOAuth2: {
      user: 'fivesquare43@gmail.com', // Your gmail address.
                                            // Not @developer.gserviceaccount.com
      clientId: configAuth.clientID,
      clientSecret: configAuth.clientSecret,
      refreshToken: configAuth.refreshToken,
    },
  },
});

nm.sendConfirmation = (mailInfo) => {
  var info = Object.assign({}, mailInfo);
  return db.findNode('Owner', info.ownerId)
    .then(ownerInfo => {
      info.mailOptions.cc = ownerInfo.properties.email;
      return new Promise((resolve, reject) => {
        smtpTransport.sendMail(info.mailOptions, (error, response) => {
          smtpTransport.close();
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log(response);
            resolve(response);
          }
        });
      });
    });
};





