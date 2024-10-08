import Sequelize, { Model } from 'sequelize';

class Subscription extends Model {
	static init(sequelize) {
		super.init(
			{
				event_id: Sequelize.INTEGER,
				user_id: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);
	};

	static associate(models) {
		this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
	};
};

export default Subscription;
