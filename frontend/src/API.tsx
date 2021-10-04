import {Transaction} from 'types/transaction';
import {CryptoDict} from 'types/crypto';

function callGETMethod(url: string){
    return callHTTPMethod(url, 'GET');
}
function callPOSTMethod(url: string, body: string){
    return callHTTPMethod(url, 'POST', body);
}
async function callHTTPMethod(url: string, method: string, body?: string){
    const options: {method?: string, body?: string, headers?: { [header: string]: string } } = {};
    if(method === 'POST'){
        options.method = 'POST';
        options.body = body;
        options.headers = {
         'Content-Type': 'application/json'
        };
    }
    return fetch(url, options).then(async response => {
        if(response.status === 200){
            return response.json();
        }else{
            throw new Error(await response.json());
        }
    })
    .catch(reason => {
        throw new Error(reason);
    });
}


export default class API {
    url: string = ''

    constructor(url: string){
        this.url = url;
    }

    getItems(): Promise<Transaction[]> {
        return callGETMethod(this.url + '/items');
    }

    getPrices(): Promise<CryptoDict> {
        return callGETMethod(this.url + '/prices');
    }

    save(t: Transaction) {
        return callPOSTMethod(this.url + '/save', JSON.stringify(t));
    }

    delete(id: number) {
    }
}
