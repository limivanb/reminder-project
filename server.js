const PORT = process.env.PORT || 4000;

const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/events', (request, response) => {
  response.render('events.hbs');
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}.`);
});
