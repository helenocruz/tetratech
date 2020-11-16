import { Ibge } from '../libraries/Ibge';
import { LogManager } from '../libraries/LogManager';

export class ProjecaoPopulacional {

    datetime_search : String = '';

    constructor(datetime_search : String = '01012050120000'){
        this.datetime_search = datetime_search;
    }

    public consult(): Promise <any> {
        return new Promise((resolve, reject)=>{
            let ibge = new Ibge(this.datetime_search);
            ibge.getProjecaoPopulacional()
            .then((result : any)=>{
                let logManager : LogManager = new LogManager();
                logManager.addLog(result.data);
                resolve(result);
            })
            .catch((error)=>{
                reject(error);
            })
        }); 
    }
}

