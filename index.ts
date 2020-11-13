import { Server } from './src/Server';
import { routersApiPopulacao } from './src/configs/Routers_ApiPopulacao';

const portAccess: number = 8080;

const server = new Server(portAccess);

server.boot([routersApiPopulacao])
	.then((server)=>{
		console.log('Serviço funcionando em: ', server.application.address());
	})
	.catch((error)=>{
		console.error("Erro encontrado");
		console.error(error);
		process.exit(1);
	});