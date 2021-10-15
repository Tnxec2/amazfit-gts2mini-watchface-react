import React from 'react';
import { Card } from 'react-bootstrap';

import { Digit, WatchDialFace } from '../model/watchFace.model';
import DigitComponent from './digit.component';

interface IProps {
  images: HTMLImageElement[],
  timeDigital: WatchDialFace,
  onUpdateTimeDigital(timeDigital: WatchDialFace): void,
}

interface IState {
  collapsed: boolean
}

export default class TimeDigitalComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      collapsed: true
    }

    this.updateHoursDigit = this.updateHoursDigit.bind(this)
    this.updateMinutesDigit = this.updateMinutesDigit.bind(this)
    this.updateSecondsDigit = this.updateSecondsDigit.bind(this)
    this.updateTimeDigital = this.updateTimeDigital.bind(this)
  }

  onToggleHours() {
    const t = this.props.timeDigital
    t.enableHoursDigital = !t.enableHoursDigital
    this.updateTimeDigital(t)
  }

  onToggleMinutes() {
    const t = this.props.timeDigital
    t.enableMinutesDigital = !t.enableMinutesDigital
    this.updateTimeDigital(t)
  }
  onToggleSeconds() {
    const t = this.props.timeDigital
    t.enableSecondsDigital = !t.enableSecondsDigital
    this.updateTimeDigital(t)
  }

  updateHoursDigit(h: Digit) {
    const t = this.props.timeDigital
    t.hoursDigital = h
    this.updateTimeDigital(t)
  }

  updateMinutesDigit(m: Digit) {
    const t = this.props.timeDigital
    t.minutesDigital = m
    this.updateTimeDigital(t)
  }

  updateSecondsDigit(s: Digit) {
    const t = this.props.timeDigital
    t.secondsDigital = s
    this.updateTimeDigital(t)
  }
  
  updateTimeDigital(t: WatchDialFace) {
    this.props.onUpdateTimeDigital(t)
  }

  render() {
    return (
      <Card>
        <Card.Header 
         onClick={() => {this.setState({collapsed: !this.state.collapsed})}}
         >
           Time Digital</Card.Header>
        <Card.Body className={`${this.state.collapsed ? "collapse": ""}`}>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Hours</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.timeDigital.enableHoursDigital} 
                  onChange={this.onToggleHours.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.props.timeDigital.enableHoursDigital ? <DigitComponent images={this.props.images} digit={this.props.timeDigital.hoursDigital} onUpdateDigit={this.updateHoursDigit}  showDecimalPointer={false} showDelimiter={false} showNoData={false} paddingZeroFix={false} /> : '' }
          </Card>
          <Card>
           <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Minutes</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.timeDigital.enableMinutesDigital} 
                  onChange={this.onToggleMinutes.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.props.timeDigital.enableMinutesDigital ? <DigitComponent images={this.props.images} digit={this.props.timeDigital.minutesDigital} onUpdateDigit={this.updateMinutesDigit} showDecimalPointer={false} showDelimiter={false} showNoData={false}  paddingZeroFix={true} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Seconds</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.timeDigital.enableSecondsDigital} 
                  onChange={this.onToggleSeconds.bind(this)} />
                </div>
              </div>
            </Card.Header>
              { this.props.timeDigital.enableSecondsDigital ? <DigitComponent images={this.props.images} digit={this.props.timeDigital.secondsDigital} onUpdateDigit={this.updateSecondsDigit} showDecimalPointer={false} showDelimiter={false} showNoData={false}  paddingZeroFix={true} /> : '' }
          </Card>
        </Card.Body>
      </Card>
    );
  }
}

