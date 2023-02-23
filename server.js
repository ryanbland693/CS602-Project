const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const helpers = require('handlebars-helpers')
const app = express();
const ErrorHandler = require('./classes/ErrorHandler')

// setup handlebars view engine
app.engine('handlebars',
    handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/index');
app.use('/', routes)

app.use((req, res, next) => {
    next (new ErrorHandler(404).getError())
})

app.use((error, req, res, next) => {
    res.status = error.status || 500
    res.render('error', { status: res.status, message: error.message || 'Server Error'})
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})