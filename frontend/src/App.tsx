import React from 'react';
import Header from './components/Header';
import Transactions from './components/Transactions';
import {Transaction} from 'types/transaction'; // XXX dummy data
import API from './API';
import ReactLoading from 'react-loading';
import './App.scss'
import { CryptoDict } from 'types/crypto';

interface _State {
  loading: boolean
};
class App extends React.Component<{}, _State> {
  PRICE_REFRESH_INTERVAL: number = 2 * 60000;
  cryptoRefreshTimer?: NodeJS.Timeout = undefined;
  appName: string = "Crypto Register";
  api: API = new API('http://127.0.0.1:8080/');
  transactions: Transaction[] = [];
  priceDict: CryptoDict = {};
  
  constructor(props: {}){
    super(props)
    this.state = {
      loading: false
    };
  }

  componentDidMount(){
    this.load();
  }

  setLoading(state: boolean) {
    this.setState({loading: state});
  }

  load() {
    this.setLoading(true);
    console.log('loading'); // XXX
    this.api.getItems().then((items: Transaction[]) => {
      console.log('loaded', items.length); // XXX
      this.transactions = items;      
    }).then(() => {
      this.refreshPrices();
    })
    .finally(() => {
      this.setLoading(false);
    })
  }

  refreshPrices() {
    // refreshes prices without showing loading banner
    console.log('price refresh'); // XXX
    // clear any existing timer
    if(this.cryptoRefreshTimer){
      clearTimeout(this.cryptoRefreshTimer)
      this.cryptoRefreshTimer = undefined;
    }

    this.api.getPrices()
    .then((dict: CryptoDict) => {
      this.priceDict = dict; // XXX figure out how updates gonna work...
    })
    .then(() => {
      this.cryptoRefreshTimer = setTimeout(() => this.refreshPrices(), this.PRICE_REFRESH_INTERVAL)
    });

  }

  render(){
    let isLoading = <div></div>;
    let loadingClass = '';
    if(this.state.loading){
      loadingClass = 'loading';
      isLoading = <div className="loadingWrapper">
        <div className="banner"></div>
        <div className="loadingWrapper2">
          <div className="loader">
              <ReactLoading
                type={"bars"}
                color={"green"}
                height={100}
                width={100}/>
          </div>
        </div>
      </div>;
    }
    return (
      <div className="App">
        <div className="header">
          <Header name={this.appName}/>
        </div>
        <div className={"content " + loadingClass}>
          {/* scrollable container */}
          <Transactions items={this.transactions}/>
          {isLoading}
        </div>
      </div>
    );
  }
}

export default App;
