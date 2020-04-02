const axios = require('axios')

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZXJvMjQwIiwiYSI6ImNrN3RieGxnYTB5MTAzZms1NDBwaGVtZGQifQ.xZ3Az2fgd197h-HhJcBOaw&limit=1";

    axios.get(url)
        .then(function (response) {
            // handle success
            // console.log(`Latitude is ${latitude} Longitude is ${longitude}`);
            callback({
                latitude: response.data.features[0].center[0],
                longitude: response.data.features[0].center[1],
                location: response.data.features[0].place_name,
            }, undefined);
        })
        .catch(function (error) {
            // handle error
            callback(undefined, error = 'Please enter a correct address')
        })
        .finally(function () {
            // always executed
        });
}

module.exports = geoCode;