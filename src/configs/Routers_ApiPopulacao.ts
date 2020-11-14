import * as restify from 'restify';
import { Router } from './Router';
import { ProjecaoPopulacional } from '../controllers/ProjecaoPopulacional';
import { Log } from '../controllers/Log';
import { LogManager } from '../libraries/LogManager';

class Routers_ApiPopulacao extends Router{
    //Declaração de Rotas: Exclusívo Projeção Populacional
    
    applyRouter(application: restify.Server) : any {
        
        application.get('/consult:datetime',(req, resp, next) => {
            let datetime_search : String = req.query.datetime;
            let projecaoPopulacional = new ProjecaoPopulacional(datetime_search);
            projecaoPopulacional.consult()
            .then((result)=>{
                let logManager : LogManager = new LogManager();
                logManager.addLog(result.data); //Adicionando registro de consulta no arquivo texto
                resp.status(result.status);
                resp.json(result.data);
                return next();    
            })
            .catch((error)=>{
                resp.status(error.status);
                resp.json(error.data);
                return next();  
            });
        });   

        application.get('/logs',(req, resp, next) => {
            let logController : Log = new Log();
            logController.getConsults()
            .then((result : object)=>{
                resp.json(result);
                return next();    
            })
            .catch((error : object)=>{
                resp.json(error);
                return next(); 
            });
        });
        
        //Futuras rotas relacionadas a Projeção População podem ser adicionadas aqui.
    }
}

export const routersApiPopulacao = new Routers_ApiPopulacao();