import Sequelize, { Model } from 'sequelize';

class Restaurant extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        cnpj: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phone_number: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        opening_hours: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default Restaurant;
