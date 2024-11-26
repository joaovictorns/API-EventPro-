import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EventController from './app/controllers/EventController';
import SubscriptionController from './app/controllers/SubscriptionController';
import RestaurantController from './app/controllers/restaurant';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/restaurants', RestaurantController.store);

routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

routes.post('/events', authMiddleware, EventController.store);
routes.get('/events', authMiddleware, EventController.index);
routes.put('/events/:id', authMiddleware, EventController.update);
routes.delete('/events/:events_id', authMiddleware, EventController.delete);

routes.post('/events/:eventId/subscribe', authMiddleware, SubscriptionController.store);
routes.get('/events/:eventId/participants', authMiddleware, SubscriptionController.index);
routes.delete('/events/:eventId/unsubscribe', authMiddleware, SubscriptionController.delete);

export default routes;
