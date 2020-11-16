import * as restify from 'restify';
import { Router } from './Router';
import { ProjecaoPopulacional } from '../controllers/ProjecaoPopulacional';
import { Log } from '../controllers/Log';

class Routers_ApiPopulacao extends Router{
    //Declaração de Rotas: Exclusívo Projeção Populacional
    
    applyRouter(application: restify.Server) : any {
        
        application.get('/consult:datetime',(req, resp, next) => {
            let datetime_search : String = req.query.datetime;
            let projecaoPopulacional = new ProjecaoPopulacional(datetime_search);
            projecaoPopulacional.consult()
            .then((result)=>{
                resp.header("Access-Control-Allow-Origin", "*");
                resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                resp.status(result.status);
                resp.json(result.data);
                return next();    
            })
            .catch((error)=>{
                resp.header("Access-Control-Allow-Origin", "*");
                resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                resp.status(error.status);
                resp.json(error.data);
                return next();  
            });
        });   

        application.get('/logs',(req, resp, next) => {
            let logController : Log = new Log();
            logController.getLogs()
            .then((result)=>{
                resp.header("Access-Control-Allow-Origin", "*");
                resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                resp.status(200);
                resp.json(result.data);
                return next();    
            })
            .catch((error)=>{
                resp.header("Access-Control-Allow-Origin", "*");
                resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                resp.status(error.status);
                resp.json(error.data);
                return next(); 
            });
        });
        
        //Futuras rotas relacionadas a Projeção População podem ser adicionadas aqui.
    }
}

export const routersApiPopulacao = new Routers_ApiPopulacao();