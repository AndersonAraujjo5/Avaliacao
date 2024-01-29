import Usuario from "../models/Usuario";
import Notas from "../models/Nota";
import Sequelize from 'sequelize'
exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash("errors");
    res.locals.admin = req.session.admin;
    next();
}

exports.loginAdmin = async (req, res, next) => {
 
    if(!req.session.admin){
        res.render("loginAdmin");
        return;
    }
    next();
}

exports.loginJurados = async (req, res, next) => {


    if(!req.session.user){
        res.render("login");
        return;
    }
    next();
}
