import Usuario from "../models/Usuario";
import Jurados from "../models/Jurado";
import Candidatas from "../models/Candidata";
import Notas from "../models/Nota";
import multerConfig from "../config/multerConfig";
import { Sequelize } from "sequelize";
import multer from "multer";

const upload = multer(multerConfig).single('foto');

exports.login = async (req, res) => {
    const {user = "", password = ""} = req.body;

    const usuario = await Usuario.findOne({where: {user}});
    
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
    req.session.admin = {id, nome};
    res.redirect("/admin/");
}


exports.index = async (req, res) => {
    res.locals.jurados = await Jurados.findAll();
    res.locals.candidatas = await Candidatas.findAll();
    const nota = await Notas.findAll();
    nota.sort((a, b) => {
        const nameA = a.nome.toUpperCase(); // ignore upper and lowercase
        const nameB = b.nome.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
    });
    res.locals.notas = nota;
    

    res.locals.notaFinal = await notaFinal();

   res.render("admin")
}

exports.jurados = (req, res) => {
    res.render("cadastro-jurados")
}

exports.cadastroJurados = async (req, res) => {
    const {nome, user, password} = req.body;
    try{
        
        await Jurados.create({nome, user, password});
        res.redirect("/admin/");
    }catch(e){
        console.log(e)
    }
   
    
}

exports.candidatas = (req, res) => {
    res.render("cadastro-candidatas")
}

exports.cadastroCandidatas = async (req, res) => {
    return upload(req,res, async (err) => {
        if(err){
            return res.render("errorimage")
        }

        try{
            const { originalname, filename } = req.file;
            const {nome, idade, representa, descricao} = req.body;
            const t = await Candidatas.create({nome, idade, representa, descricao, nota: 0, filename});
            res.redirect("/admin/");
        }catch(e){
            console.log(e)
        }
    })   
 
}

async function notaFinal(){
    const total = await Notas.findAll({
        attributes: ['nome', [Sequelize.fn('sum', Sequelize.col('total')), 'total']],
        group : ['Notas.nome'],
        raw: true,
        order: Sequelize.literal('total DESC')
      });
      const beleza = await Notas.findAll({
        attributes: ['nome', [Sequelize.fn('sum', Sequelize.col('beleza')), 'beleza']],
        group : ['Notas.nome'],
        raw: true,
        order: Sequelize.literal('beleza DESC')
      });

      const desfile = await Notas.findAll({
        attributes: ['nome', [Sequelize.fn('sum', Sequelize.col('desfile')), 'desfile']],
        group : ['Notas.nome'],
        raw: true,
        order: Sequelize.literal('desfile DESC')
      });
      const fantasia = await Notas.findAll({
        attributes: ['nome', [Sequelize.fn('sum', Sequelize.col('fantasia')), 'fantasia']],
        group : ['Notas.nome'],
        raw: true,
        order: Sequelize.literal('fantasia DESC')
      });
      const desconto = await Notas.findAll({
        attributes: ['nome', [Sequelize.fn('sum', Sequelize.col('desconto')), 'desconto']],
        group : ['Notas.nome'],
        raw: true,
        order: Sequelize.literal('desconto DESC')
      });

      total.forEach((dados, i) => {
        beleza.forEach((be) => {
            if(dados.nome === be.nome){
                total[i].beleza = be.beleza
            }
        })

        desfile.forEach((be) => {
            if(dados.nome === be.nome){
                total[i].desfile = be.desfile
            }
        })
        fantasia.forEach((be) => {
            if(dados.nome === be.nome){
                total[i].fantasia = be.fantasia
            }
        })
        desconto.forEach((be) => {
            if(dados.nome === be.nome){
                total[i].desconto = be.desconto
            }
        })

      })

      total.sort((a, b) =>{
        console.log(a.nome)
        console.log(b.nome)
       
        if(a.total === b.total){
            if(a.fantasia !== b.fantasia){
                return  b.fantasia - a.fantasia
            }
            if(a.desfile !== b.desfile){
                return b.desfile - a.desfile;
            }
            if(a.beleza !== b.beleza){
                return b.beleza - a.beleza
            }
        }
      })
 
      console.log(total)
      return total;
}
