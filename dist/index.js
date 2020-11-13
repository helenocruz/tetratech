"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./src/Server");
var Routers_ApiPopulacao_1 = require("./src/configs/Routers_ApiPopulacao");
var portAccess = 8080;
var server = new Server_1.Server(portAccess);
server.boot([Routers_ApiPopulacao_1.routersApiPopulacao])
    .then(function (server) {
    console.log('Serviço funcionando em: ', server.application.address());
})
    .catch(function (error) {
    console.error("Erro encontrado");
    console.error(error);
    process.exit(1);
});
