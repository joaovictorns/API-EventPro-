import User from "../app/models/User";
class UserService {
	async store(req, res) {
		if (req.body.type === 'admin') {
			const adminExist = await User.findOne({
				where: { type: 'admin' }
			});

			if (adminExist) {
				return res.status(400).json({ error: 'An admin user already exists.' });
			}
		}

		const userExist = await User.findOne({
			where: { email: req.body.email }
		});

		if (userExist) {
			return res.status(400).json({ error: 'User already exists.' })
		}

		return await User.create(req.body);
	};

	async update(req, res) {
		const { email, oldPassword } = req.body;

		const user = await User.findByPk(req.userId);

		if (email !== user.email) {
			const userExist = await User.findOne({
				where: { email },
			});

			if (userExist) {
				return res.status(400).json({ error: 'User already exists.' })
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password is incorrect' });
		}

		return await user.update(req.body);
	};

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