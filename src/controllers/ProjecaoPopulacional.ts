import { Ibge } from '../libraries/Ibge';

export class ProjecaoPopulacional {

    datetime_search : String = '';

    constructor(datetime_search : String = '01012050'){
        this.datetime_search = datetime_search;
    }

    public consult(): Promise <any> {
        return new Promise((resolve, reject)=>{
            let ibge = new Ibge(this.datetime_search);
            ibge.getProjecaoPopulacional()
            .then((result)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(error);
            })
        }); 
    }
}

