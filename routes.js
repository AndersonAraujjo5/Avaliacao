const express = require('express');
const route = express.Router();
const loginContrller = require("./src/controllers/loginController")
const controller = require("./src/controllers/controller")
const adminController = require("./src/controllers/adminController");
const {loginAdmin, loginJurados} = require("./src/middlewares/middleware")

route.get("/logout", loginContrller.logout);
route.post("/login", loginContrller.login);
route.get("/active", loginContrller.index);

route.get("/", loginJurados, controller.listaCandidatos);
route.get("/resultado",  loginJurados, controller.resultado)
route.get("/avaliar/:id", loginJurados, controller.avaliar);
route.post("/avaliar", loginJurados, controller.saveAvaliacao);

route.get("/admin",loginAdmin, adminController.index);
route.post("/admin", adminController.login)
route.get("/admin/cadastro-jurados",loginAdmin, adminController.jurados);
route.post("/admin/cadastro-jurados", loginAdmin, adminController.cadastroJurados);
route.get("/admin/cadastro-candidatas",loginAdmin, adminController.candidatas);
route.post("/admin/cadastro-candidatas", loginAdmin, adminController.cadastroCandidatas);


module.exports = route;