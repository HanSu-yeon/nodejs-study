const mailer = require('nodemailer');
const goodbye = require('./goodbye_template');
const welcome = require('./welcome_template');

const getEmailData = (to, name, template) => {
  let data = null;
  switch (template) {
    case 'welcome':
      data = {
        from: '보내는 사람 이름 <userId@gmail.com>',
        to: to,
        subject: `Hello ${name}`,
        html: welcome(),
      };
      break;
    case 'goodbye':
      data = {
        from: '보내는 사람 이름 <userId@gmail.com>',
        to: to,
        subject: `Hello ${name}`,
        html: goodbye(),
      };
      break;
    default:
      data;
  }

  return data;
};

const sendMail = (to, name, type) => {
  const transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '보내는 메일',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //type: 메일 내용 유형
  const mail = getEmailData(to, name, type);

  transporter.sendMail(mail, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent successfully');
    }

    transporter.close();
  });
};

module.exports = sendMail;
