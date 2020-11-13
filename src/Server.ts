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
                    name: 'TetraTech - Projeção Populacional - Teste 16/11/2020',
	                version: '1.0.0',
                });

                this.application.use(restify.plugins.queryParser());

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

    async boot(routers: Router[] = []): Promise<Server>{
        await this.startRoutes(routers);
        return this;
    }
}