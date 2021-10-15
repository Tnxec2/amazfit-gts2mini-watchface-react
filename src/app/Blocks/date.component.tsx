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
  collapsed: boolean
}

export default class DateComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      collapsed: true
    }

    this.updateYearDigit = this.updateYearDigit.bind(this)
    this.updateMonthDigit = this.updateMonthDigit.bind(this)
    this.updateMonthAsWordDigit = this.updateMonthAsWordDigit.bind(this)
    this.updateDayDigit = this.updateDayDigit.bind(this)
    this.updateWeekDayDigit = this.updateWeekDayDigit.bind(this)
  }

  onToggleDay() {
    const d = this.props.date
    d.enableDay = !d.enableDay
    this.props.onUpdateDate(d)
  }

  onToggleYear() {
    const d = this.props.date
    d.enableYear = !d.enableYear
    this.props.onUpdateDate(d)
  }

  onToggleMonth() {
    const d = this.props.date
    d.enableMonth = !d.enableMonth
    this.props.onUpdateDate(d)
  }

  onToggleMonthAsWord() {
    const d = this.props.date
    d.enableMonthAsWord = !d.enableMonthAsWord
    this.props.onUpdateDate(d)
  }

  onToggleWeekday() {
    const d = this.props.date
    d.enableWeekDay = !d.enableWeekDay
    this.props.onUpdateDate(d)
  }

  updateYearDigit(h: Digit) {
    const d = this.props.date
    d.year = h
    this.props.onUpdateDate(d)
  }

  updateMonthDigit(m: Digit) {
    const d = this.props.date
    d.month = m
    this.props.onUpdateDate(d)
  }

  updateMonthAsWordDigit(m: Digit) {
    const d = this.props.date
    d.monthAsWord = m
    this.props.onUpdateDate(d)
  }

  updateDayDigit(s: Digit) {
    const d = this.props.date
    d.day = s
    this.props.onUpdateDate(d)
  }

  updateWeekDayDigit(s: Digit) {
    const d = this.props.date
    d.weekDay = s
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
              <div className="input-group input-group-sm">
                <span className="input-group-text">Day</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.date.enableDay} 
                  onChange={this.onToggleDay.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.props.date.enableDay ? <DigitComponent images={this.props.images} digit={this.props.date.day} onUpdateDigit={this.updateDayDigit} showDecimalPointer={false} showDelimiter={false} showNoData={false} paddingZeroFix={false} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Month</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.date.enableMonth} 
                  onChange={this.onToggleMonth.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.props.date.enableMonth ? <DigitComponent images={this.props.images} digit={this.props.date.month} onUpdateDigit={this.updateMonthDigit} showDecimalPointer={false} showDelimiter={false} showNoData={false} paddingZeroFix={false} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Month as word</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.date.enableMonthAsWord} 
                  onChange={this.onToggleMonthAsWord.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.props.date.enableMonthAsWord ? <DigitComponent images={this.props.images} digit={this.props.date.monthAsWord} onUpdateDigit={this.updateMonthAsWordDigit} showDecimalPointer={false} showDelimiter={false} showNoData={false} paddingZeroFix={true} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Year</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.date.enableYear} 
                  onChange={this.onToggleYear.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.props.date.enableYear ? <DigitComponent images={this.props.images} digit={this.props.date.year} onUpdateDigit={this.updateYearDigit} showDecimalPointer={false} showDelimiter={false} showNoData={false} paddingZeroFix={false} /> : '' }
          </Card>
          <Card>
            <Card.Header>
              <div className="input-group input-group-sm">
                <span className="input-group-text">Weekday</span>
                <div className="input-group-text">
                  <input className="form-check-input mt-0" type="checkbox" 
                  checked={this.props.date.enableWeekDay} 
                  onChange={this.onToggleWeekday.bind(this)} />
                </div>
              </div>
              </Card.Header>
              { this.props.date.enableWeekDay ? <DigitComponent images={this.props.images} digit={this.props.date.weekDay} onUpdateDigit={this.updateWeekDayDigit} showDecimalPointer={false} showDelimiter={false} showNoData={false} paddingZeroFix={true} /> : '' }
          </Card>


        </Card.Body>
      </Card>
    );
  }
}

