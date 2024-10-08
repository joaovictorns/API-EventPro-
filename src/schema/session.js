import * as Yup from 'yup';

const schema = {
	store: Yup.object().shape({
		email: Yup.string().email(),
		cpf: Yup.string().matches(/^\d{11}$/, 'CPF must have 11 numeric digits'),
		password: Yup.string().required('Password is mandatory'),
	}).test('email-or-cpf', 'Enter your email or CPF', function (value) {
		return value.email || value.cpf;
	}).noUnknown(),
};

export default {
	store: schema.store,
};