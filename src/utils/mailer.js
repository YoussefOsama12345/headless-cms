const mailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const env = require('../config/env');

const transporter = mailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_USE_SSL === 'true',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
);


function readTemplate(templateName) {
  const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
  return fs.readFileSync(templatePath, 'utf8');
}


function replaceTemplateVariables(template, variables) {
  let html = template;
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, variables[key]);
  });
  return html;
}


async function sendMailWithTemplate(to, subject, templateName, variables = {}) {
  try {
    const template = readTemplate(templateName);
    const htmlContent = replaceTemplateVariables(template, variables);

    const info = await transporter.sendMail({
      from: env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', mailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error(error.message);
  }
}


async function sendMail(to, subject, htmlContent) {
   try {
       const info = await transporter.sendMail({
          from: env.EMAIL_USER,
          to,
          subject,
          html: htmlContent,
       });

       console.log('Message sent: %s', info.messageId);
       console.log('Preview URL: %s', mailer.getTestMessageUrl(info));
       return info;

   }
   catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error(error.message);
   }
}

module.exports = {
  sendMail,
  sendMailWithTemplate,
  readTemplate,
  replaceTemplateVariables
};
