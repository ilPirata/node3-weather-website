const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory); 

// Setup static directory to use
app.use(express.static(publicDirectory));

const appName = 'Weather Application';
const appVersion = '1.0.0.1a';
const appAuthor = 'Martin Thompson';

app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'Weather',
        title: appName,
        version: appVersion,
        name: appAuthor
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About',
        title: appName,
        version: appVersion,
        name: appAuthor
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        pageTitle: 'Help',
        title: appName,
        version: appVersion,
        name: appAuthor
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        pageTitle: '404',
        title: appName,
        version: appVersion,
        name: appAuthor,
        errorMsg: 'Help article not found.'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'ERROR: No address provided.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        pageTitle: '404',
        title: appName,
        version: appVersion,
        name: appAuthor,
        errorMsg: 'Page not found.'
    })
});

app.listen(port, () => {
    console.log('Express Server started on port: ' + port);
});
