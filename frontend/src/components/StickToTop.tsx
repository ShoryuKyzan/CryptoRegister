/// UNUSED SO FAR
/// I Will work on this later later

/**
 * Causes an element to stick to the top of a scrollable container.
 * When the sticky element scrolls out of view, it appears at the top again. This top
 * component is a duplicate, not the same instance.
 */
import React from 'react';
// note: this way seems to no longer work (styles bundled inside the same file). using alternative method
  // import { createStyles } from '@mui/styles';
  // import { WithStyles } from '@mui/material';
import VisibilitySensor from 'react-visibility-sensor-v2';
import './StickToTop.scss';



interface _StickySensorProps {
    onShow: (show: boolean) => void
};
export class StickySensor extends React.Component<_StickySensorProps> {

  render(){
    return (
        <div className="StickySensor">
            <VizSensor
                onChange={(isVisible) => {this.props.onShow(!isVisible)}}>
                {this.props.children}
            </VizSensor>
        </div>
    );
  }
}

/* sticky wrapper */

interface _StickyWrapperProps {
    show: boolean;
    sticky: JSX.Element;
};
export class StickyWrapper extends React.Component<_StickyWrapperProps> {
  
  scrollingDiv: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

  render(){
    return (
      <div className="StickyWrapper">
          <div className={this.props.show ? "show" : "hide"}>
            {this.props.sticky}
          </div>
          <div className="scrollable">
            {this.props.children}
          </div>
      </div>
    );
  }
}
