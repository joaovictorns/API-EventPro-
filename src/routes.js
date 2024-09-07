import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EventController from './app/controllers/EventController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Todas as rotas abaixo desse middleware precisam estar autenticadas
routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/events', EventController.store);
routes.get('/events', EventController.index);
routes.put('/events/:events_id', EventController.update);
routes.delete('/events/:events_id', EventController.delete);

routes.post('/events/:eventId/subscribe', SubscriptionController.subscribe);
routes.get('/events/:eventId/participants', SubscriptionController.listEventParticipants);
routes.delete('/events/:eventId/unsubscribe', SubscriptionController.unsubscribe);

export default routes;
