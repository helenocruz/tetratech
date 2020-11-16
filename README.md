# TretaTech

Consulta de Projeção Populacional (Consumo de API do IBGE)- Sistema para teste de Desenvolvedor Back-end TetraTech.
[Exemplo] (http://x/)


## Table of Contents

- [Instalation](#Instalation)
- [Features](#features)
- [EnPoints](#enPoints)
- [Test](#test)
- [Live](#live)
- [Explanation](#explanation)
- [Developer](#developer)

## Instalation
O sistema deverá ser executado em sistema provido das ferramentas: NodeJS, NPM, TSC e JEST (recomendado instalações de forma global). Exemplo de execução: 

```bash
#Instalação de execução.

#Clone repositório
git clone https://github.com/helenocruz/tetratech

#Instalar dependências
cd tretatech
npm install

#Executar sistema (ficará habilitado por padrão na porta 8080)
npm start

#Pode optar por executar evitando transpiler TypeScript
node dist/index.js

```

## Features
- Realiza consulta de Projeção Populacional em API do IBGE, gera cache com os ultimos 10 resultados;
- Requisições RestFul (GET), metodos /consult e /logs;
- Retorna resultado em formato JSON;
- Teste de código utilizando Framework Jest;

## EnPoints

- consult
O EndPoint '/consult' realiza a consulta da projeção populacional brasileira, deve-se informar o parâmetro 'datetime', deforma que seja a data e horario que se deseja a projeção, sendo somente números. Exemplo:

```js
//Requição de projeção populacional para a data 08/06/2079 as 11:05:30.
axios({
  method: 'get',
  url: '/consult?datetime=08062079110530',
});
```

- logs
O EndPoint /logs, irá retornar o registro das ultimas 10 consultas realizadas na API.

Exemplos:
```js
//Requição dos ultimos 10 registros
axios({
  method: 'get',
  url: '/los',
});
```

## Test


## Live
- Sistema exemplo, utilizando ReactJs, [Clique aqui] (http://x/) para acessar.


## explanation
O siste foi desenvolvido utilizando o FrameWork Restify, foram criadas 2 Métodos (GET) que respondem a requisições RestFul (detalha nesta documentação).


## Developer
- Heleno Mário da Cruz Júnior