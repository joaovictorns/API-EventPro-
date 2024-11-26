import RestaurantSchema from '../../schema/restaurant';
import RestaurantService from '../../services/restaurant';

class RestaurantController {
  async store(req, res) {
    const isValid = await RestaurantSchema.create.isValid(req.body);

    if (!isValid) {
      return res.status(400).json({ error: 'Validation failure.' });
    }

    try {
      const restaurant = await RestaurantService.store(req.body);

      return res.status(201).json({
        success: 'Restaurant successfully created.',
        restaurant,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new RestaurantController();
