import React from 'react';
import {Transaction} from 'types/transaction';
import {CryptoDict} from 'types/crypto';
import './Transactions.scss'
import './TransactionRow.scss'
import {TransactionRow} from './TransactionRow';


interface _Props {
    priceList: CryptoDict,
    items: Transaction[],
    onSaved: (val: Transaction) => void,
    onDelete: (val: Transaction) => void
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
            rows.push(<TransactionRow onDelete={this.props.onDelete} onSaved={this.props.onSaved} priceList={this.props.priceList} key={i} transaction={t}/>);
            i += 1;
        });
        let addFields: JSX.Element | undefined = <div></div>;
        if(this.state.adding){
            addFields = <TransactionRow editing={true} transaction={{
                id: -1,
                merchant: '',
                item: '',
                amount: 0,
                cryptoName: ''
            }} onSaved={(t: Transaction) => {
                this.props.onSaved(t);
                this.setState({adding: false});
            }}/>;
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
