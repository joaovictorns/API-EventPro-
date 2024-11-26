import Event from '../../src/app/models/Event';
import User from '../../src/app/models/User';

class EventService {
	async store(req, res) {
		const user = await User.findByPk(req.userId);

		if (!user) {
			throw new Error('User not found.');
		}

		if (user.type !== 'admin' && user.type !== 'org') {
			throw new Error('User not authorized.');
		}

		const { title, description, locale } = req.body;

		const event = await Event.create({
			user_id: req.userId,
			title,
			description,
			locale,
		});

		return event;
	};

	async index(req, res) {
		const events = await Event.findAll({
			where: { user_id: req.userId, deleted: false },
		});

		return events;
	};

	async update(req, res) {
		const event = await Event.findByPk(req.params.id);

		if (!event) {
			return res.status(400).json({ error: 'Event does not exist.' });
		}

		const { title, locale, description } = await event.update(req.body);

		return ({
			title,
			locale,
			description,
		});
	};

	async delete(req, res) {
		const { events_id } = req.params;

		const event = await Event.findByPk(events_id);

		if (!event) {
			return res.status(400).json({ error: 'Event does not exist.' });
		}

		if (event.user_id !== req.userId) {
			return res.status(401).json({ error: 'Unauthorized request' });
		}

		await event.destroy();

		return res.json({ success: true });
	};
};

export default new EventService();