"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjecaoPopulacional = void 0;
var Ibge_1 = require("../libraries/Ibge");
var LogManager_1 = require("../libraries/LogManager");
var ProjecaoPopulacional = /** @class */ (function () {
    function ProjecaoPopulacional(datetime_search) {
        if (datetime_search === void 0) { datetime_search = '01012050120000'; }
        this.datetime_search = '';
        this.datetime_search = datetime_search;
    }
    ProjecaoPopulacional.prototype.consult = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var ibge = new Ibge_1.Ibge(_this.datetime_search);
            ibge.getProjecaoPopulacional()
                .then(function (result) {
                var logManager = new LogManager_1.LogManager();
                logManager.addLog(result.data);
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return ProjecaoPopulacional;
}());
exports.ProjecaoPopulacional = ProjecaoPopulacional;
