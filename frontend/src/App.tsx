import React from 'react';
import Header from './components/Header';

class App extends React.Component {
  appName: string = "Crypto Register"
  render(){
    return (
      <div>
        <Header name={this.appName}/>
      </div>
    );
  }
}

export default App;
