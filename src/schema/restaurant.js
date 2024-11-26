import * as yup from 'yup';

const schema = {
  	create: yup.object().shape({
		name: yup.string().required('Name is required.'),
		email: yup.string().email('Invalid email.').required('Email is required.'),
		cnpj: yup.string().required('CNPJ is required.'),
		phone_number: yup.string(),
		address: yup.string(),
		opening_hours: yup.string()
  	}),
};

export default {
    create: schema.create
};