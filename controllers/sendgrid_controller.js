var helper = require('sendgrid').mail;
  var from_email = new helper.Email(req.body.email);
  var to_email = new helper.Email('adamfader@gmail.com');
  var subject = 'AdamMattas.com Portfolio Contact From ' + req.body.sender;
  var content = new helper.Content('text/plain', req.body.message);
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

module.exports = grid;