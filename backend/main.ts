import express from 'express';
import {CryptoDict} from './types/crypto';
import {BitpayRate} from './types/bitpay';
import {Transaction} from './types/transaction';
import fetch from 'node-fetch';
import util from 'util';
import fs from 'fs';
const app = express();
const port = 8080;

import cors from 'cors';

app.use(express.json())

//////////////////////////////////////
// Default example data and init
// Persistant data is loaded below
//////////////////////////////////////
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
let _defaultTransactions: Transaction[] = [];
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
// Create IDs and data
let j = 1;
for(let i = 0; i < 1; i += 1) {
    // prevent object reference copying completely
    _templates.forEach((t: Transaction) => {
        // this is actually the best way to deep copy ironically...
        t.id = j;
        let t2: Transaction = JSON.parse(JSON.stringify(t));
        _defaultTransactions.push(t2);
        j += 1;
    });
    
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// load persisted data
try{
    const transStr: string = fs.readFileSync("./transactions.json").toString('utf8');
    transactions = JSON.parse(transStr);
}catch(e){
    console.log("transactions.json read failed (probably does not exist), continuing.");
    transactions = _defaultTransactions;
    save();
}

function save() {
    const str = JSON.stringify(transactions);
    fs.writeFileSync('./transactions.json', str);
}
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
            res.send(JSON.stringify(cryptos));
        }catch(e){
            console.error('parse error', e);
            throw e;
        }
    }).catch(err => {
        res.sendStatus(500);
        console.error('request error', JSON.stringify(err));
    });

});
app.options('/save', cors());
app.post('/save', cors(copts), (req, res) => {
    try {
        const updatedRecord = req.body;
        // they are filed by index
        // 1-based id's
        if(updatedRecord.id < 0){
            let newId = 1;
            if(transactions.length > 0){
                newId = transactions[transactions.length - 1].id + 1
            }
            if(!cryptos[updatedRecord.cryptoName]){
                throw Error(updatedRecord.cryptoName + ' is not currently supported by this backend')
            }
            updatedRecord.id = newId;
            transactions.push(updatedRecord);    
            console.log('added', transactions[updatedRecord.id - 1]);
        }else{
            transactions[updatedRecord.id - 1] = updatedRecord;
            console.log('updated', transactions[updatedRecord.id - 1]);
        }
        save();
        res.send(JSON.stringify(updatedRecord));
    }catch(e){
        res.sendStatus(500);
        res.statusMessage = e
        console.error('request error', e);
    }
});
app.get('/delete', cors(copts), (req, res) => {
    try {
        const id = parseInt(req.query.id.toString(), 10);
        console.log('deleting', id, transactions[id - 1]); 
        if(id > 0 && id <= transactions.length){
            // find id quickly.. a hash map would help here. last minuting here..
            let idx = 0
            for(; idx < transactions.length; idx += 1){
                if(transactions[idx].id === id){
                    break;
                }
            }
            transactions.splice(idx, 1);
            console.log('id', id, transactions); // XXX
        }
        save();
        res.send(JSON.stringify({}));
    }catch(e){
        res.sendStatus(500);
        res.statusMessage = e
        console.error('request error', e);
    }
});


app.listen(port, () => console.log(`Server started on ${port}!`));
