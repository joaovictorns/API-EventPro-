import Subscription from '../models/Subscription';
import Event from '../models/Event';
import User from '../models/User';

class SubscriptionController {
  async subscribe(req, res) {
    const { eventId } = req.params;
    const userId = req.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.type !== 'participant' && user.type !== 'admin') {
      return res.status(403).json({ error: 'Only participants can subscribe to events.' });
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const alreadySubscribed = await Subscription.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (alreadySubscribed) {
      return res.status(400).json({ error: 'You are already subscribed to this event.' });
    }

    const subscription = await Subscription.create({ event_id: eventId, user_id: userId });

    return res.json(subscription);
  }

  async listEventParticipants(req, res) {
    const { eventId } = req.params;
    const userId = req.userId;
  // verificar a partir do token do usuario se o type dele e admin ou org, para poder listar os participantes do evento criado.
  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  
  if (user.type !== 'admin' && user.type !== 'org') {
    return res.status(403).json({ error: 'Only admin or org can list events.' });
  }
  
    const event = await Event.findByPk(eventId, {
      include: {
        model: Subscription,
        as: 'subscriptions',
        include: {
          model: User,
          as: 'user', 
          attributes: ['id', 'name', 'email'], 
        },
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const participants = event.subscriptions.map(subscription => subscription.user);

 
    if (participants.length === 0) {
      return res.status(404).json({ error: 'No participants found for this event.' });
    }
    return res.json(participants);
}

  async unsubscribe(req, res) {
    const { eventId } = req.params;
    const userId = req.userId;

    const subscription = await Subscription.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    await subscription.destroy();

    return res.json({ success: true });
  }
}

export default new SubscriptionController();