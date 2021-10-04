import React from 'react';
import { CryptoDict } from 'types/crypto';
import {Transaction} from 'types/transaction';
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
    onSaved?: (val: Transaction) => void|undefined
    onDelete?: (val: Transaction) => void|undefined
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
                'id': props.transaction.id,
                'merchant': props.transaction.merchant,
                'item': props.transaction.item,
                'amount': props.transaction.amount,
                'cryptoName': props.transaction.cryptoName
            }
        }
    }

    save(){
        if(this.props.onSaved){
            let t: Transaction = {
                id: parseInt(this.state.editingValues['id'].toString(), 10),
                merchant: this.state.editingValues['merchant'].toString(),
                item: this.state.editingValues['item'].toString(),
                amount: parseInt(this.state.editingValues['amount'].toString(), 10),
                cryptoName: this.state.editingValues['cryptoName'].toString()
            }
            this.props.onSaved(t);
        }

    }
    delete(){
        if(this.props.onDelete){
            let t: Transaction = {
                id: parseInt(this.state.editingValues['id'].toString(), 10),
                merchant: this.state.editingValues['merchant'].toString(),
                item: this.state.editingValues['item'].toString(),
                amount: parseInt(this.state.editingValues['amount'].toString(), 10),
                cryptoName: this.state.editingValues['cryptoName'].toString()
            }
            this.props.onDelete(t);
        }
    }

    resetEditing(){
        // go back to initial values
        this.setState({
            editingValues: {
                'id': this.props.transaction.id,
                'merchant': this.props.transaction.merchant,
                'item': this.props.transaction.item,
                'amount': this.props.transaction.amount,
                'cryptoName': this.props.transaction.cryptoName
            }
        });
    }

    setFieldValue(name: string, val: string){
        const o: _TransactionValues = this.state.editingValues;
        o[name] = val;
        this.setState({editingValues: o});
    }
    render(){
        const t: _TransactionValues = {
            'id': parseInt(this.state.editingValues['id'].toString(), 10),
            'merchant': this.state.editingValues['merchant'].toString(),
            'item': this.state.editingValues['item'].toString(),
            'amount': parseInt(this.state.editingValues['amount'].toString(), 10),
            'cryptoName': this.state.editingValues['cryptoName'].toString()
        }
        const currentPrice = this.props.priceList && this.props.priceList[t.cryptoName] ? this.props.priceList[t.cryptoName].price : 0;
        const cryptoPrice = currentPrice.toFixed(2);
        const dollarAmount = (currentPrice * parseFloat(t['amount'].toString())).toFixed(2)
        return (
            <div className="TransactionRow">
                {/* items move around depending on desktop or mobile */}
                <div className="header mobile">
                    <div className="cellHeader">Merchant Name</div>
                    <div className="cellHeader">Item</div>
                    <div className="merchant">
                        <EditableTextField name="merchant"
                            onChange={(name, val) => this.setFieldValue(name, val)}
                            editing={this.state.editing} value={t['merchant']}/>
                    </div>
                    <div className="item">
                        <EditableTextField name="item"
                            onChange={(name, val) => this.setFieldValue(name, val)}
                            editing={this.state.editing} value={t['item']}/>
                    </div>
                </div>
                <div className="merchant desktop">
                    <EditableTextField name="merchant"
                        onChange={(name, val) => this.setFieldValue(name, val)}
                        editing={this.state.editing} value={t['merchant']}/>
                </div>
                <div className="item desktop">
                    <EditableTextField name="item"
                        onChange={(name, val) => this.setFieldValue(name, val)}
                        editing={this.state.editing} value={t['item']}/>
                </div>
                <div className="header amountHeader mobile">
                    <span className="cellHeader">Amount</span>
                </div>
                <div className="amount">
                    <span className="amountNumber">
                        <EditableTextField name="amount"
                            onChange={(name, val) => this.setFieldValue(name, val)}
                            editing={this.state.editing} value={parseFloat(t['amount'].toString()).toFixed(8)}/> {/* a little issue here.. but im out of time */}
                    </span>
                    <span className="currency">
                        <EditableTextField name="cryptoName"
                            onChange={(name, val) => this.setFieldValue(name, val)}
                            editing={this.state.editing} value={t['cryptoName']}/>
                    </span>
                </div>
                <div className="currencyPrice desktop">${cryptoPrice}</div>
                <div className="conversion">x ${cryptoPrice} USD/{t['cryptoName']} = </div>
                <div className="total">${dollarAmount}</div>
                <div className="actions">
                    <button className={this.state.editing ? 'hide' : 'show'}
                         onClick={() => this.setState({editing: true})}>Edit</button>
                    <button className={this.state.editing ? 'show' : 'hide'}
                        onClick={() => {
                            this.setState({editing: false});
                            this.save();
                        }}>Done</button>
                    <button className={this.state.editing ? 'show' : 'hide'}
                        onClick={() => {
                            this.resetEditing();
                            this.setState({editing: false});
                        }}>Cancel</button>
                    <button className={this.state.editing ? 'hide' : 'show'}
                    onClick={() => {
                        this.delete();
                    }}>Delete</button>
                </div>
            </div>
        );
    }
}