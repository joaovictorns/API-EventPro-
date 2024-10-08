'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.createTable('subscriptions', {

			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			event_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'events',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface) {

		return await queryInterface.dropTable('subscriptions');
	}
};
