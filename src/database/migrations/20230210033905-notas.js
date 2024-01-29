'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notas', {
       id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
       },
       nome: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       nome_jurado: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       fantasia:{
        type: Sequelize.FLOAT,
        allowNull: false,
       },
       beleza:{
        type: Sequelize.FLOAT,
        allowNull: false,
       },
       desfile: {
        type: Sequelize.FLOAT,
        allowNull: false,
       },
       desconto: {
        type: Sequelize.FLOAT,
        allowNull: false,
       },
       status:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
       },
       total: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
   
    await queryInterface.dropTable('notas');

  }
};
