import express from 'express';
import {CryptoDict} from './types/crypto';
import {BitpayRate} from './types/bitpay';
import {Transaction} from './types/transaction';
import fetch from 'node-fetch';
import util from 'util';
const app = express();
const port = 8080;

import cors from 'cors';


//////////////////////////////////////
let cryptos: CryptoDict = {
    'BTC': {
        name: 'BTC',
        price: 42000.00,
        updated: -1
    },
    'DOGE': {
        name: 'DOGE',
        price: 0.50,
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
        id: -1,
        'merchant': 'Alphabelle',
        'item': 'Crystal',
        'amount': 999.99,
        'cryptoName': 'BTC'
    },
    {
        id: -1,
        'merchant': 'Haven',
        'item': 'Winged Crown',
        'amount': 100000001.11,
        'cryptoName': 'DOGE'
    },
    {
        id: -1,
        'merchant': 'Starscout',
        'item': 'Rounded Diamond',
        'amount': 0.1,
        'cryptoName': 'ETH'
    },
    {
        id: -1,
        'merchant': 'Haven',
        'item': 'Flying Dog',
        'amount': 2000000000002.11,
        'cryptoName': 'BTC'
    },
    {
        id: -1,
        'merchant': 'Moonbow',
        'item': 'Macaroni',
        'amount': 0.2,
        'cryptoName': 'DOGE'
    },
    {
        id: -1,
        'merchant': 'Trailblazer',
        'item': 'Silver Star Pin',
        'amount': 1,
        'cryptoName': 'ETH'
    }
];
for(let i = 0; i < 20; i += 1) {
    transactions.unshift(..._templates);
}
// Create IDs
let i = 1;
transactions.forEach((t) => {
    t.id = i;
    i += 1; 
});
// XXX dummy data

// //////////////////////////////////////




var copts = {
  origin: function (origin, callback) {
    // allow all
    callback(null, true);
  }
}
const RETRIEVE_URL = 'https://bitpay.com/api/rates/%s/USD'
// // const SEARCH_URL = 'https://api.stocktwits.com/api/2/streams/symbol/%s.json';

app.get('/items', cors(copts), (req, res) => {
    res.send(JSON.stringify(transactions));
});

app.get('/prices', cors(copts), (req, res) => {

    // retrieve
    const pList = [];
    const cryptoList: string[] = [];
    Object.keys(cryptos).forEach(cryptoName => {
        cryptoList.push(cryptoName);
        const url = util.format(RETRIEVE_URL, cryptoName);
        console.log('fetching', url);
        const prom = fetch(url).then(response => response.json());
        pList.push(prom);
    });
    Promise.all(pList).then(results => {
        try{
            // parse and return
            results.forEach((rate: BitpayRate, i) => {
                let cryptoName: string = cryptoList[i]
                cryptos[cryptoName].price = rate.rate;
                cryptos[cryptoName].updated = Date.now();
            });
            res.send(JSON.stringify(cryptos)); // XXX
        }catch(e){
            console.error('parse error', e);
            throw e;
        }
    }).catch(err => {
        res.sendStatus(500);
        console.error('request error', JSON.stringify(err));
    });

});

app.listen(port, () => console.log(`Server started on ${port}!`));
