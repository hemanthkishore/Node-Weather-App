const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Custom function for sending data in YM JSON format
app.use((req, res, next) => {
    res.publish = function (success, message, data) {
        this.send({
            success,
            message: message || '',
            data: data || {}
        });
    };
    next();
});

app.use('/health-check', function (req, res) {
    res.send('Working!');
});
// End of Router

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.listen(config.APP_PORT);
