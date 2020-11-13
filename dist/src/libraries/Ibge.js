"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ibge = void 0;
var globalRest_1 = require("./globalRest");
var Ibge = /** @class */ (function () {
    function Ibge(datetime_search) {
        if (datetime_search === void 0) { datetime_search = '01012050120000'; }
        this.url_ibge_projecao_populacao = "https://servicodados.ibge.gov.br/api/v1/projecoes/populacao";
        this.dataSearch_Utc = 0;
        var date = datetime_search.substring(4, 8) + '-' + datetime_search.substring(2, 4) + '-' + datetime_search.substring(0, 2);
        var time = datetime_search.substring(8, 10) + ':' + datetime_search.substring(10, 12) + ':' + datetime_search.substring(12, 14);
        var datetime_search_Date = new Date(date + ' ' + time);
        datetime_search_Date = new Date(datetime_search_Date.getTime() - (datetime_search_Date.getTimezoneOffset() * 60 * 1000));
        this.dataSearch_Utc = Date.UTC(datetime_search_Date.getFullYear(), datetime_search_Date.getMonth(), datetime_search_Date.getDay(), datetime_search_Date.getHours(), datetime_search_Date.getMinutes(), datetime_search_Date.getSeconds());
    }
    Ibge.prototype.calcProjecaoPopulacional = function (projecaoPopulacaoAtual, additionalTime_Utc, incrementoPopulacional) {
        if (projecaoPopulacaoAtual === void 0) { projecaoPopulacaoAtual = 0; }
        if (additionalTime_Utc === void 0) { additionalTime_Utc = 0; }
        if (incrementoPopulacional === void 0) { incrementoPopulacional = 0; }
        //Metodo que realizado o calculo da Projecção Populacional
        //As entradas devem ser, obrigatoriamente, positivas e o resultado retornado deve ser positivo e maior que zero.
        if (projecaoPopulacaoAtual <= 0 || additionalTime_Utc <= 0 || incrementoPopulacional <= 0)
            return false;
        var projecaoPopulacaoFutura = (additionalTime_Utc / incrementoPopulacional) + projecaoPopulacaoAtual;
        return Math.round(projecaoPopulacaoFutura);
    };
    Ibge.prototype.getDataIbge = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        globalRest_1.getData(_this.url_ibge_projecao_populacao)
                            .then(function (result) {
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject({ status: 500, data: error });
                        });
                    })];
            });
        });
    };
    Ibge.prototype.getProjecaoPopulacional = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.getDataIbge()
                            .then(function (dataIbge) {
                            if (typeof dataIbge !== 'object') {
                                resolve({ error: 'Erro ao obter informações da API do IBGE.' });
                            }
                            var dateReturned = dataIbge.horario;
                            var date = dateReturned.substring(6, 10) + '-' + dateReturned.substring(3, 5) + '-' + dateReturned.substring(0, 2);
                            var time = dateReturned.substring(11, 13) + ':' + dateReturned.substring(14, 16) + ':' + dateReturned.substring(17, 19);
                            var dateIBGE = new Date(date + ' ' + time);
                            dateIBGE = new Date(dateIBGE.getTime() - (dateIBGE.getTimezoneOffset() * 60 * 1000));
                            var dateIBGE_Utc = Date.UTC(dateIBGE.getFullYear(), dateIBGE.getMonth(), dateIBGE.getDay(), dateIBGE.getHours(), dateIBGE.getMinutes(), dateIBGE.getSeconds());
                            var diffBetweenDates_Utc = _this.dataSearch_Utc - dateIBGE_Utc;
                            var projecaoPopulacaoFutura = _this.calcProjecaoPopulacional(dataIbge.projecao.populacao, diffBetweenDates_Utc, dataIbge.projecao.periodoMedio.incrementoPopulacional); //fazer teste neste retorno
                            resolve({ status: 200, data: { projecao: projecaoPopulacaoFutura } });
                        })
                            .catch(function (error) {
                            reject({ status: 500, data: error });
                        });
                    })];
            });
        });
    };
    Ibge.prototype.getCalculoProjecaoPopulacional = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        resolve(_this.getProjecaoPopulacional());
                    })];
            });
        });
    };
    return Ibge;
}());
exports.Ibge = Ibge;
