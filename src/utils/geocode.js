const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGhlbmlnaHRwcm9ncmFtbWVyIiwiYSI6ImNrN3VzNmM3NjAwbDUzaHFxbzU5dnc1M2MifQ.aqg_pvdvEZTx2rD0xg8GsA&limit=1`;
 
    request({ url, json: true}, (error, response) => {
        const body = response.body.features;
       if(error) {
          callback('Unable to connect to location services!');
       }else if(body.length === 0) {
          callback('Unable to find location. Try another search.');
       }else {
          callback(undefined, {
             latitude: body[0].center[1],
             longitude: body[0].center[0],
             location: body[0].place_name
          })
       }
    })
 }

 module.exports = geocode;