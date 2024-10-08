import SubscriptionService from '../../services/Subscription';

class SubscriptionController {
	async store(req, res) {
		try {
			await SubscriptionService.store(req, res);
		} catch (error) {
			return res.status(400).json({ error: 'Unable to register.' });
		}
	};

	async index(req, res) {
		try {
			await SubscriptionService.index(req, res);
		} catch (error) {
			return res.status(400).json({ error: 'Unable to list event participants.' });
		}
	};

	async delete(req, res) {
		try {
			await SubscriptionService.delete(req, res);
		} catch (error) {
			return res.status(400).json({ error: 'Unable to unsubscribe from the event.' });
		}
	};
};

export default new SubscriptionController();
