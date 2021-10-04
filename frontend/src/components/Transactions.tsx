import React from 'react';
import {Transaction} from 'types/transaction'; // XXX dummy data
import {CryptoDict} from 'types/crypto'; // XXX dummy data
import './Transactions.scss'
import './TransactionRow.scss'
import {TransactionRow} from './TransactionRow';


interface _Props {
    priceList: CryptoDict,
    items: Transaction[]
}
interface _State {
    adding: boolean
};
class Transactions extends React.Component<_Props, _State> {
    constructor(props: _Props){
        super(props)
        this.state = {
            adding: false,
        }
    }
    render(){
        const rows: JSX.Element[] = [];
        let i = 0;
        this.props.items.forEach((t: Transaction) => {
            rows.push(<TransactionRow priceList={this.props.priceList} key={i} transaction={t}/>);
            i += 1;
        });
        let addFields: JSX.Element | undefined = <div></div>;
        if(this.state.adding){
            addFields = <TransactionRow editing={true} transaction={{
                merchant: '',
                item: '',
                amount: 0,
                cryptoName: ''
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
