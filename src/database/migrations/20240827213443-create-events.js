'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {

		const transaction = await queryInterface.sequelize.transaction();
		try{
			await queryInterface.createTable('events', {
				id: {
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
					type: Sequelize.INTEGER
				},
				title: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				locale: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				description: {
					type: Sequelize.STRING(255),
					allowNull: false,
				},
				deleted: {
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},
				user_id: {
					type: Sequelize.INTEGER,
					references: {
						model: 'users',
						key: 'id'
					},
					onUpdate: 'CASCADE',
					onDelete: 'SET NULL',
					allowNull: false,
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
			}, {transaction});

			await transaction.commit();
		}catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	async down(queryInterface) {

		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('events', { transaction });
			await transaction.commit();
		}catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
