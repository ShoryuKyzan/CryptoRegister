import express from 'express';
import {CryptoDict} from './types/crypto';
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

// //////////////////////////////////////




var copts = {
  origin: function (origin, callback) {
    // allow all
    callback(null, true);
  }
}


// // const SEARCH_URL = 'https://api.stocktwits.com/api/2/streams/symbol/%s.json';

app.get('/items', cors(copts), (req, res) => {
    res.send(JSON.stringify(transactions));
});

app.get('/prices', cors(copts), (req, res) => {
    res.send(JSON.stringify(cryptos));
});

//     // // parse
//     // const symbolList = input.split(' ');

//     // // retrieve
//     // const pList = [];
//     // symbolList.forEach(symbol => {
//     //     const url = util.format(SEARCH_URL, symbol);
//     //     console.log('fetching', url);
//     //     const prom = fetch(url).then(response => response.json());
//     //     pList.push(prom);
//     // });
//     // Promise.all(pList).then(results => {
//     //     try{
//     //         const parsed = parseResults(symbolList, results);
//     //         res.send(JSON.stringify(parsed));
//     //     }catch(e){
//     //         console.error('parse error', e);
//     //         throw e;
//     //     }
//     // }).catch(err => {
//     //     res.sendStatus('500');
//     //     console.error('request error', JSON.stringify(err));
//     // });


// /**
//  * Parses results
//  * 
//  * @param {Array<String>} symbolList original search terms
//  * @param {Array<Object>} results results from stocktwit
//  * 
//  * @returns {Array<Object>} Returns results parsed into useable form. Sorted descending by date
//  */
// // function parseResults(symbolList, results) {
// //     // use hash to ensure unique
// //     const messages = {};
// //     const errorList = [];

// //     // TODO use caching to determine whether there's new results. use 'since' field possibly
// //     // extract all messages
// //     results.forEach((list, i) => {
// //         // check for errors and append nothing if so
// //         if(list.response.status !== 200){
// //             const errors = {
// //                 status: list.response.status,
// //                 symbol: symbolList[i],
// //                 messages: []
// //             };
// //             list.errors.forEach(error => errors.messages.push(error.message))
// //             errorList.push(errors);
// //             return;
// //         }
// //         list.messages.forEach(msg => {
// //             messages[msg.id] = {
// //                 id: msg.id,
// //                 date: Date.parse(msg.created_at),
// //                 // strip html tags out, but allow for html special codes like &amp;
// //                 content: msg.body.replace(/[<>]/g, ''),
// //                 user: msg.user.username,
// //                 icon: msg.user.avatar_url,
// //                 // extra: which symbols in there
// //                 symbols: msg.symbols.map(sym => sym.symbol)
// //             };
// //         })
// //     });
    
// //     const ret = Object.values(messages);
// //     // sort all messages descending by date
// //     ret.sort((a,b) => b.date - a.date);

// //     return {
// //         errors: errorList,
// //         results: ret
// //     };
// // }

app.listen(port, () => console.log(`Server started on ${port}!`));
