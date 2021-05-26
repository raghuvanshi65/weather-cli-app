const request = require("postman-request");

let location;
let locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoicmFnaHU2NSIsImEiOiJja3A1M2U3enAwaWRjMm9zMXRtemhrcTV0In0.5DYW4b26H_JgEZflVIAKMw`
let coordinates;

const getTheWeather = (locationString) => {
	location = locationString;
	let result = {};
	return new Promise((resolve , reject) =>{
		request({ url: locationUrl, json: true }, (error, res, body) => {
			if (error) {
				result.success = false;
				result.message = ('An error occurred with error code : ' + error.errno);

				reject(result);
			}
			else if (body.features.length == 0 || (body.message && body.message == 'not found')) {
				result.success = false;
				result.message = ("No place exist with name - " + locationString);
				reject(result);
			}
			else {
				coordinates = body.features[0].geometry.coordinates;
				const weatherUrl = `http://api.weatherstack.com/current?access_key=96e835a2fe069fefc46173800b636aa4&query=${coordinates[0]}and${coordinates[1]}&hourly=1`;
				request({ url: weatherUrl, json: true }, (error, response, body) => {
					if (body && body.success && body.success == false) {
						result.success = false;
						result.message = ("Error occurred with code " + body.error.code);

						reject(result);
					} else if (!error) {
						result.success = true;
						result.weather = body;
						resolve(result);
					} else {
						result.success = false;
						result.message = ('An error occurred with error code : ' + error.errno);

						reject(result);
					}
				});
			}
		});
	})
}

module.exports = weather = {
	getTheWeather
}