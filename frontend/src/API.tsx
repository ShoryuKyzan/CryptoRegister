import {Transaction} from 'types/transaction'; // XXX dummy data
import {CryptoDict} from 'types/crypto'; // XXX dummy data

let cryptos: CryptoDict = {
    'BTC': {
        name: 'BTC',
        price: 42000.00,
        updated: -1
    },
    'LINK': {
        name: 'LINK',
        price: 25.00,
        updated: -1
    },
    'ETH': {
        name: 'ETH',
        price: 2600,
        updated: -1
    }
};  // XXX dummy data

let transactions: Transaction[] = [];
const _templates: Transaction[] = [
    {
        'merchant': 'Alphabelle',
        'item': 'Crystal',
        'amount': 999.99,
        'cryptoName': 'BTC'
    },
    {
        'merchant': 'Haven',
        'item': 'Winged Crown',
        'amount': 100000001.11,
        'cryptoName': 'LINK'
    },
    {
        'merchant': 'Starscout',
        'item': 'Rounded Diamond',
        'amount': 0.1,
        'cryptoName': 'ETH'
    },
    {
        'merchant': 'Haven',
        'item': 'Flying Dog',
        'amount': 2000000000002.11,
        'cryptoName': 'BTC'
    },
    {
        'merchant': 'Moonbeam',
        'item': 'Macaroni',
        'amount': 0.2,
        'cryptoName': 'LINK'
    },
    {
        'merchant': 'Trailblazer',
        'item': 'Silver Star Pin',
        'amount': 1,
        'cryptoName': 'ETH'
    }
];
for(let i = 0; i < 20; i += 1) {
    transactions.unshift(..._templates);
}
 // XXX dummy data


export default class API {
    url?: string;

    constructor(url: string){
        this.url = url;
    }

    getItems(): Promise<Transaction[]> {
        
        return new Promise<Transaction[]>((resolve: (data: Transaction[]) => void) => {
            setTimeout(() => {
                resolve(transactions);
            }, 1000); // XXX fake delay
        });
    }

    getPrices(): Promise<CryptoDict> {
        return new Promise<CryptoDict>((resolve: (data: CryptoDict) => void) => {
            setTimeout(() => {
                const cryptos2 = JSON.parse(JSON.stringify(cryptos));
                Object.keys(cryptos2).forEach((cryptoName: string) => {
                    cryptos2[cryptoName].price += 1.2;
                })
                cryptos = cryptos2;
                resolve(cryptos);
            }, 1000); // XXX fake delay
        });
    }

    save(id: number) {
    }

    delete(id: number) {
    }
}
