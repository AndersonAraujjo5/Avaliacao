import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class Notas extends Model {
    static init(sequelize){
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: "Campo nome deve ter entre 3 a 255 caracteres",
                    },
                },
            },
            nome_jurado: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            fantasia:  {
                type: Sequelize.FLOAT,
                defaultValue: 0,
                validate: {
                    len: {
                        args: [0, 4],
                    },
                    min:0,
                    max:10
                },
            },
            beleza:  {
                type: Sequelize.FLOAT,
                defaultValue: 0,
                validate: {
                    len: {
                        args: [0, 4],
                    },
                    min:0,
                    max:10
                },
            },
            desfile:  {
                type: Sequelize.FLOAT,
                defaultValue: 0,
                validate: {
                    len: {
                        args: [0, 4],
                    },
                    min:0,
                    max:10
                },
            },
            desconto:  {
                type: Sequelize.FLOAT,
                defaultValue: 0,
                validate: {
                    len: {
                        args: [0, 4],
                    },
                    min:0,
                    max:10
                },
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            total:  {
                type: Sequelize.FLOAT,
                defaultValue: '',
            },
        }, {
            sequelize,
        });
        return this;
    }
}