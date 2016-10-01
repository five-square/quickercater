const nodemailer = require('nodemailer');
const configAuth = require('./config/googleCredentials');

const md = module.exports;

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

md.sendConfirmation = (mailOptions) => {
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
    smtpTransport.close();
  });
};


