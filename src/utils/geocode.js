
const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFydGl0aCIsImEiOiJjazdlczJqeTYwbTdrM2hudzB0MzV3cTM3In0.JHEmYoPUwDc_YbqyQWa9Zg&limit=1';

    request( {url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('ERROR: Unable to connect to Location Service. Please check network connectivity.', undefined);
        } else if (body.features.length === 0) {
            callback('ERROR: Unable to find location. Please check location entered.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }) 
        }
    });
}
module.exports = geocode