import EventSchema from '../../schema/event';
import EventService from '../../services/Event';


class EventController {
	async store(req, res) {
		if (!(await EventSchema.create.isValid(req.body))) {
			return res.status(400).json({ error: 'failed to register.' });
		}

		try {
			await EventService.store(req);

			return res.status(201).json({ success: 'Event successfully registered.' });
		} catch (error) {
			console.log(error);

			return res.status(400).json({ error: 'Event already exists.' })
		}
	};

	async index(req, res) {
		try {
			const events = await EventService.index(req);

			return res.status(201).json({ events });
		} catch (error) {
			console.log(error);

			return res.status(400).json({ error: 'The event cannot be listed.' })
		}
	};

	async update(req, res) {
		if (!(await EventSchema.update.isValid(req.body))) {
			return res.status(400).json({ error: 'nanananannanan' });
		}

		try {
			await EventService.update(req, res);

			return res.status(201).json({ success: 'Event successfully updated.' });
		} catch (error) {
			return res.status(400).json({ error: 'The event cannot be updated.' })
		}
	};

	async delete(req, res) {
		try {
			await EventService.delete(req, res);
		} catch (error) {
			return res.status(400).json({ error: 'The event cannot be deleted.' });
		}
	};
};

export default new EventController();
