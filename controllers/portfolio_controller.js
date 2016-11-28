/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var path = require('path');
//var portfolio = require('../models/portfolio.js');

// redirects user to /burgers
router.get('/', function (req, res) {
  res.redirect('/index');
});

//get request that displays the index.html file
router.get('/index', function(req, res){
  res.sendFile(path.join(__dirname + './../public/index.html'));
});

//get request that displays the portfolio.html file
router.get('/portfolio', function(req, res){
  res.sendFile(path.join(__dirname + './../public/portfolio.html'));
});

//get request that displays the contact.html file
router.get('/contact', function(req, res){
  res.sendFile(path.join(__dirname + './../public/contact.html'));
});

//handles form submit from contact.html file
router.post('/contact/submit', function(req, res){
  // burger.create(['burger_name'], [req.body.burger_name], function () {
  //   res.redirect('/burgers');
  // });
  var helper = require('sendgrid').mail;
  var from_email = new helper.Email(req.body.email);
  var to_email = new helper.Email('adamfader@gmail.com');
  var subject = req.body.sender;
  var content = new helper.Content('text/plain', req.body.message);
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });

  // sendgrid.send({
  //   to: 'adamfader@gmail.com',
  //   from: [req.body.email],
  //   subject: [req.body.sender],
  //   text: [req.body.message]
  // }, function(err, json) {
  //   if (err) { return res.send('Error!'); }
  //   res.send('Success!');
  // });

  // res.redirect('/contact');
});

//get request that displays the star trek hangman index.html file
router.get('/hangman', function(req, res){
  res.sendFile(path.join(__dirname + './../public/hangman/index.html'));
});

//get request that displays the star wars rpg game index.html file
router.get('/rpg', function(req, res){
  res.sendFile(path.join(__dirname + './../public/rpg/index.html'));
});

//get request that displays the simpsons trivia game index.html file
router.get('/simpsons', function(req, res){
  res.sendFile(path.join(__dirname + './../public/simpsons/index.html'));
});

//get request that displays the giphy api index.html file
router.get('/giphy', function(req, res){
  res.sendFile(path.join(__dirname + './../public/giphy/index.html'));
});

//get request that displays the trains firebase schedule index.html file
router.get('/trains', function(req, res){
  res.sendFile(path.join(__dirname + './../public/trains/index.html'));
});

//get request that displays the i was here team project index.html file
router.get('/travel', function(req, res){
  res.sendFile(path.join(__dirname + './../public/travel/index.html'));
});

// accesses the all function in burger.js
// tells the index.handlebars to render and sends select all response as an object
router.get('/burgers', function (req, res) {
  burger.all(function (data) {
    var hbsObject = { burgers: data };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

// accesses the create function in burger.js
// passes the burger name from the index.handlebars form and passes the db column name
// redirects to .get /burgers and reloads page
router.post('/burgers/create', function (req, res) {
  burger.create(['burger_name'], [req.body.burger_name], function () {
    res.redirect('/burgers');
  });
});

// accesses the update function in burger.js
// passes burger id and hidden input value from form in index.handlebars
// redirects to .get /burgers and reloads page
router.put('/burgers/update/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  burger.update({ devoured: req.body.devoured }, condition, function () {
    res.redirect('/burgers');
  });
});

//get request that displays the resume_2016.pdf file
router.get('/resume', function(req, res){
  res.sendFile(path.join(__dirname + './../public/resume/Resume_2016.pdf'));
});

module.exports = router;