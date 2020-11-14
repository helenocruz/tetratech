"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ibge = void 0;
var GlobalRest_1 = require("./GlobalRest");
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            GlobalRest_1.getData(_this.url_ibge_projecao_populacao)
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject({ status: 500, data: error });
            });
        });
    };
    Ibge.prototype.getProjecaoPopulacional = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
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
                var dateIBGE_Utc = Date.UTC(dateIBGE.getFullYear(), dateIBGE.getMonth(), dateIBGE.getDay(), dateIBGE.getHours(), dateIBGE.getMinutes(), dateIBGE.getSeconds());
                var diffBetweenDates_Utc = _this.dataSearch_Utc - dateIBGE_Utc;
                console.log(diffBetweenDates_Utc);
                if (diffBetweenDates_Utc < 0) {
                    reject({ status: 400, data: { error: 'A data informada é anterior a data atual.' } });
                }
                var projecaoPopulacaoFutura = _this.calcProjecaoPopulacional(dataIbge.projecao.populacao, diffBetweenDates_Utc, dataIbge.projecao.periodoMedio.incrementoPopulacional); //fazer teste neste retorno
                resolve({ status: 200, data: { projecao: projecaoPopulacaoFutura, data: dateIBGE } });
            })
                .catch(function (error) {
                reject({ status: 500, data: error });
            });
        });
    };
    return Ibge;
}());
exports.Ibge = Ibge;
