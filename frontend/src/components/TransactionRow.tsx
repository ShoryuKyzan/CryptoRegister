import React from 'react';
import {Transaction} from 'types/transaction'; // XXX dummy data
import './TransactionRow.scss'

interface _Props {
    transaction: Transaction
};
export class TransactionRow extends React.Component<_Props> {
    render(){
        const t = this.props.transaction;
        return (
            <div className="TransactionRow">
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
            </div>
        );
    }
}