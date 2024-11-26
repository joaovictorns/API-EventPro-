import User from "../app/models/User";

import { Op } from 'sequelize';
class UserService {
	async store(data) {
		const userExist = await User.findOne({
			where: {
				[Op.or]: [{ email: data.email }, { cpf: data.cpf }]
			}
		});

		if (userExist) {
			throw new Error('User already exists.');
		}

		if (data.type === 'admin') {
			const adminExist = await User.findOne({ where: { type: 'admin' } });

			if (adminExist) {
				throw new Error('An admin user already exists.');
			}
		}

		const user = await User.create(data);

		return user;
	}

	async update(req, res) {
		const { email, oldPassword, cpf } = req.body;

		const user = await User.findByPk(req.params.id);

		if (email && email !== user.email) {
			const userExist = await User.findOne({
				where: { email },
			});

			if (userExist) {
				return res.status(400).json({ error: 'User already exists.' });
			}
		}

		if (cpf && cpf !== user.cpf) {
			const cpfRegex = /^[0-9]{11}$/;

			if (!cpfRegex.test(cpf)) {
				throw new Error('CPF must have exactly 11 digits and only numbers.');
			}

			const userExists = await User.findOne({
				where: { cpf },
			});

			if (userExists) {
				return res.status(400).json({ error: 'User already exists.' });
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password is incorrect' });
		}

		try {
			const updatedUser = await User.update({
				...req.body
			}, {
				where: { id: req.params.id }
			});

			return({
				message: 'User updated successfully.',
				user: updatedUser
			});
		} catch (error) {
			console.log(error);

			throw new Error('User could not be updated.');
		}
	}

	async delete(req) {
		const userRequestingDeletion = await User.findByPk(req.userId);

		if (userRequestingDeletion.type !== 'admin') {
			return { status: 403, message: 'Only admin can delete users.' };
		}

		const { id } = req.params;
		const userToDelete = await User.findByPk(id);

		if (userToDelete.type === 'admin') {
			return { status: 403, message: 'Admin users cannot be deleted.' };
		}

		await userToDelete.destroy();

		return { status: 200, message: 'User deleted successfully.' };
	};
};

export default new UserService();