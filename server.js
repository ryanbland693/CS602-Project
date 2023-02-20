const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const helpers = require('handlebars-helpers')

const app = express();

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

    const error = new Error('Page not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    console.log(error.message)
    res.status = error.status || 500
    res.render('error', { status: res.status, message: error.message })
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})