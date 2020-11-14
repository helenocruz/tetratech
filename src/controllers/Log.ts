import { LogManager } from '../libraries/LogManager';

export class Log {

    constructor(){}

    getConsults(): Promise <any> {
        return new Promise((resolve, reject)=>{
            let logManager = new LogManager();
            logManager.getLogs()
            .then((logs : object | boolean)=>{
                resolve(logs);
            })
            .catch((error : object | boolean)=>{
                reject(error);
            })
            
        }); 
    }
}
