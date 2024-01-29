'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('jurados', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
      },
      password_hash:{
        type: Sequelize.STRING,
        allowNull:false
      },
      created_at:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      updated_at:{
        type: Sequelize.STRING,
        allowNull:false,
      }
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('jurados');
  }
};
