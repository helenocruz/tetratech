import * as fs from 'fs';

export class LogManager {
    
    nameFile : string = 'dataSave.txt';

    constructor(nameFile : string = 'dataSave.txt'){
        this.nameFile = nameFile;
    }

    private readFile() : Promise<object | boolean> {
        return new Promise((resolve, reject)=>{
            fs.readFile(this.nameFile,'utf8', function(error, data){
                if(error || data == null) {
                    reject(false);
                }
                try {
                    let data_Object = JSON.parse(data);
                    resolve(data_Object);
                } catch(error){
                    //Caso o coteudo no arquivo de texto de dados não esteja no formato JSON, desconsiderar o conteudo.
                    resolve([{}]);
                }
            })
        });
    }

    private writeFile(dataToWrite : object = [{}]) : Promise<boolean> {
        return new Promise((resolve, reject)=>{
            let data_stringify = JSON.stringify(dataToWrite);
            fs.writeFile(this.nameFile, data_stringify,  
                function(error) {
                    if (error) {
                        reject(false);
                    }
                    resolve(true);
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
                reject(error);
            })
        });
    }
}