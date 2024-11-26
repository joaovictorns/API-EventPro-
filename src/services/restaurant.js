import Restaurant from '../app/models/Restaurant';
import { Op } from 'sequelize';

class RestaurantService {
  async store(data) {
    const { name, email, cnpj, phone_number, address, opening_hours } = data;

    const existingRestaurant = await Restaurant.findOne({
      where: {
        [Op.or]: [{ email }, { cnpj }],
      },
    });

    if (existingRestaurant) {
      throw new Error('Restaurant with this email or CNPJ already exists.');
    }

    const restaurant = await Restaurant.create({
      name,
      email,
      cnpj,
      phone_number,
      address,
      opening_hours,
    });

    return restaurant;
  }
}

export default new RestaurantService();
