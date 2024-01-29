import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class Usuario extends Model {
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
            user:  {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: "Campo user deve ter entre 3 a 255 caracteres",
                    },
                },
            },
            password_hash:  {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 255],
                        msg: "Campo senha deve ter entre 3 a 255 caracteres",
                    },
                },
            },
        }, {
            sequelize,
        });
        
        this.addHook("beforeSave", async user => {
            user.password_hash = await bcryptjs.hash(user.password, 8);
        })

        return this;
    }

    passwordIsValid(password){
        return bcryptjs.compare(password, this.password_hash);
    }
}