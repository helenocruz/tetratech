"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjecaoPopulacional = void 0;
var Ibge_1 = require("../libraries/Ibge");
var ProjecaoPopulacional = /** @class */ (function () {
    function ProjecaoPopulacional(datetime_search) {
        if (datetime_search === void 0) { datetime_search = '01012050'; }
        this.datetime_search = '';
        this.datetime_search = datetime_search;
    }
    ProjecaoPopulacional.prototype.consult = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var ibge = new Ibge_1.Ibge(_this.datetime_search);
            var result = ibge.getProjecaoPopulacional();
            resolve(result);
        });
    };
    return ProjecaoPopulacional;
}());
exports.ProjecaoPopulacional = ProjecaoPopulacional;
