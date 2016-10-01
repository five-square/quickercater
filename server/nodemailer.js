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

// const mailOptions = {
//   from: 'fivesquare43@gmail.com',
//   to: 'tgvinodkumar@gmail.com',
//   subject: 'Hello',
//   // generateTextFromHTML: true,
//   text: 'Thank you',
// };

nm.sendConfirmation = (mailOptions) =>

  new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, (error, response) => {
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

