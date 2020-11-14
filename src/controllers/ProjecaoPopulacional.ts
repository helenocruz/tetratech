import { Ibge } from '../libraries/Ibge';

export class ProjecaoPopulacional {

    datetime_search : String = '';

    constructor(datetime_search : String = '01012050'){
        this.datetime_search = datetime_search;
    }

    public consult(): Promise <any> {
        return new Promise((resolve)=>{
            let ibge = new Ibge(this.datetime_search);
            let result = ibge.getProjecaoPopulacional();
            resolve(result);
        }); 
    }
}

