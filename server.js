const express = require('express');
const sequelize = require('./config/connections');
const path = require('path')
const app = express();
const { engine } = require('express-handlebars');

const PORT = process.env.PORT || 3001;

const routes = require('./controllers');

// EXPRESS MIDDLEWARE
// Parses incoming request with json payload 
app.use(express.json());
// Parses incoming request with urlencoded payloads 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// EXPRESS HANDLEBARS 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Now listening on port: ${PORT}`)
    })
})
