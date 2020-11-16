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

- consult: \n
O EndPoint '/consult' realiza a consulta da projeção populacional brasileira, deve-se informar o parâmetro 'datetime', deforma que seja a data e horario que se deseja a projeção, sendo somente números. Exemplo:

```js
//Requição de projeção populacional para a data 08/06/2079 as 11:05:30.
axios({
  method: 'get',
  url: '/consult?datetime=08062079110530',
});
```

- logs: \n
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
- O testes são realizados usa o Frameworks Jest, todos os arquivos de testes estão reunidos no diretório '/tests' e possuem extensão '.test.ts'. Para se iniciar os testes, o sistema deve estar rodadno (npm start), e executar o comando Jest na raiz do projeto. Como mostrado no exemplo abaixo:

```bash
#Execução de testes unitários.

#Iniciando o sistema, caso não esteja em execução
npm start

#Executando testes
npm test

#Outro opção para executar testes
jest

```


## Live
- Sistema exemplo, utilizando ReactJs, http://x/ .


## Explanation
- O sistema foi desenvolvido utilizando o FrameWork Restify, foram criadas 2 Métodos (GET) que respondem a requisições RestFul. Basicamente, a distribuição do sistema pode ser definida como:

  * Diretório '/src' : Source do sistema (TypeScript);
    * Diretório '/src/config' : Configuraçẽos globais do sistema e sistema de Rotas (EndPoints);
    * Diretório '/src/controller' : Métodos para atender chamadas de EndPoints;
    * Diretório '/src/libraries' : Classes de funcionalidades independentes;
  * Diretório '/tests' : Arquivos de teste unitário;
  * Diretório '/dist' : Transpiler do TypeScript;

## Developer
- Heleno Mário da Cruz Júnior