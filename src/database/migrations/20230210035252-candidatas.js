'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('candidatas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull:false,

      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      representa: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull:true,
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
    await queryInterface.dropTable('candidatas');
    
  }
};
