import Event from '../models/Event';
import User from '../models/User';

class EventService{
  async store(req,res) {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.type !== 'admin' && user.type !== 'org') {
      return res.status(403).json({ error: 'Permission denied. Only admins and orgs can create events.' });
    }

    const { title, description, locale } = req.body;

    const events = await Event.create({
      user_id: req.userId,
      title,
      description,
      locale,
    });

    return res.json(events);
  }

  async index (req, res) {
    const events = await Event.findAll({
      where: { user_id: req.userId, deleted: false },
    });

    return res.json(events);
  }

  async update (req, res) {
    const { events_id } = req.params;

    const event = await Event.findByPk(events_id);

    if (!event) {
      return res.status(400).json({ error: 'Event does not exist.' });
    }

    const { title, locale, description } = await event.update(req.body);

    return res.json({
      title,
      locale,
      description,
    });
  }

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
  }
}
export default new EventService();