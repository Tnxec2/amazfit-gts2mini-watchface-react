import React from 'react';
import { Card } from 'react-bootstrap';

import { Digit, WatchTimeDigital } from '../model/watchFace.model';
import DigitComponent from './digit.component';

interface IProps {
  images: HTMLImageElement[],
  timeDigital: WatchTimeDigital,
  onUpdateTimeDigital(timeDigital: WatchTimeDigital): void,
}

interface IState {
  timeDigital: WatchTimeDigital,
  collapsed: boolean
}

export default class TimeDigitalComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      timeDigital: new WatchTimeDigital(),
      collapsed: true
    }

    this.updateHoursDigit = this.updateHoursDigit.bind(this)
    this.updateMinutesDigit = this.updateMinutesDigit.bind(this)
    this.updateSecondsDigit = this.updateSecondsDigit.bind(this)
    this.updateTimeDigital = this.updateTimeDigital.bind(this)
  }

  onToggleHours() {
    const t = this.state.timeDigital
    t.enableHours = !t.enableHours
    this.updateTimeDigital(t)
  }

  onToggleMinutes() {
    const t = this.state.timeDigital
    t.enableMinutes = !t.enableMinutes
    this.updateTimeDigital(t)
  }
  onToggleSeconds() {
    const t = this.state.timeDigital
    t.enableSeconds = !t.enableSeconds
    this.updateTimeDigital(t)
  }

  updateHoursDigit(h: Digit) {
    const t = this.state.timeDigital
    t.hours = h
    this.updateTimeDigital(t)
  }

  updateMinutesDigit(m: Digit) {
    const t = this.state.timeDigital
    t.minutes = m
    this.updateTimeDigital(t)
  }

  updateSecondsDigit(s: Digit) {
    const t = this.state.timeDigital
    t.seconds = s
    this.updateTimeDigital(t)
  }
  
  updateTimeDigital(t: WatchTimeDigital) {
    this.setState({timeDigital: t });
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
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Hours</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.state.timeDigital.enableHours} 
                  onChange={this.onToggleHours.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.state.timeDigital.enableHours ? <DigitComponent images={this.props.images} digit={this.state.timeDigital.hours} onUpdateDigit={this.updateHoursDigit} /> : '' }
          </Card>
          <Card>
           <Card.Header>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Minutes</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.state.timeDigital.enableMinutes} 
                  onChange={this.onToggleMinutes.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.state.timeDigital.enableMinutes ? <DigitComponent images={this.props.images} digit={this.state.timeDigital.minutes} onUpdateDigit={this.updateMinutesDigit} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Seconds</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.state.timeDigital.enableSeconds} 
                  onChange={this.onToggleSeconds.bind(this)} />
                </div>
              </div>
            </Card.Header>
              { this.state.timeDigital.enableSeconds ? <DigitComponent images={this.props.images} digit={this.state.timeDigital.seconds} onUpdateDigit={this.updateSecondsDigit} /> : '' }
          </Card>
        </Card.Body>
      </Card>
    );
  }
}

