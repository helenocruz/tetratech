"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ibge = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var Ibge = /** @class */ (function () {
    function Ibge(datetime_search) {
        if (datetime_search === void 0) { datetime_search = '01012050120000'; }
        this.url_ibge_projecao_populacao = "https://servicodados.ibge.gov.br/api/v1/projecoes/populacao";
        this.dataSearch_Utc = 0;
        this.current_date_Utc = 0;
        this.datetime_search_Date = new Date();
        var current_date = new Date();
        current_date = new Date(current_date.getTime() - (current_date.getTimezoneOffset() * 90 * 1000));
        this.current_date_Utc = Date.UTC(current_date.getFullYear(), current_date.getMonth(), current_date.getDate(), current_date.getHours(), current_date.getMinutes(), current_date.getSeconds());
        var date = datetime_search.substring(4, 8) + '-' + datetime_search.substring(2, 4) + '-' + datetime_search.substring(0, 2);
        var time = datetime_search.substring(8, 10) + ':' + datetime_search.substring(10, 12) + ':' + datetime_search.substring(12, 14);
        this.datetime_search_Date = new Date(date + 'T' + time);
        this.datetime_search_Date = new Date(this.datetime_search_Date.getTime() - (this.datetime_search_Date.getTimezoneOffset() * 60 * 1000));
        this.dataSearch_Utc = Date.UTC(this.datetime_search_Date.getFullYear(), this.datetime_search_Date.getMonth(), this.datetime_search_Date.getDate(), this.datetime_search_Date.getHours(), this.datetime_search_Date.getMinutes(), this.datetime_search_Date.getSeconds());
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            node_fetch_1.default(_this.url_ibge_projecao_populacao)
                .then(function (result) {
                resolve(result.json());
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    Ibge.prototype.getProjecaoPopulacional = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ((_this.dataSearch_Utc - _this.current_date_Utc) < 0 || isNaN(_this.datetime_search_Date.valueOf())) {
                reject({ status: 400, data: { error: "O parâmetro de 'datetime' informado está incorreto." } });
            }
            _this.getDataIbge()
                .then(function (dataIbge) {
                if (typeof dataIbge !== 'object') {
                    reject({ status: 500, data: { error: 'Erro ao obter informações da API do IBGE.' } });
                }
                var dateReturned = dataIbge.horario;
                var date = dateReturned.substring(6, 10) + '-' + dateReturned.substring(3, 5) + '-' + dateReturned.substring(0, 2);
                var time = dateReturned.substring(11, 13) + ':' + dateReturned.substring(14, 16) + ':' + dateReturned.substring(17, 19);
                var dateIBGE = new Date(date + ' ' + time);
                dateIBGE = new Date(dateIBGE.getTime() - (dateIBGE.getTimezoneOffset() * 60 * 1000));
                if (isNaN(dateIBGE.valueOf())) {
                    reject({ status: 500, data: { error: 'Erro na data informada por API do IBGE.' } });
                }
                var dateIBGE_Utc = Date.UTC(dateIBGE.getFullYear(), dateIBGE.getMonth(), dateIBGE.getDay(), dateIBGE.getHours(), dateIBGE.getMinutes(), dateIBGE.getSeconds());
                var diffBetweenDates_Utc = _this.dataSearch_Utc - dateIBGE_Utc;
                var projecaoPopulacaoFutura = _this.calcProjecaoPopulacional(dataIbge.projecao.populacao, diffBetweenDates_Utc, dataIbge.projecao.periodoMedio.incrementoPopulacional); //fazer teste neste retorno
                resolve({ status: 200, data: { projecao: projecaoPopulacaoFutura, data_projecao: _this.datetime_search_Date, data_pesquisa: dateIBGE } });
            })
                .catch(function (error) {
                reject({ status: 500, data: error });
            });
        });
    };
    return Ibge;
}());
exports.Ibge = Ibge;
