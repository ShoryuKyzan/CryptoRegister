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

const transactions: Transaction[] = [
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
    }
]; // XXX dummy data

class Transactions extends React.Component {
    data: Transaction[] = transactions;
    render(){
        const rows: JSX.Element[] = [];
        this.data.forEach((t: Transaction) => {
            rows.push(
            <div className="item">
                <div className="merchant">{t.merchant}</div>
                <div className="item">{t.item}</div>
                <div className="amount">{t.amount}</div>
                <div className="currency">{t.crypto.name}</div>
                <div className="currencyPrice">{t.crypto.price}</div>
                <div className="total">${t.crypto.price * t.amount}</div>
            </div>);
        });
        return (
            <div className="Transactions">
                <div className="item">
                    <div className="merchant">Merchant Name</div>
                    <div className="item">Item</div>
                    <div className="amount">Amount (Crypto)</div>
                    <div className="currency">Currency</div>
                    <div className="currencyPrice">Price/crypto (USD)</div>
                    <div className="total">Amount (USD)</div>
                </div>
                {rows}
            </div>
        );
    }
}

export default Transactions;
