const express = require('express');
const routes = express.Router();

const adminController = require("../controllers/adminControllers");

routes.get("/dashboard", adminController.dashboard);
routes.get("/customerdetails", adminController.customerdetails);
routes.get("/customerprofile/:id", adminController.customerprofile);
routes.get("/customerprofileedit/:id", adminController.customerprofileedit);
routes.get("/loandetails", adminController.loandetails);
routes.get("/loanrequest", adminController.loanrequest);
routes.get("/activeloan", adminController.activeloan);
routes.get("/executive", adminController.executive);
routes.get("/categories", adminController.categories);
routes.get("/autopayment", adminController.autopayment);
routes.get("/precloseEMI", adminController.precloseEMI);
routes.get("/setting", adminController.setting);
routes.get("/twowheeler", adminController.twowheeler);
routes.get("/fourwheeler", adminController.fourwheeler);
routes.get("/homeappliances", adminController.homeappliances);
routes.get("/login", adminController.login);
routes.get("/bankdetails/:id", adminController.bankdetails);
routes.get("/pandetails/:id", adminController.pandetails);
routes.get("/executiveone/:id", adminController.executiveone);
routes.get('/createassociateaccount', adminController.createassociateaccount);


routes.get('/userprofile', adminController.userprofile);
routes.get('/blog', adminController.blog);
routes.get('/faq', adminController.faq);
routes.get('/arts',adminController.arts);
routes.get('/alldata',adminController.alldata)



module.exports = routes;