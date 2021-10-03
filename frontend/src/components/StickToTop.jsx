import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import VizSensor from 'react-visibility-sensor';

const styles = {
  /* search */
  show: {
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      background: 'white',
      zIndex: 1000,
      padding: '0.5em 0.5em',
  },
  hide: {
      display: 'none'
  }
};

class _StickySensor extends React.Component {

  constructor(props: {show: boolean, sticky: React.Component, onShow: (show: boolean) => undefined}){
    super(props);
  }

  render(){
    const classes = this.props.classes;

    return (
        <div>
            <VizSensor
                onChange={(isVisible) => {this.props.onShow(!isVisible)}}>
                {this.props.children}
            </VizSensor>
        </div>
    );
  }
}

/* sticky wrapper */

const styles2 = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  /* search */
  show: {
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      background: 'white',
      zIndex: 1000,
      padding: '0.5em 0.5em',
  },
  hide: {
      display: 'none'
  },
  scrollable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll'
  }
};

class _StickyWrapper extends React.Component {

  constructor(props){
    super(props);

    this.scrollingDiv = React.createRef();
  }

  scrollToTop(){
    this.scrollingDiv.current.scrollTop = 0;
  }

  scroll(position){
    this.scrollingDiv.current.scrollTop = position;
  }

  scrollTop(){
    return this.scrollingDiv.current.scrollTop;
  }

  render(){
    const classes = this.props.classes;

    return (
      <div className={classes.wrapper}>
          <div className={this.props.show ? classes.show : classes.hide}>
            {this.props.sticky}
          </div>
          <div onScroll={this.props.onScroll} ref={this.scrollingDiv} className={classes.scrollable}>
            {this.props.children}
          </div>
      </div>
    );
  }
}

export const StickySensor = withStyles(styles)(_StickySensor);

export const StickyWrapper = withStyles(styles2)(_StickyWrapper);