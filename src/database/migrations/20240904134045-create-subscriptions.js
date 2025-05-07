'use strict';

const sequelize = require("sequelize");

module.exports = {
	up: async(queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try{
			await queryInterface.createTable('subscriptions', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
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
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				updated_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue:sequelize.literal('CURRENT_TIMESTAMP'),
				},
			}, {transaction});
			await transaction.commit();

		}catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	down: async (queryInterface) => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('subscriptions', {transaction});
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
