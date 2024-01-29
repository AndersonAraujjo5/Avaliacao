import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import Usuario from "../models/Usuario";
import Candidata from "../models/Candidata";
import Jurados from "../models/Jurado";
import Nota from "../models/Nota";

const models = [Usuario, Candidata, Jurados, Nota];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection))