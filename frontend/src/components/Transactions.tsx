import React from 'react';
import {Transaction} from 'types/transaction'; // XXX dummy data
import {Crypto} from 'types/crypto'; // XXX dummy data
import './Transactions.scss'
import './TransactionRow.scss'
import {TransactionRow} from './TransactionRow';

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

interface _State {
    adding: boolean
};
class Transactions extends React.Component<{}, _State> {
    constructor(props: {}){
        super(props)
        this.state = {
            adding: false,
        }
    }
    data: Transaction[] = transactions;
    render(){
        const rows: JSX.Element[] = [];
        this.data.forEach((t: Transaction) => {
            rows.push(<TransactionRow transaction={t}/>);
        });
        let addFields: JSX.Element | undefined = <div></div>;
        if(this.state.adding){
            addFields = <TransactionRow editing={true} transaction={{
                merchant: '',
                item: '',
                amount: 0,
                crypto: {name: '', price: 0, updated: -1}
            }} onSaved={() => this.setState({adding: false})}/>;
        }
        return (
            <div className="Transactions">
                <div className="TransactionHeaderRow header desktop">
                    <div className="merchant desktop">Merchant Name</div>
                    <div className="item desktop">Item</div>
                    <div className="amount">Amount (Crypto)</div>
                    <div className="currencyPrice desktop">Price/crypto (USD)</div>
                    <div className="total">Amount (USD)</div>
                    <div className="actions">
                        <button className={this.state.adding ? 'hide' : 'show'}
                            onClick={() => this.setState({adding: true})}>Add</button>
                    </div>
                </div>
                {/* blank row for edding/removing */}
                {addFields}
                {rows}
            </div>
        );
    }
}

export default Transactions;
