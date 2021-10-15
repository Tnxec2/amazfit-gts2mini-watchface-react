import React from 'react';
import { Card } from 'react-bootstrap';

import { Digit } from '../model/watchFace.model';
import SelectFileListComponent from '../../shared/selectFileList.component';

interface IProps {
  images: HTMLImageElement[],
  digit: Digit,
  onUpdateDigit(digit: Digit): void,
  showNoData: boolean,
  showDecimalPointer: boolean,
  showDelimiter: boolean,
  paddingZeroFix: boolean
}

interface IState {
  digit: Digit,
  collapsed: boolean
}

export default class DigitComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      digit: this.props.digit ? this.props.digit : new Digit(),
      collapsed: true
    }

    this.onChangeImageIndex = this.onChangeImageIndex.bind(this)
    this.onChangeUnit = this.onChangeUnit.bind(this)
    this.onChangeX = this.onChangeX.bind(this)
    this.onChangeY = this.onChangeY.bind(this)
    this.onChangePaddingZero = this.onChangePaddingZero.bind(this)
    this.onChangeAlignment = this.onChangeAlignment.bind(this)
    this.onChangeSpacing = this.onChangeSpacing.bind(this)
    this.onChangeFollow = this.onChangeFollow.bind(this)
    this.onChangeSeparatorX =  this.onChangeSeparatorX.bind(this)
    this.onChangeSeparatorY =  this.onChangeSeparatorY.bind(this)
  }

  onChangeImageIndex(index: number) {
    const d = this.state.digit
    d.imageIndex = index
    this.updateDigit(d)
  }

  onChangeUnit(index: number) {
    const d = this.state.digit
    d.unitImageIndex = index
    this.updateDigit(d)
  }

  onChangeX(e) {
    const d = this.state.digit
    d.x = parseInt(e.target.value)
    this.updateDigit(d)
  }

  onChangeY(e) {
    const d = this.state.digit
    d.y = parseInt(e.target.value)
    this.updateDigit(d)
  }

  onChangePaddingZero(e) {
    const d = this.state.digit
    d.paddingZero = !d.paddingZero
    this.updateDigit(d)
  }

  onChangeAlignment(e) {
    const d = this.state.digit
    d.alignment = parseInt(e.target.value)
    this.updateDigit(d)
  }

  onChangeFollow(e) {
    const d = this.state.digit
    d.follow = !d.follow
    this.updateDigit(d)
  }

  onChangeSpacing(e) {
    const d = this.state.digit
    d.spacing = parseInt(e.target.value)
    this.updateDigit(d)
  }

  onChangeNoData(index: number) {
    const d = this.state.digit
    d.noDataImageIndex = index
    this.updateDigit(d)
  }

  onChangeDelimiter(index: number) {
    const d = this.state.digit
    d.delimiterImageIndex = index
    this.updateDigit(d)
  }

  onChangeDecimalPointer(index: number) {
    const d = this.state.digit
    d.decimalPointImageIndex = index
    this.updateDigit(d)
  }

  onChangeSeparator(index: number) {
    const d = this.state.digit
    d.separator.imageIndex = index
    this.updateDigit(d)
  }

  onChangeSeparatorX(e) {
    const d = this.state.digit
    d.separator.x = parseInt(e.target.value)
    this.updateDigit(d)
  }
  
  onChangeSeparatorY(e) {
    const d = this.state.digit
    d.separator.y = parseInt(e.target.value)
    this.updateDigit(d)
  }

  updateDigit(d: Digit) {
    this.setState({digit: d });
    this.props.onUpdateDigit(d)
  }

  render() {
    const x = this.state.digit.x ? this.state.digit.x : 0
    const y = this.state.digit.y ? this.state.digit.y : 0
    const separatorx = this.state.digit.separator.x ? this.state.digit.separator.x : 0
    const separatory = this.state.digit.separator.y ? this.state.digit.separator.y : 0
    const spacing = this.state.digit.spacing ? this.state.digit.spacing : 0
    return (
      <Card.Body>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeImageIndex} imageIndex={this.state.digit.imageIndex} />
            <span className="input-group-text">count: {this.state.digit.imageCount}</span>
        </div>
        { ! this.state.digit.displayFormAnalog ?
        <div className="input-group input-group-sm">
          <span className="input-group-text">Unit</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeUnit.bind(this)} imageIndex={this.state.digit.unitImageIndex}  />
        </div> : '' 
        }
        { this.props.showNoData ?
        <div className="input-group input-group-sm">
          <span className="input-group-text">NoData</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeNoData.bind(this)} imageIndex={this.state.digit.noDataImageIndex}/>
        </div> : '' }
        { this.props.showDelimiter ?
        <div className="input-group input-group-sm">
          <span className="input-group-text">Minus</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeDelimiter.bind(this)} imageIndex={this.state.digit.delimiterImageIndex}/>
        </div> : '' }
        { this.props.showDecimalPointer ?
        <div className="input-group input-group-sm">
          <span className="input-group-text">Decimal pointer</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeDecimalPointer.bind(this)} imageIndex={this.state.digit.decimalPointImageIndex}/>
        </div> : '' }
        <div className="input-group input-group-sm flex-nowrap mb-1 mt-1">
          <span className="input-group-text" id="addon-wrapping">X</span>
          <input type="number" className="form-control form-control-sm" value={x } onChange={this.onChangeX} />
          <span className="input-group-text" id="addon-wrapping">Y</span>
          <input type="number" className="form-control form-control-sm" value={y } onChange={this.onChangeY} />
          { ! this.state.digit.displayFormAnalog ?
          <>
          <span className="input-group-text" id="addon-wrapping">alignment</span>
            <div className="input-group-text">
              <select className="form-select form-select-sm" onChange={this.onChangeAlignment}>
                <option value="0">Left</option>
                <option value="1">Center</option>
                <option value="2">Right</option>
              </select>
            </div> 
            </>
            : '' }
        </div>
        { !this.state.digit.displayFormAnalog ?
          <>
          <div className="input-group input-group-sm flex-nowrap mb-1">
            <span className="input-group-text" id="addon-wrapping">padding zero</span>
            <div className="input-group-text">
              <input className="form-check-input mt-0" type="checkbox" disabled={this.props.paddingZeroFix}
              checked={this.state.digit.paddingZero || this.props.paddingZeroFix} 
              onChange={this.onChangePaddingZero} />
            </div>
            <span className="input-group-text" id="addon-wrapping">spacing</span>
            <input type="number" className="form-control form-control-sm" value={spacing } onChange={this.onChangeSpacing} />
            <span className="input-group-text" id="addon-wrapping">follow</span>
            <div className="input-group-text">
              <input className="form-check-input mt-0" type="checkbox" 
              checked={this.state.digit.follow} 
              onChange={this.onChangeFollow} />
            </div>
          </div>

          <div className="input-group input-group-sm">
            <span className="input-group-text">Separator</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeSeparator.bind(this)} imageIndex={this.state.digit.separator.imageIndex}/>
            <span className="input-group-text" id="addon-wrapping">X</span>
            <input type="number" className="form-control form-control-sm" value={separatorx } onChange={this.onChangeSeparatorX} />
            <span className="input-group-text" id="addon-wrapping">Y</span>
            <input type="number" className="form-control form-control-sm" value={separatory } onChange={this.onChangeSeparatorY} />
          </div> 

          </> : ''
        }
      </Card.Body>
    );
  }
}

