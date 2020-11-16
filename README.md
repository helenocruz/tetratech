# getCarsOlx

Consulta de Projeção Populacional (Consumo de API do IBGE)- Sistema para teste de Desenvolvedor Back-end TetraTech.
[Exemplo] (http://x/)


## Table of Contents

- [Get Started](#getstarted)
- [Features](#features)
- [Métodos de requisição RestFul](#equest-method)
- [Live](#live)
- [Explicações de funcionamento Interno da API](#explication)
- [Desenvolvedor](#desenvolvedor)

## Get Started
O sistema deverá ser executado em sistema que provido das ferramentas: NodeJS, NPM, Jest. Exemplo de execução: 

```bash
#Instalação de execução.
git clone

```

## Features
- Realiza consulta de Projeção Populacional em API do IBGE, gera cache com os ultimos 10 resultados;
- Requisições RestFul (GET), metodos /consult e /logs;
- Retorna resultado em formato JSON;
- Teste de código utilizando Framework Jest;

## Métodos de requisição RestFul

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

## Live
- Sistema exemplo, utilizando ReactJs, [Clique aqui] (http://x/) para acessar.


## Explicações de funcionamento Interno da API
O siste foi desenvolvido utilizando o FrameWork Restify, foram criadas 2 Métodos (GET) que respondem a requisições RestFul (detalha nesta documentação).


## Autor
- Heleno Mário da Cruz Júnior