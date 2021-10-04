import React from 'react';
import Header from './components/Header';
import Transactions from './components/Transactions';

class App extends React.Component {
  appName: string = "Crypto Register"
  render(){
    return (
      <div>
        <Header name={this.appName}/>
        <div>
          {/* scrollable container */}
          <Transactions/>
        </div>
      </div>
    );
  }
}

export default App;
