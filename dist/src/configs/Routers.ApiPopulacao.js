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
var RoutersApiPopulacao = /** @class */ (function (_super) {
    __extends(RoutersApiPopulacao, _super);
    function RoutersApiPopulacao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoutersApiPopulacao.prototype.applyRouter = function (application) {
        application.post('/ola2', function (req, resp, next) {
            var post = {
                login: req.body.login,
                senha: req.body.senha,
                number_cell: req.body.number_cell,
                sms: req.body.sms,
                prioridade: req.body.prioridade
            };
            resp.json({ status: true });
            return next();
        });
    };
    return RoutersApiPopulacao;
}(Router_1.Router));
exports.routersApiPopulacao = new RoutersApiPopulacao();
