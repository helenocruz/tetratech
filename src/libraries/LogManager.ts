import * as fs from 'fs';

export class LogManager {
    
    nameFile : string = 'dataSave.txt';

    constructor(nameFile : string = 'dataSave.txt'){
        this.nameFile = nameFile;
    }

    private readFile() : Promise<object> {
        return new Promise((resolve, reject)=>{
            fs.readFile(this.nameFile,'utf8', function(error, data){
                if (error) {
                    reject(error);
                }
                try {
                    let data_Object = JSON.parse(data);
                    resolve(data_Object);
                } catch(error){
                    resolve([]);
                }
            })
        });
    }

    private writeFile(dataToWrite : object = [{}]) : Promise<object> {
        return new Promise((resolve, reject)=>{
            let data_stringify = JSON.stringify(dataToWrite);
            fs.writeFile(this.nameFile, data_stringify,  
                function(error) {
                    if (error) {
                        reject({status: 500, data: 'Erro de escrita em arquivo texto.'});
                    }
                    resolve({status: 200, data: 'Log salvo com sucesso.'});
                }
            );
        });
    }

    addLog(dataToWrite : object = [{}]) : void {
        this.readFile()
        .then((dataExistent : any)=>{
            dataExistent.unshift(dataToWrite);
            if(dataExistent.length == 10){
                dataExistent.pop();
            }
            this.writeFile(dataExistent);
        })
        .catch((error)=>{
            this.writeFile();
        });
    }

    getLogs() : Promise<object | boolean> {
        return new Promise((resolve, reject)=>{
            this.readFile()
            .then((logs)=>{
                resolve(logs);
            })
            .catch((error)=>{
                reject(false);
            })
        });
    }

}