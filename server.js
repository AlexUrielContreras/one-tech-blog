const express = require('express');
const sequelize = require('./config/connections');
const path = require('path')
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const routes = require('./controllers');

// EXPRESS MIDDLEWARE
// Parses incoming request with json payload 
app.use(express.json());
// Parses incoming request with urlencoded payloads 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// EXPRESS HANDLEBARS 
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers })

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// EXPRESS SESSION
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.COOKIE_PW,
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Now listening on port: ${PORT}`)
    })
})
