import * as restify from 'restify';
import { Router } from './configs/Router';

export class Server {

    application: restify.Server | any;
    port: String;

    constructor(port: number){
        this.port = port.toString();
    }

    startRoutes(routers: Router[]): Promise<any>{
        return new Promise((res, rej)=>{
            try {
                this.application = restify.createServer({
                    name: 'TretaTech - Projeção Populacional - Teste 16/11/2020',
	                version: '1.0.0',
                });

                for(let router of routers){
                    router.applyRouter(this.application);
                }

                this.application.listen(this.port,()=>{
                    res(this.application)
                });

            } catch(error){
                rej(error);
            }
        });
    }

    boot(routers: Router[] = []): Promise<Server>{
        return this.startRoutes(routers).then(()=> this);
    }
}