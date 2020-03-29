const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engines and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rigon Ramajli'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Rigon Ramajli'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        help: 'If you are stuck, please contact me at rigon@daarz.agency',
        name: 'Rigon Ramajli'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please add an address'
        });
    }

    const address = req.query.address;

        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error});
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    location: location,
                    forecastData: forecastData
                }) 
            });
        })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Error 404',
        reason: 'Help articles could not be found',
        name: 'Rigon Ramajli'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Error 404',
        reason: 'Page could not be found',
        name: 'Rigon Ramajli'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});