import { LogManager } from '../libraries/LogManager';

export class Log {

    constructor(){}

    getLogs(): Promise <any> {
        return new Promise((resolve, reject)=>{
            let logManager = new LogManager();
            logManager.getLogs()
            .then((logs : object | boolean)=>{
                logs = {
                    status: 200,
                    data: logs
                }
                resolve(logs);
            })
            .catch((error : object | boolean)=>{
                error = {
                    status: 500,
                    data: 'Erro na gravação de informações em arquivo UTF8.'
                }
                reject(error);
            })
        }); 
    }
}
