import * as Yup from 'yup';

const schema = {
	create: Yup.object().shape({
		title: Yup.string().required(),
		description: Yup.string().required(),
		locale: Yup.string().required(),
	}),
	update: Yup.object().shape({
		title: Yup.string().nullable(),
		locale: Yup.string().nullable(),
		description: Yup.string().nullable()
	})
};

export default {
	create: schema.create,
	update: schema.update,
};