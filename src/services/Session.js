import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import User from '../app/models/User';
import authConfig from '../config/auth';


class SessionService {
	async store(req, res) {
		const { email, cpf, password } = req.body;
		if (cpf) {
			const cpfRegex = /^\d{11}$/;

			if (!cpfRegex.test(cpf)) {
				return res.status(400).json({ error: 'CPF must contain exactly 11 digits and only numbers.' });
			}
		}

		const user = await User.findOne({
			where: {
				[Sequelize.Op.or]: [
					{ email: email ? email : null },
					{ cpf: cpf ? cpf : null },
				],
			},
		});

		if (!user) {
			return res.status(401).json({ error: 'User does not exist.' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ error: 'Password does not match.' });
		}

		const { id, name } = user;

		return res.json({
			user: {
				id,
				name,
				email: user.email,
				cpf: user.cpf
			},
			token: jwt.sign({ id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	};
};

export default new SessionService();