'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.createTable('restaurants', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
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
				allowNull: true,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			opening_hours: {
				type: Sequelize.STRING,
				allowNull: true,
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
		return await queryInterface.dropTable('restaurants');
	}
};
