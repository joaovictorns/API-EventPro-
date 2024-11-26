import UserService from '../../services/User';
import UserSchema from '../../schema/user'
class UserController {
	async store(req, res) {
		const isValid = await UserSchema.create.isValid(req.body);
		
		if (!isValid) {
			return res.status(400).json({ error: 'Validation failure.' });
		}
	
		try {
			const user = await UserService.store(req.body);
	
			return res.status(201).json({ success: 'User successfully registered.', user });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}

	async update(req, res) {
		if (!(await UserSchema.update.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation failure.' });
		}

		try {
			UserService.update(req, res)

			res.status(200).json({ success: 'User updated' });
		} catch (error) {
			return res.status(400).json({ error: 'Could not update user.' });
		}
	};

	async delete(req, res) {
		try {
			const response = await UserService.delete(req);

			return res.status(response.status).json({ message: response.message });
		} catch (error) {
			return res.status(400).json({ error: 'Could not delete user.' });
		}
	};
}
export default new UserController();
