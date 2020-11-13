import * as restify from 'restify';
import { Router } from './Router';
import { ProjecaoPopulacional } from '../controllers/ProjecaoPopulacional';

class Routers_ApiPopulacao extends Router{
    //Declaração de Rotas: Exclusívo Projeção Populacional

    applyRouter(application: restify.Server) : any {

        application.get('/consult',(req, resp, next) => {
            let projecaoPopulacional = new ProjecaoPopulacional();
            projecaoPopulacional.consult()
            .then((result)=>{
                resp.json({status: result});
                return next();    
            })
        });   

        application.get('/log',(req, resp, next) => {
            resp.json({status: true});
            return next();    
        });
        
        //Futuras rotas relacionadas a Projeção População podem ser adicionadas aqui.
    }
}

export const routersApiPopulacao = new Routers_ApiPopulacao();