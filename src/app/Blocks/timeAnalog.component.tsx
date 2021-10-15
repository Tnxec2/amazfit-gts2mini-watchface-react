import React from 'react';
import { Card } from 'react-bootstrap';

import { WatchDialFace } from '../model/watchFace.model';
import ClockHandComponent from './clockHand.component';

interface IProps {
  images: HTMLImageElement[],
  dialface: WatchDialFace,
  onUpdate(dialface: WatchDialFace): void,
}

interface IState {
  collapsed: boolean
}

export default class TimeAnalogComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      collapsed: true
    }
  }

  render() {
    return (
      <Card>
        <Card.Header 
         onClick={() => {this.setState({collapsed: !this.state.collapsed})}}
         >
           Time Analog</Card.Header>
        <Card.Body className={`${this.state.collapsed ? "collapse": ""}`}>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Hours</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.dialface.enableHoursClockhand} 
                  onChange={() => {
                    const d = this.props.dialface; d.enableHoursClockhand = !d.enableHoursClockhand; this.props.onUpdate(d) }} />
                </div>
              </div>
              </Card.Header>
              { this.props.dialface.enableHoursClockhand ? 
                <ClockHandComponent 
                images={this.props.images} 
                clockHand={this.props.dialface.hoursClockhand} 
                onUpdate={(ch) => { const d = this.props.dialface; d.hoursClockhand = ch; this.props.onUpdate(d)}}
                 /> 
                : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Minutes</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.dialface.enableMinutesClockhand} 
                  onChange={() => {
                    const d = this.props.dialface; d.enableMinutesClockhand = !d.enableMinutesClockhand; this.props.onUpdate(d) }} />
                </div>
              </div>
              </Card.Header>
              { this.props.dialface.enableMinutesClockhand ? 
                <ClockHandComponent images={this.props.images} clockHand={this.props.dialface.minutesClockhand} 
                onUpdate={(ch) => { const d = this.props.dialface; d.minutesClockhand = ch; this.props.onUpdate(d)}}
                 /> 
                : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Seconds</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.dialface.enableSecondsClockhand} 
                  onChange={() => {
                    const d = this.props.dialface; d.enableSecondsClockhand = !d.enableSecondsClockhand; this.props.onUpdate(d) }} />
                </div>
              </div>
              </Card.Header>
              { this.props.dialface.enableSecondsClockhand ? 
                <ClockHandComponent images={this.props.images} clockHand={this.props.dialface.secondsClockhand} 
                onUpdate={(ch) => { const d = this.props.dialface; d.secondsClockhand = ch; this.props.onUpdate(d)}}
                 /> 
                : '' }
          </Card>
          
        </Card.Body>
      </Card>
    );
  }
}

