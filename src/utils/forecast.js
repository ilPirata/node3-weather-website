
const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0e2983bf70ffffbc9bc76a2ba1ccaf04/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    request( {url, json: true}, (error, { body } = {}) => {
        //console.log(response.body);
        if (error) {
            callback('ERROR: Unable to connect to Weather Service. Please check network connectivity.', undefined);
        } else if (body.error) {
            callback('ERROR: Unable to find location. Please check location entered.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    });
}
module.exports = forecast