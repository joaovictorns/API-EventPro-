import SessionService from '../../services/Session';
import SessionSchema from '../../schema/session';
class SessionController {
	async store(req, res) {
		if (!(await SessionSchema.store.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation failure.' })
		}

		try {
			await SessionService.store(req, res);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: 'Email or CPF is required to log in.' });
		}
	};
};

export default new SessionController();
