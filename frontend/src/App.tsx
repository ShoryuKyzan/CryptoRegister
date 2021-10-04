import React from 'react';
import Header from './components/Header';
import Transactions from './components/Transactions';
import {Transaction} from 'types/transaction';
import API from './API';
import ReactLoading from 'react-loading';
import './App.scss'
import { CryptoDict } from 'types/crypto';

interface _State {
  loading: boolean,
  priceDict: CryptoDict,
  transactions: Transaction[]
};
class App extends React.Component<{}, _State> {
  PRICE_REFRESH_INTERVAL: number = 2 * 60000;
  cryptoRefreshTimer?: NodeJS.Timeout = undefined;
  appName: string = "Crypto Register";
  api: API = new API('http://127.0.0.1:8080');
  
  constructor(props: {}){
    super(props)
    this.state = {
      loading: false,
      priceDict: {},
      transactions: []
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
    this.api.getItems().then((items: Transaction[]) => {
      console.log('got items', items); // XXX
      this.setState({transactions: items});
    }).then(() => {
      this.refreshPrices();
    })
    .finally(() => {
      this.setLoading(false);
    })
  }

  refreshPrices() {
    // refreshes prices without showing loading banner
    // clear any existing timer
    if(this.cryptoRefreshTimer){
      clearTimeout(this.cryptoRefreshTimer)
      this.cryptoRefreshTimer = undefined;
    }

    this.api.getPrices()
    .then((dict: CryptoDict) => {
      this.setState({priceDict: dict});
    })
    .then(() => {
      this.cryptoRefreshTimer = setTimeout(() => this.refreshPrices(), this.PRICE_REFRESH_INTERVAL)
    });

  }

  save(t: Transaction){
    this.setLoading(true);
    this.api.save(t)
    .finally(() => {
      this.load(); // TODO, just add to the end of the existing list if new item
    });
  }

  delete(t: Transaction){
    this.setLoading(true);
    this.api.delete(t)
    .finally(() => {
      this.load(); // TODO, modify the local list too.
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
          {/* admittedly passing pricedict down isn't the best solution (use redux), but this will have to do for short term finishing this */}
          <Transactions onSaved={(t: Transaction) => this.save(t)} 
            onDelete={(t: Transaction) => this.delete(t)} 
            priceList={this.state.priceDict} items={this.state.transactions}/>
          {isLoading}
        </div>
      </div>
    );
  }
}

export default App;
