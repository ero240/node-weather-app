const axios = require('axios')

const weatherLocation = (latitude, longitude, callback) => {
    const darkSkyURL = 'https://api.darksky.net/forecast/f97547fcc0c8cd4c544d82d7fe48d4fd/' + longitude + ',' + latitude;
    // Make a GET request
    axios.get(darkSkyURL)
        .then(function (response) {
            // handle success
            const data = response.data;
            callback(`${data.daily.data[0].summary} in ${data.timezone} is currently ${data.currently.temperature} with a humidity of ${data.currently.humidity}`, undefined)
        })
        .catch(function (error) {
            // handle error
            callback(error, undefined)
        })
        .finally(function () {
            // always executed
        });
}

module.exports = weatherLocation