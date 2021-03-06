const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicdir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicdir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Hatdog',
        name: 'Gen Gamers'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Aboutdog',
        name: 'Gen Gamers'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        content: 'tulong tulong saklolo~!',
        name: 'Gen Gamers'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            });
        });
    });

    
});

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        product: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'Article not found',
        name: 'Gen Gamers'
    });
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'Page not found',
        name: 'Gen Gamers'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});