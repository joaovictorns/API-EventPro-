'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('users', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: null,
				},
				email: {
					type: Sequelize.STRING,
					unique: true,
					allowNull: false
				},
				password_hash: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				type: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				cpf: {
					type: Sequelize.STRING(11),
					allowNull: false,
					unique: true,
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				},
				updated_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				},
			},{transaction});

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	async down(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('users', { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
