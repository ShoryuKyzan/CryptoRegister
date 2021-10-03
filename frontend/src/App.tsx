import React from 'react';
import Header from './components/Header';
import {StickyWrapper, StickySensor} from './components/StickToTop';

class App extends React.Component {

  state: {showSticky: boolean}

  constructor(props: {}){
    super(props);

    this.state = {
      showSticky: false
    };
  }


  render(){
    const stickyElement = <Header/>;
    return (
      <div>
        <StickyWrapper
          show={this.state.showSticky}
          sticky={stickyElement}>
          <StickySensor onShow={(show: boolean) => this.setState({showSticky: show})}>
            {stickyElement}
          </StickySensor>
          

        </StickyWrapper>

      </div>
    );
  }
}

export default App;
