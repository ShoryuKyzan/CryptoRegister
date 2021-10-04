import {Transaction} from 'types/transaction';
import {CryptoDict} from 'types/crypto';

async function callGETMethod(url: string){
    return fetch(url).then(async response => {
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

    save(id: number) {
    }

    delete(id: number) {
    }
}
