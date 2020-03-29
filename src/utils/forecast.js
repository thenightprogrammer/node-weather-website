const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/5f1a0dedfb5975a75638f9a0cf216002/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, {body}) => {
        if(error){
             callback('Could not connect to the weather app.');
        }else if(body.error){
             callback('Unable to find location.');
        }else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast;
