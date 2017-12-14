const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

/* -- HBS -- */
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/* -- EXPRESS -- */
/* -- MIDDLE WARE -- */
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  // console.log(req);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

//  Challenge: maintenance.hbs
app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: "Maintenance We'll be right back!",
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'The Site is currently beeing updated. We will be back soon.'
  });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

/* -- HTTP Routes -- */

// Home Page
app.get('/', (req, res) => {
  /* res.send('<h1>Hello Express</h1>');
  res.send({
    name: 'jay',
    likes: [
      'Hiking',
      'Chilling'
    ]
  }); */
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my Homepage!'
  });
});

// About Page
app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

/*  Challenge:
    /bad - send back json data with errorMessage */
// Bad Page
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request!'
  });
});

app.listen(3000);
