const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=990debd8186810d80131a994abbd069f&query=' + latitude + ',' + longitude + '&units=m';

    request({ url, json: true }, (error, response) => {

        const { body } = response;
        const { current } = response.body;

        if (error) {
            callback('Unable to connect to weather service', undefined);
        } 
        else if (body.error){
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, current.weather_descriptions[0] + ' It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out. Humidity is ' + current.humidity + '%. ');
        }
    });
}

module.exports = forecast;