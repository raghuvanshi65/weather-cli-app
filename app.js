const yargs = require('yargs');
const chalk = require('chalk');
const validator = require('validator');
const weather = require('./weather');
const getTheWeather = weather.getTheWeather;
const {argv} = require('process');

yargs.command({
	command: 'getWeather',
	describe: 'This command is used to get the weather details of your location',
	builder: {
		locationString: {
			describe: 'Enter the location in words',
			default: 'indore',
			type: 'string',
			demandOption: true
		}
	},
	handler: function (argv) {
		getTheWeather(argv.locationString).then((result) => {
			if (result.success == true) {
				console.log(`The current data for weather forecast is :`);
				console.log(result.weather.current);
			}
		}).catch((result)=>console.log(result.message));
	}
})

console.log(yargs.argv);


