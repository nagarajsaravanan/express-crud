const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, prettyPrint } = format;

const path = require('path');
const log = createLogger({
	format: combine(
		label({
			label: 'Node Training Activities'
		}),
		timestamp(),
		prettyPrint()
	),
	transports: [
		new transports.File({
			filename: path.join(__dirname, '../../logs/combined.log'),
			json: false
		}),
		new transports.File({
			filename: path.join(__dirname, '../../logs/error.log'),
			level: 'error',
			json: false
		})
	],
	exceptionHandlers: [
		new transports.File({
			filename: path.join(__dirname, '../../logs/exceptions.log'),
			json: false
		})
	],
	exitOnError: false
})

module.exports = { log }
