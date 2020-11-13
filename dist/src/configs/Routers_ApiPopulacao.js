"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.routersApiPopulacao = void 0;
var Router_1 = require("./Router");
var ProjecaoPopulacional_1 = require("../controllers/ProjecaoPopulacional");
var Routers_ApiPopulacao = /** @class */ (function (_super) {
    __extends(Routers_ApiPopulacao, _super);
    function Routers_ApiPopulacao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //Declaração de Rotas: Exclusívo Projeção Populacional
    Routers_ApiPopulacao.prototype.applyRouter = function (application) {
        application.get('/consult:datetime', function (req, resp, next) {
            var datetime_search = req.query.datetime;
            var projecaoPopulacional = new ProjecaoPopulacional_1.ProjecaoPopulacional(datetime_search);
            projecaoPopulacional.consult()
                .then(function (result) {
                resp.status(result.status);
                resp.json(result.data);
                return next();
            })
                .catch(function (error) {
                resp.status(error.status);
                resp.send(error.data);
                return next();
            });
        });
        application.get('/log', function (req, resp, next) {
            resp.json({ status: true });
            return next();
        });
        //Futuras rotas relacionadas a Projeção População podem ser adicionadas aqui.
    };
    return Routers_ApiPopulacao;
}(Router_1.Router));
exports.routersApiPopulacao = new Routers_ApiPopulacao();
