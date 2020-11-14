"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
var LogManager_1 = require("../libraries/LogManager");
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.prototype.getConsults = function () {
        return new Promise(function (resolve, reject) {
            var logManager = new LogManager_1.LogManager();
            logManager.getLogs()
                .then(function (logs) {
                resolve(logs);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return Log;
}());
exports.Log = Log;
