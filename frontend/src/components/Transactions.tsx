import React from 'react';
import {Transaction} from 'types/transaction'; // XXX dummy data
import {Crypto} from 'types/crypto'; // XXX dummy data
import './Transactions.scss'
const cryptos: Crypto[] = [
    {
        name: 'BTC',
        price: 42000.00,
        updated: -1
    },
    {
        name: 'LINK',
        price: 25.00,
        updated: -1
    },
    {
        name: 'ETH',
        price: 2600,
        updated: -1
    }
];  // XXX dummy data

let transactions: Transaction[] = [];
const _templates: Transaction[] = [
    {
        'merchant': 'Alphabelle',
        'item': 'Crystal',
        'amount': 999.99,
        'crypto': cryptos[0]
    },
    {
        'merchant': 'Haven',
        'item': 'Winged Crown',
        'amount': 100000001.11,
        'crypto': cryptos[1]
    },
    {
        'merchant': 'Starscout',
        'item': 'Rounded Diamond',
        'amount': 0.1,
        'crypto': cryptos[2]
    },
    {
        'merchant': 'Haven',
        'item': 'Flying Dog',
        'amount': 2000000000002.11,
        'crypto': cryptos[0]
    },
    {
        'merchant': 'Moonbeam',
        'item': 'Macaroni',
        'amount': 0.2,
        'crypto': cryptos[2]
    },
    {
        'merchant': 'Trailblazer',
        'item': 'Silver Star Pin',
        'amount': 1,
        'crypto': cryptos[1]
    }
];
for(let i = 0; i < 20; i += 1) {
    transactions.unshift(..._templates);
}
 // XXX dummy data

class Transactions extends React.Component {
    data: Transaction[] = transactions;
    render(){
        const rows: JSX.Element[] = [];
        this.data.forEach((t: Transaction) => {
            rows.push(
            <div className="row">
                {/* items move around depending on desktop or mobile */}
                <div className="header mobile">
                    <div className="cellHeader">Merchant Name</div>
                    <div className="cellHeader">Item</div>
                    <div className="merchant">{t.merchant}</div>
                    <div className="item">{t.item}</div>
                </div>
                <div className="merchant desktop">{t.merchant}</div>
                <div className="item desktop">{t.item}</div>
                <div className="header secondHeader mobile">
                    <span className="cellHeader">Amount</span>
                </div>
                <div className="amount">{t.amount}<span className="currency">{t.crypto.name}</span></div>
                <div className="currencyPrice desktop">${t.crypto.price}</div>
                <div className="conversion">x ${t.crypto.price} USD/{t.crypto.name} = </div>
                <div className="total">${t.crypto.price * t.amount}</div>
            </div>);
        });
        return (
            <div className="Transactions">
                <div className="row desktop">
                    <div className="merchant">Merchant Name</div>
                    <div className="item">Item</div>
                    <div className="amount">Amount (Crypto)</div>
                    <div className="currencyPrice desktop">Price/crypto (USD)</div>
                    <div className="total">Amount (USD)</div>
                </div>
                {rows}
            </div>
        );
    }
}

export default Transactions;
