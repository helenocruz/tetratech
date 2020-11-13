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
    Server.prototype.startRoutes = function (routers) {
        var _this = this;
        return new Promise(function (res, rej) {
            try {
                _this.application = restify.createServer({
                    name: 'TretaTech - Projeção Populacional - Teste 16/11/2020',
                    version: '1.0.0',
                });
                for (var _i = 0, routers_1 = routers; _i < routers_1.length; _i++) {
                    var router = routers_1[_i];
                    router.applyRouter(_this.application);
                }
                _this.application.listen(_this.port, function () {
                    res(_this.application);
                });
            }
            catch (error) {
                rej(error);
            }
        });
    };
    Server.prototype.boot = function (routers) {
        var _this = this;
        if (routers === void 0) { routers = []; }
        return this.startRoutes(routers).then(function () { return _this; });
    };
    return Server;
}());
exports.Server = Server;
