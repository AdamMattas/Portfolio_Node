var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + '/public'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

var exphbs = require('express-handlebars');
var hbs = exphbs.create({
  extname: 'handlebars',
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    prettifyDatetime: function (timestamp) {
      return moment(timestamp).format('lll');
    }
  }

});

// Initialize engine
app.engine('handlebars', hbs.engine);

// Set engine
app.set('view engine', 'handlebars');

//require('./routing/html_routes.js')(app);

// routes requests to portfolio_controller.js
var routes = require('./controllers/portfolio_controller.js');
app.use('/', routes);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
})