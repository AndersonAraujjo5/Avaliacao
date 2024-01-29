const ValidationNotas = require("../models/ValidationNotas");
import Notas from "../models/Nota"
import Candidatas from "../models/Candidata";


exports.listaCandidatos = async (req, res) => {
    const jurado = req.session.user.nome;

    const [candidatas, notas] = await Promise.all([
        await Candidatas.findAll(), 
        await Notas.findAll({where: {nome_jurado: jurado}})
    ])
    console.log(notas)
    res.locals.notas = notas;
    res.locals.candidata = candidatas;
    res.render("listaCandidatos");
}

exports.avaliar = async (req, res) => {
    const {id} = req.params;
    const candidata = await Candidatas.findByPk(id);
    res.locals.candidata = candidata;
    res.locals.nota = [];
    try{
        const nota = await Notas.findOne({where: {nome_jurado: req.session.user.nome, nome: candidata.nome}})
        if(nota){
            res.locals.nota = nota;
        }
        
        res.render("avaliar")
    }catch(e){
        res.render("avaliar")
    }
   
}

exports.saveAvaliacao = async (req, res) => {
    console.log("req",req.body)
    let {nome, fantasia, beleza, desfile, desconto, status} = req.body;
    status = (status == "true") ? true: false;
    fantasia = Number(fantasia);
    beleza = Number(beleza);
    desfile = Number(desfile);
    desconto = Number(desconto);

    if((fantasia < 0 || fantasia > 10) && (beleza < 0 || beleza > 10) &&
    (desfile < 0 || desfile > 10) && (desconto < 0 || desconto > 10)){
        req.flash('errors', ["Os valores tem que estar de 0 a 10"]);
        req.session.save(function() {
            return res.redirect("back");
        });
        return;
    }
    
    const calc = fantasia+beleza+desfile;
    if(calc < desconto){
        req.flash('errors', ["A nota não pode ficar negativa!"]);
        req.session.save(function() {
            return res.redirect("back");
        });
        return;
    }
    const total = parseFloat(calc-Number(desconto)).toFixed(2);

    const nota = await Notas.findOne({where: {nome_jurado: req.session.user.nome, nome: nome}})
    
    if(nota){
        if(nota.status == true){
            return res.redirect("back");
        }
        console.log("executando")
        await Notas.update({fantasia, beleza, desfile, desconto, status, total},
            {
                where: {nome ,nome_jurado:req.session.user.nome}
            })
        return res.redirect("back");
    }

    try{
        await Notas.create( {nome, nome_jurado:req.session.user.nome,
             fantasia, beleza, desfile, desconto, status, total})
    }catch(e){
        console.log(e)
    }
    res.redirect("back");
}

exports.resultado = async (req, res) => {
    res.locals.notas = [];
    try{
        // const notas = await Notas.aggregate('total', 'SUM', { plain: false, group: [ 'nome' ] },
        // {group: ['total', 'ASC']} )
        const notas = await Notas.aggregate('total', 'SUM', { plain: false, group: [ 'nome' ] },
        {group: ['total', 'ASC']} )
        const t = notas.sort((a, b) => b.SUM-a.SUM);
        
        res.locals.notas = t;
    }catch(e){
        
    }
    
    
    res.render("index")
}
