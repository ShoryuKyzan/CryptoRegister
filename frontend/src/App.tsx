import React from 'react';
import Header from './components/Header';
import Transactions from './components/Transactions';
import ReactLoading from 'react-loading';
import './App.scss'

interface _State {
  loading: boolean
};
class App extends React.Component<{}, _State> {
  appName: string = "Crypto Register"
  
  constructor(props: {}){
    super(props)
    this.state = {
      loading: false
    };
  }

  componentDidMount(){
    //this.setState({loading: true});
  }

  render(){
    let isLoading = <div></div>;
    let loadingClass = '';
    if(this.state.loading){
      loadingClass = 'loading';
      isLoading = <div className="loadingWrapper">
        <div className="banner">
        </div>
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
          <Transactions/>
          {isLoading}
        </div>
      </div>
    );
  }
}

export default App;
