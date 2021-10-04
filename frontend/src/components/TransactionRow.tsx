import React from 'react';
import { CryptoDict } from 'types/crypto';
import {Transaction} from 'types/transaction'; // XXX dummy data
import './TransactionRow.scss'

interface _EFProps {
    editing: boolean;
    name: string;
    value: string|number;
    onChange: (name: string, value: string) => void;
};
function EditableTextField(props: _EFProps){
    let n = <span>{props.value}</span>;
    if(props.editing){
        n = <input value={props.value} onChange={(e) => props.onChange(props.name, e.target.value)} />;
    }
    return (
        n
    );
}

interface _TransactionValues {
    [name: string]: string|number;
};

const _defaultProps = {
    editing: false,
    priceList: {}
};
interface _Props {
    editing?: boolean|undefined
    onSaved?: () => void|undefined
    transaction: Transaction,
    priceList?: CryptoDict
};
interface _State {
    editing: boolean,
    editingValues: _TransactionValues
};
export class TransactionRow extends React.Component<_Props, _State> {
    constructor(props: _Props){
        props = {..._defaultProps, ...props}
        super(props)
        this.state = {
            editing: props.editing ? true : false,
            editingValues: {
                'merchant': props.transaction.merchant,
                'item': props.transaction.item,
                'amount': props.transaction.amount,
                'cryptoName': props.transaction.cryptoName
            }
        }
    }

    setFieldValue(name: string, val: string){
        const o: _TransactionValues = {};
        o[name] = val;
        this.setState({editingValues: o});
    }
    render(){
        const t = this.props.transaction;
        const currentPrice = this.props.priceList && this.props.priceList[t.cryptoName] ? this.props.priceList[t.cryptoName].price : 0;
        const cryptoPrice = currentPrice.toFixed(2);
        const dollarAmount = (currentPrice * t.amount).toFixed(2)
        return (
            <div className="TransactionRow">
                {/* items move around depending on desktop or mobile */}
                <div className="header mobile">
                    <div className="cellHeader">Merchant Name</div>
                    <div className="cellHeader">Item</div>
                    <div className="merchant">
                        <EditableTextField name="merchant"
                            onChange={(name, val) => this.setFieldValue(name, val)}
                            editing={this.state.editing} value={t.merchant}/>
                    </div>
                    <div className="item">
                        <EditableTextField name="item"
                            onChange={(name, val) => this.setFieldValue(name, val)}
                            editing={this.state.editing} value={t.item}/>
                    </div>
                </div>
                <div className="merchant desktop">
                    <EditableTextField name="merchant"
                        onChange={(name, val) => this.setFieldValue(name, val)}
                        editing={this.state.editing} value={t.merchant}/>
                </div>
                <div className="item desktop">
                    <EditableTextField name="item"
                        onChange={(name, val) => this.setFieldValue(name, val)}
                        editing={this.state.editing} value={t.item}/>
                </div>
                <div className="header amountHeader mobile">
                    <span className="cellHeader">Amount</span>
                </div>
                <div className="amount">
                    <span className="amountNumber">
                        <EditableTextField name="amount"
                            onChange={(name, val) => this.setFieldValue(name, val)}
                            editing={this.state.editing} value={t.amount.toFixed(8)}/>
                    </span>
                    <span className="currency">
                        <EditableTextField name="cryptoName"
                            onChange={(name, val) => this.setFieldValue(name, val)}
                            editing={this.state.editing} value={t.cryptoName}/>
                    </span>
                </div>
                <div className="currencyPrice desktop">${cryptoPrice}</div>
                <div className="conversion">x ${cryptoPrice} USD/{t.cryptoName} = </div>
                <div className="total">${dollarAmount}</div>
                <div className="actions">
                    <button className={this.state.editing ? 'hide' : 'show'}
                         onClick={() => this.setState({editing: true})}>Edit</button>
                    <button className={this.state.editing ? 'show' : 'hide'}
                        onClick={() => {
                            this.setState({editing: false});
                            if(this.props.onSaved){
                                this.props.onSaved();
                            }
                        }}>Done</button>
                    <button className={this.state.editing ? 'hide' : 'show'}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}