const { failureResponse } = require('./../utils/response')
const niv = require('node-input-validator');
const mongoose = require('mongoose');
var _id = '';

/**
 *
 * Validation Middleware Function.
 *
 */

const Validation = validate => {
	return async (req, res, next) => {
		try {
			console.log('req',req.file);
			_id = req.params.id;
			const validationRules = new niv.Validator(req.body, validate);
			const matched = await validationRules.check();
			if (!matched) {
				const { errors } = validationRules;
				const keyValues = Object.keys(errors);
				const validationErrors = {};
				keyValues.map(key => {
					validationErrors[key] = [];
					return validationErrors[key].push(errors[key].message);
				});
				return failureResponse(res, {status: 422, message: 'failure', response: validationErrors });
			}
			next();
		} catch (error) {
			return failureResponse(res, {status: 500, message: 'failure'});
		}
		return false;
	};
};

niv.extend('unique', async ({ value, args }) => {
	// default field is email in this example
	const field = args[1] || 'email';

	const condition = {};

	condition[field] = value;

	// add ignore condition
	if (args[2]) {
		condition['_id'] = {
			$ne: mongoose.Types.ObjectId(_id)
		};
	}

	const emailExist = await mongoose.model(args[0]).findOne(condition).select(field);
	// email already exists
	if (emailExist) {
		return false;
	}

	return true;
});

module.exports = Validation;