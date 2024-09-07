import Sequelize, { Model } from 'sequelize';

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        locale: Sequelize.STRING,
        description: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        deleted: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.Subscription, { foreignKey: 'event_id', as: 'subscriptions' });
    this.belongsToMany(models.User, {
      through: models.Subscription,
      foreignKey: 'event_id',
      otherKey: 'user_id',
      as: 'participants',
    });
  }
}

export default Event;
