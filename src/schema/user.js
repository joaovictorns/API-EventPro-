import * as Yup from 'yup';

const schema = {
	create: Yup.object().shape({
		name: Yup.string().required(),
		email: Yup.string().email().required(),
		password: Yup.string().required().min(6),
		type: Yup.string().required(),
		cpf: Yup.string().required(),
	}),
	update: Yup.object().shape({
		name: Yup.string(),
		email: Yup.string().email(),
		oldPassword: Yup.string().min(6),
		password: Yup.string()
			.min(6)
			.when('oldPassword', (oldPassword, schema) =>
				oldPassword ? schema.required('Password is required when oldPassword is provided') : schema
			),
		confirmPassword: Yup.string()
			.when('password', (password, schema) =>
				password
					? schema.required('Confirm password is required').oneOf([Yup.ref('password')], 'Passwords must match')
					: schema
			),
	}),
};

export default {
	create: schema.create,
	update: schema.update
};