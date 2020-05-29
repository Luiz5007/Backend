'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('biographyhobby', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      biography_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'biographies',
          key: 'id',
        },
      },
      hobby_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'hobbies',
          key: 'id',
        },
      },
      descr: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('biographyhobby')
  },
}
