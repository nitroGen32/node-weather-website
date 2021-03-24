const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibml0cm9nZW4zMiIsImEiOiJja21nMWRvYmMwdnZ2MnZwcWw0dWliN3ZzIn0.UPO-x68oAwygRYA6ZtVsJw&limit=1';

    request({ url, json: true }, (error, response) => {

        const { features } = response.body;

        if (error) {
            callback('Unable to connect to map service', undefined);
        } 
        else if (features.length === 0) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
};

module.exports = geocode;