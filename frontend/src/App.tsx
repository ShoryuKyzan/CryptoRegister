import React from 'react';
import Header from './components/Header';
import Transactions from './components/Transactions';
import './App.scss'

class App extends React.Component {
  appName: string = "Crypto Register"
  render(){
    return (
      <div className="App">
        <div className="header">
          <Header name={this.appName}/>
        </div>
        <div className="content">
          {/* scrollable container */}
          <Transactions/>
        </div>
      </div>
    );
  }
}

export default App;
