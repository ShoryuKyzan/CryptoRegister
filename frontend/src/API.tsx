import {Transaction} from 'types/transaction'; // XXX dummy data
import {CryptoDict} from 'types/crypto'; // XXX dummy data

const cryptos: CryptoDict = {
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
        'crypto': cryptos['BTC']
    },
    {
        'merchant': 'Haven',
        'item': 'Winged Crown',
        'amount': 100000001.11,
        'crypto': cryptos['LINK']
    },
    {
        'merchant': 'Starscout',
        'item': 'Rounded Diamond',
        'amount': 0.1,
        'crypto': cryptos['ETH']
    },
    {
        'merchant': 'Haven',
        'item': 'Flying Dog',
        'amount': 2000000000002.11,
        'crypto': cryptos['BTC']
    },
    {
        'merchant': 'Moonbeam',
        'item': 'Macaroni',
        'amount': 0.2,
        'crypto': cryptos['LINK']
    },
    {
        'merchant': 'Trailblazer',
        'item': 'Silver Star Pin',
        'amount': 1,
        'crypto': cryptos['ETH']
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
                resolve(cryptos);
            }, 1000); // XXX fake delay
        });
    }

    save(id: number) {
    }

    delete(id: number) {
    }
}
