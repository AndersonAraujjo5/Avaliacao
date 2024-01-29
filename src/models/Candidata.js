import Sequelize, { Model } from 'sequelize';

export default class Candidatas extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      representa: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
            len: {
                args: [3, 255],
                msg: 'Sobrenome precisa ter entre 3 e 255 caracteres.',
            },
        },
      },
      filename:{
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      img: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://192.168.1.101:3001/assets/image/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
    });
    return this;
  }
}