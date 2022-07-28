const express = require('express');
const sequelize = require('./config/connections')
const app = express();

const PORT = process.env.PORT || 3001;

const routes = require('./controllers');

// express middleware
// Parses incoming request with json payload 
app.use(express.json());
// Parses incoming request with urlencoded payloads 
app.use(express.urlencoded({ extended: true }));

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Now listening on port: ${PORT}`)
    })
})
