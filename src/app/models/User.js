import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';


class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        type: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }

  static associate(models) {
    this.hasMany(models.Subscription, { foreignKey: 'user_id', as: 'subscriptions' });
    this.hasMany(models.Event, { foreignKey: 'user_id', as: 'events' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
