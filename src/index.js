const express = require('express');
const fs = require('fs')
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const mongoConnection = require('./config/db').connection

const app = express();

// Views
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Disable
app.disable('x-powered-by');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
}));
app.use(require('./middleware/copyUser'));

if (process.env.NODE_ENV === 'production') {
    // Production
} else {
    // Development
    app.use(morgan('dev'));
}

// Controllers
const {
    homeController,
} = require('./controllers');

app.use('/', homeController);

module.exports = app