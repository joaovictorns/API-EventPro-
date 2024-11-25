import UserService from '../../services/User';
import UserSchema from '../../schema/user'
class UserController {
	async store(req, res) {
		if (!await UserSchema.create.isValid(req.body)) {
			return res.status(400).json({ error: 'Validation failure.' });
		}

		try {
			await UserService.store(req, res);
		} catch (error) {
			return res.status(400).json({ error: 'User already exists.' });
		}
	};
	async update(req, res) {
		if (!(await UserSchema.update.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation failure.' });
		}
	
		try {
			const updatedUser = await UserService.update(req);
	
			return res.status(200).json({ 
				success: 'User updated successfully.', 
				user: updatedUser 
			});
		} catch (error) {
			return res.status(400).json({ 
				error: error.message || 'Could not update user.' 
			});
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
