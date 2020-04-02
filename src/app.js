const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const weatherLocation = require('./utils/location')

const app = express();

//Define paths for express config
const directoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engines and views location       
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(directoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Emeka Okeke'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Big Booty Milf Lisa",
        name: 'Lisa Lopez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        name: 'Emeka Okeke'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter an address of the location you\'re trying to search'
        })
    }

    //Geocode
    geoCode(req.query.address, ({ latitude, longitude, location } = {}, error) => {
        if (error) {
            return res.send({
                error
            })
        }

        //Location Waeather
        weatherLocation(latitude, longitude, (forecastData, error) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            }
            )

            // console.log(location)
            // console.log(forecastData);
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.name) {
        return res.send({
            error: 'You searche without a name term. Please provide name'
        })
    }
    console.log(req.query.name);
    res.send({
        product: []
    })
})

app.get('/about/*', (req, res) => {
    res.render('pageerror', {
        title: '<h1>Oops!</h1>' + '\n' + '<h2>404 Not Found</h2>',
        errorMessage: 'Sorry, an error has occured, Requested About page  not found!'
    })
})

app.get('*', (req, res) => {
    res.render('pageerror', {
        title: '<h1>Oops!</h1>' + '\n' + '<h2>404 Not Found</h2>',
        errorMessage: 'Sorry, an error has occured, Requested page not found!'
    })
})

//404 pages
app.listen(3000, () => {
    console.log('Server started on port 3000');
})
