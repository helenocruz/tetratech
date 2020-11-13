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
exports.Server = void 0;
var restify = __importStar(require("restify"));
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port.toString();
    }
    Server.prototype.startRoutes = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            try {
                _this.aplication = restify.createServer({
                    name: 'TretaTech - Teste 16/11/2020',
                    version: '1.0.0',
                });
                _this.aplication.listen(_this.port, function () {
                    res(_this.aplication);
                    //console.log('Service: ', this.aplication.name, this.aplication.url);
                });
                _this.aplication.get('/ola', function (req, resp, next) {
                    resp.contentType = 'application/json';
                    resp.status(200);
                    resp.json({ message: 'hello' });
                    return next();
                });
            }
            catch (error) {
                rej(error);
            }
        });
    };
    Server.prototype.boot = function () {
        var _this = this;
        return this.startRoutes().then(function () { return _this; });
    };
    return Server;
}());
exports.Server = Server;
