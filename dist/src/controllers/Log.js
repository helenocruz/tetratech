"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
var LogManager_1 = require("../libraries/LogManager");
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.prototype.getLogs = function () {
        return new Promise(function (resolve, reject) {
            var logManager = new LogManager_1.LogManager();
            logManager.getLogs()
                .then(function (logs) {
                logs = {
                    status: 200,
                    data: logs
                };
                resolve(logs);
            })
                .catch(function (error) {
                error = {
                    status: 500,
                    data: 'Erro na gravação de informações em arquivo UTF8.'
                };
                reject(error);
            });
        });
    };
    return Log;
}());
exports.Log = Log;
