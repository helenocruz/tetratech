"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManager = void 0;
var fs = __importStar(require("fs"));
var LogManager = /** @class */ (function () {
    function LogManager(nameFile) {
        if (nameFile === void 0) { nameFile = 'dataSave.txt'; }
        this.nameFile = 'dataSave.txt';
        this.nameFile = nameFile;
    }
    LogManager.prototype.readFile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs.readFile(_this.nameFile, 'utf8', function (error, data) {
                if (error) {
                    reject(error);
                }
                try {
                    var data_Object = JSON.parse(data);
                    resolve(data_Object);
                }
                catch (error) {
                    resolve([]);
                }
            });
        });
    };
    LogManager.prototype.writeFile = function (dataToWrite) {
        var _this = this;
        if (dataToWrite === void 0) { dataToWrite = [{}]; }
        return new Promise(function (resolve, reject) {
            var data_stringify = JSON.stringify(dataToWrite);
            fs.writeFile(_this.nameFile, data_stringify, function (error) {
                if (error) {
                    reject({ status: 500, data: 'Erro de escrita em arquivo texto.' });
                }
                resolve({ status: 200, data: 'Log salvo com sucesso.' });
            });
        });
    };
    LogManager.prototype.addLog = function (dataToWrite) {
        var _this = this;
        if (dataToWrite === void 0) { dataToWrite = [{}]; }
        this.readFile()
            .then(function (dataExistent) {
            dataExistent.unshift(dataToWrite);
            if (dataExistent.length == 10) {
                dataExistent.pop();
            }
            _this.writeFile(dataExistent);
        })
            .catch(function (error) {
            _this.writeFile();
        });
    };
    LogManager.prototype.getLogs = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.readFile()
                .then(function (logs) {
                resolve(logs);
            })
                .catch(function (error) {
                reject(false);
            });
        });
    };
    return LogManager;
}());
exports.LogManager = LogManager;
