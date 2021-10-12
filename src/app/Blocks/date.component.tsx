import React from 'react';
import { Card } from 'react-bootstrap';

import { Digit, WatchDate } from '../model/watchFace.model';
import DigitComponent from './digit.component';

interface IProps {
  images: HTMLImageElement[],
  date: WatchDate,
  onUpdateDate(date: WatchDate): void,
}

interface IState {
  date: WatchDate,
  collapsed: boolean
}

export default class DateComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      date: new WatchDate(),
      collapsed: true
    }

    this.updateYearDigit = this.updateYearDigit.bind(this)
    this.updateMonthDigit = this.updateMonthDigit.bind(this)
    this.updateMonthAsWordDigit = this.updateMonthAsWordDigit.bind(this)
    this.updateDayDigit = this.updateDayDigit.bind(this)
    this.updateWeekDayDigit = this.updateWeekDayDigit.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  onToggleDay() {
    const d = this.state.date
    d.enableDay = !d.enableDay
    this.updateDate(d)
  }

  onToggleYear() {
    const d = this.state.date
    d.enableYear = !d.enableYear
    this.updateDate(d)
  }

  onToggleMonth() {
    const d = this.state.date
    d.enableMonth = !d.enableMonth
    this.updateDate(d)
  }

  onToggleMonthAsWord() {
    const d = this.state.date
    d.enableMonthAsWord = !d.enableMonthAsWord
    this.updateDate(d)
  }

  onToggleWeekday() {
    const d = this.state.date
    d.enableWeekDay = !d.enableWeekDay
    this.updateDate(d)
  }

  updateYearDigit(h: Digit) {
    const d = this.state.date
    d.year = h
    this.updateDate(d)
  }

  updateMonthDigit(m: Digit) {
    const d = this.state.date
    d.month = m
    this.updateDate(d)
  }

  updateMonthAsWordDigit(m: Digit) {
    const d = this.state.date
    d.monthAsWord = m
    this.updateDate(d)
  }

  updateDayDigit(s: Digit) {
    const d = this.state.date
    d.day = s
    this.updateDate(d)
  }

  updateWeekDayDigit(s: Digit) {
    const d = this.state.date
    d.weekDay = s
    this.updateDate(d)
  }
  
  updateDate(d: WatchDate) {
    this.setState({date: d });
    this.props.onUpdateDate(d)
  }

  render() {
    return (
      <Card>
        <Card.Header 
         onClick={() => {this.setState({collapsed: !this.state.collapsed})}}
         >
           Date</Card.Header>
        <Card.Body className={`${this.state.collapsed ? "collapse": ""}`}>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Day</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.state.date.enableDay} 
                  onChange={this.onToggleDay.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.state.date.enableDay ? <DigitComponent images={this.props.images} digit={this.state.date.day} onUpdateDigit={this.updateDayDigit} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Month</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.state.date.enableMonth} 
                  onChange={this.onToggleMonth.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.state.date.enableMonth ? <DigitComponent images={this.props.images} digit={this.state.date.month} onUpdateDigit={this.updateMonthDigit} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Month as word</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.state.date.enableMonthAsWord} 
                  onChange={this.onToggleMonthAsWord.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.state.date.enableMonthAsWord ? <DigitComponent images={this.props.images} digit={this.state.date.monthAsWord} onUpdateDigit={this.updateMonthAsWordDigit} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Year</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.state.date.enableYear} 
                  onChange={this.onToggleYear.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.state.date.enableYear ? <DigitComponent images={this.props.images} digit={this.state.date.year} onUpdateDigit={this.updateYearDigit} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Weekday</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.state.date.enableWeekDay} 
                  onChange={this.onToggleWeekday.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.state.date.enableWeekDay ? <DigitComponent images={this.props.images} digit={this.state.date.weekDay} onUpdateDigit={this.updateWeekDayDigit} /> : '' }
          </Card>


        </Card.Body>
      </Card>
    );
  }
}

