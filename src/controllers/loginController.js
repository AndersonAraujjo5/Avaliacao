import Jurados from "../models/Jurado";
import Usuario from "../models/Usuario";
exports.index = async (req, res) => {
    const user = await Usuario.create({
        nome:"Anderson Tailon",
        user:"anderson@ti",
        password:"123456",
    });
    console.log(user)
    res.json(user);
};

exports.login = async (req, res) => {
    const {user = "", password = ""} = req.body;

    const usuario = await Jurados.findOne({where: {user}});
    
    if(!usuario){
        req.flash('errors', ["Login invalido"]);
        req.session.save(function() {
            return res.redirect("back");
        });
        return;
    }
 
    if(!(await usuario.passwordIsValid(password))){
        req.flash('errors', ["senha invalida"]);
        req.session.save(function() {
            return res.redirect("back");
        });
        return;

    }
   
    const {id, nome} = usuario;
    req.session.user = {id, nome};
    res.redirect("/");
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/")
}