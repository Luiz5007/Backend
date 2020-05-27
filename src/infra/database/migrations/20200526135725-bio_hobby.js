'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bio_hobby', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      bio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'biographies', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      hobby_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'hobbies', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      descr: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bio_hobby')
  },
}
