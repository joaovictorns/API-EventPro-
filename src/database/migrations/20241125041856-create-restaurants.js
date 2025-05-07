'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('restaurants', {
				id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
				},
				name: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
				},
				cnpj: {
					type: Sequelize.STRING(14),
					allowNull: false,
					unique: true,
				},
				phone_number: {
					type: Sequelize.STRING(12),
					allowNull: true,
				},
				address: {
					type: Sequelize.STRING(255),
					allowNull: true,
				},
				opening_hours: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				updated_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			}, {transaction});
			await transaction.commit();
		}catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	down: async queryInterface => {
		const transaction = await queryInterface.sequelize.transaction();

		try{
			await queryInterface.dropTable('restaurants');

			await transaction.commit();

		}catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
