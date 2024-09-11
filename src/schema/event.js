import * as Yup from 'yup';

const schema = {
  create: Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    locale: Yup.string().required(),
  }),
  update: Yup.object().shape({
    title: Yup.string(),
    locale: Yup.string(),
    description: Yup.string(),
  })
};

export default {
	create: schema.create,
  update: schema.update,
}