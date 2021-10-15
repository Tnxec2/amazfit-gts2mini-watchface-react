import React from 'react';
import { Card } from 'react-bootstrap';

import { WatchActivity } from '../model/watchFace.model';
import DigitComponent from './digit.component';
import ImageProgressComponent from './imageProgress.component';

interface IProps {
  images: HTMLImageElement[],
  activity: WatchActivity,
  title: string,
  onUpdateActivity(activity: WatchActivity): void,
  showDecimalPointer?: boolean,
  showDelimiter?: boolean,
  showNoData?: boolean,
  paddingZeroFix?: boolean,
  showProgress?: boolean
}

interface IState {
  collapsed: boolean
}

export default class ActivityComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      collapsed: true
    }

  }

  render() {
    return (
          <Card className="activity">
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">{this.props.title}</span>
              </div>
              </Card.Header>
            <Card>
              <Card.Header>
                <div className="input-group input-group-sm">
                  <span className="input-group-text">Numerical</span>
                  <div className="input-group-text">
                    <input className="form-check-input mt-0" type="checkbox" 
                    checked={this.props.activity.digit.enabled} 
                    onChange={() => {const a = this.props.activity; a.digit.enabled = ! a.digit.enabled; this.props.onUpdateActivity(a)}} />
                  </div>
                </div>
              </Card.Header>
              { this.props.activity.digit.enabled ? <DigitComponent images={this.props.images} digit={this.props.activity.digit} 
                onUpdateDigit={(d) => {const a = this.props.activity; a.digit = d; this.props.onUpdateActivity(a) }} 
                showDecimalPointer={this.props.showDecimalPointer} 
                showDelimiter={this.props.showDelimiter} 
                showNoData={this.props.showNoData} 
                paddingZeroFix={this.props.paddingZeroFix} /> : '' }
            </Card>
            { this.props.showProgress === undefined || this.props.showProgress === true ?
            <>
            <Card>
              <Card.Header>
                <div className="input-group input-group-sm">
                  <span className="input-group-text">Image Progress</span>
                  <div className="input-group-text">
                    <input className="form-check-input mt-0" type="checkbox" 
                    checked={this.props.activity.imageProgress.enabled} 
                    onChange={() => {const a = this.props.activity; a.imageProgress.enabled = ! a.imageProgress.enabled; this.props.onUpdateActivity(a)}} />
                  </div>
                </div>
              </Card.Header>
              { this.props.activity.imageProgress.enabled ? <ImageProgressComponent 
                images={this.props.images}
                imageProgress={this.props.activity.imageProgress} 
                onUpdate={(d) => {const a = this.props.activity; a.imageProgress = d; this.props.onUpdateActivity(a) }} 
                /> : '' }
            </Card>
            </> : '' }
          </Card>
    );
  }
}

