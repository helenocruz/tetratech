import fetch from 'node-fetch';

export async function getData(url : any = null) {
    if(url === null) return JSON.stringify({error: 'Faltou informar a Url desejada.'});
    const response = await fetch(url, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow', 
    }); 
    return await response.json();
}