import { getData } from './GlobalRest';

export class Ibge {

    protected url_ibge_projecao_populacao : String = "https://servicodados.ibge.gov.br/api/v1/projecoes/populacao";
    protected dataSearch_Utc : number = 0;
    protected current_date_Utc: number = 0;
    protected datetime_search_Date : Date = new Date();

    constructor(datetime_search : String = '01012050120000'){
        let current_date: Date = new Date();
        current_date = new Date(current_date.getTime() - (current_date.getTimezoneOffset()*60*1000));
        this.current_date_Utc = Date.UTC(current_date.getFullYear(), current_date.getMonth(), current_date.getDay(), current_date.getHours(), current_date.getMinutes(), current_date.getSeconds());

        let date : String = datetime_search.substring(4,8) + '-' + datetime_search.substring(2,4) + '-' + datetime_search.substring(0,2);
        let time : String = datetime_search.substring(8,10) + ':' + datetime_search.substring(10,12) + ':' + datetime_search.substring(12,14);
        
        this.datetime_search_Date = new Date(date+' '+time);
        this.datetime_search_Date = new Date(this.datetime_search_Date.getTime() - (this.datetime_search_Date.getTimezoneOffset()*60*1000));
        
        this.dataSearch_Utc = Date.UTC(this.datetime_search_Date.getFullYear(), this.datetime_search_Date.getMonth(), this.datetime_search_Date.getDay(), this.datetime_search_Date.getHours(), this.datetime_search_Date.getMinutes(), this.datetime_search_Date.getSeconds());
    }

    private calcProjecaoPopulacional(projecaoPopulacaoAtual : number = 0, additionalTime_Utc : number = 0, incrementoPopulacional : number = 0) : number | boolean {
        //Metodo que realizado o calculo da Projecção Populacional
        //As entradas devem ser, obrigatoriamente, positivas e o resultado retornado deve ser positivo e maior que zero.
        if(projecaoPopulacaoAtual <= 0 || additionalTime_Utc <= 0 || incrementoPopulacional <= 0) return false;
        let projecaoPopulacaoFutura : number = (additionalTime_Utc / incrementoPopulacional) + projecaoPopulacaoAtual;
        return Math.round(projecaoPopulacaoFutura); 
    }

    getDataIbge() : Promise<object> {
        return new Promise((resolve, reject)=>{
            getData(this.url_ibge_projecao_populacao)
            .then((result)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    }

    getProjecaoPopulacional(): Promise<object> {
        return new Promise((resolve, reject)=>{
            if(this.current_date_Utc < 0 || isNaN(this.datetime_search_Date.valueOf())){
                reject({status: 400, data: {error: "O parâmetro de 'datetime' informado está incorreto."}});
            }
            this.getDataIbge()
            .then((dataIbge : any)=>{
                if(typeof dataIbge !== 'object') {
                    reject({status: 500, data: {error: 'Erro ao obter informações da API do IBGE.'}});
                }
                
                let dateReturned : String = dataIbge.horario;
                
                let date : String = dateReturned.substring(6,10) + '-' + dateReturned.substring(3,5) + '-' + dateReturned.substring(0,2); 
                let time : String = dateReturned.substring(11,13) + ':' + dateReturned.substring(14,16) + ':' + dateReturned.substring(17,19);
                
                let dateIBGE = new Date(date+' '+time); 
                dateIBGE = new Date(dateIBGE.getTime() - (dateIBGE.getTimezoneOffset()*60*1000));
                if(isNaN(dateIBGE.valueOf())){
                    reject({status: 500, data: {error: 'Erro na data informada por API do IBGE.'}});
                }
                let dateIBGE_Utc : number = Date.UTC(dateIBGE.getFullYear(), dateIBGE.getMonth(), dateIBGE.getDay(), dateIBGE.getHours(), dateIBGE.getMinutes(), dateIBGE.getSeconds());
                let diffBetweenDates_Utc = this.dataSearch_Utc - dateIBGE_Utc;

                let projecaoPopulacaoFutura = this.calcProjecaoPopulacional(dataIbge.projecao.populacao, diffBetweenDates_Utc, dataIbge.projecao.periodoMedio.incrementoPopulacional); //fazer teste neste retorno
                
                resolve({status: 200, data: {projecao: projecaoPopulacaoFutura, data_projecao: this.datetime_search_Date, data_pesquisa: dateIBGE}});
            })
            .catch((error)=>{
                reject({status: 500, data: error});
            });
        });
    }
}