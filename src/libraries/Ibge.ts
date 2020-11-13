import { getData } from './globalRest';

export class Ibge {

    url_ibge_projecao_populacao : String = "https://servicodados.ibge.gov.br/api/v1/projecoes/populacao";
    dataSearch_Utc : number = 0;

    constructor(datetime_search : String = '01012050120000'){
        let date : String = datetime_search.substring(4,8) + '-' + datetime_search.substring(2,4) + '-' + datetime_search.substring(0,2);
        let time : String = datetime_search.substring(8,10) + ':' + datetime_search.substring(10,12) + ':' + datetime_search.substring(12,14);
        
        let datetime_search_Date : Date = new Date(date+' '+time);
        datetime_search_Date = new Date(datetime_search_Date.getTime() - (datetime_search_Date.getTimezoneOffset()*60*1000));
        
        this.dataSearch_Utc = Date.UTC(datetime_search_Date.getFullYear(), datetime_search_Date.getMonth(), datetime_search_Date.getDay(), datetime_search_Date.getHours(), datetime_search_Date.getMinutes(), datetime_search_Date.getSeconds());
    }

    private calcProjecaoPopulacional(){

    }

    async getDataIbge(){
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

    async getProjecaoPopulacional(): Promise<object> {
        return new Promise((resolve, reject)=>{
            this.getDataIbge()
            .then((dataIbge : any)=>{
                if(typeof dataIbge !== 'object') {
                    resolve({error: 'Erro ao obter informações da API do IBGE.'});
                }
                
                let dateReturned : String = dataIbge.horario;
                
                let date : String = dateReturned.substring(6,10) + '-' + dateReturned.substring(3,5) + '-' + dateReturned.substring(0,2); 
                let time : String = dateReturned.substring(11,13) + ':' + dateReturned.substring(14,16) + ':' + dateReturned.substring(17,19);
                
                let dateIBGE = new Date(date+' '+time);
                dateIBGE = new Date(dateIBGE.getTime() - (dateIBGE.getTimezoneOffset()*60*1000));
                let dateIBGE_Utc : number = Date.UTC(dateIBGE.getFullYear(), dateIBGE.getMonth(), dateIBGE.getDay(), dateIBGE.getHours(), dateIBGE.getMinutes(), dateIBGE.getSeconds());
                
                let diffBetweenDates = this.dataSearch_Utc - dateIBGE_Utc;
                
                resolve({status: 200, data: dataIbge});
            })
            .catch((error)=>{
                reject({status: 500, data: 'Erro ao consulta dados na API do IBGE.'});
            });
        });
    }

    async getCalculoProjecaoPopulacional(): Promise<any> {
        return new Promise((resolve)=>{
            resolve(this.getProjecaoPopulacional());
        });
    }

}