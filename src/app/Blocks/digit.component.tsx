import React from 'react';
import { Card } from 'react-bootstrap';

import { Digit } from '../model/watchFace.model';
import SelectFileListComponent from '../../shared/selectFileList.component';

interface IProps {
  images: HTMLImageElement[],
  digit: Digit,
  onUpdateDigit(digit: Digit): void,
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
    this.onChangeX = this.onChangeX.bind(this)
    this.onChangeY = this.onChangeY.bind(this)
    this.onChangePaddingZero = this.onChangePaddingZero.bind(this)
    this.onChangeAlignment = this.onChangeAlignment.bind(this)
    this.onChangeSpacing = this.onChangeSpacing.bind(this)
  }

  onChangeImageIndex(index: number) {
    const d = this.state.digit
    d.imageIndex = index
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


  onChangeSpacing(e) {
    const d = this.state.digit
    d.spacing = parseInt(e.target.value)
    this.updateDigit(d)
  }

  updateDigit(d: Digit) {
    this.setState({digit: d });
    this.props.onUpdateDigit(d)
  }

  render() {
    const x = this.state.digit.x ? this.state.digit.x : 0
    const y = this.state.digit.y ? this.state.digit.y : 0
    const spacing = this.state.digit.spacing ? this.state.digit.spacing : 0
    return (
      <Card.Body>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeImageIndex} />
            <span className="input-group-text">count: {this.state.digit.imageCount}</span>
        </div>
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">X</span>
          <input type="number" className="form-control form-control-sm" value={x } onChange={this.onChangeX} />
          <span className="input-group-text" id="addon-wrapping">Y</span>
          <input type="number" className="form-control form-control-sm" value={y } onChange={this.onChangeY} />
        </div>
        { !this.state.digit.displayFormAnalog ?
          <>
          <div className="input-group input-group-sm flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">padding zero</span>
            <div className="input-group-text">
              <input className="form-check-input mt-0" type="checkbox" 
              checked={this.state.digit.paddingZero} 
              onChange={this.onChangePaddingZero} />
            </div>
            <span className="input-group-text" id="addon-wrapping">spacing</span>
            <input type="number" className="form-control form-control-sm" value={spacing } onChange={this.onChangeSpacing} />
          </div>
          <div className="input-group input-group input-group-sm flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">alignment</span>
            <div className="input-group-text">
              <select className="form-select form-select-sm" onChange={this.onChangeAlignment}>
                <option value="0">Left</option>
                <option value="1">Center</option>
                <option value="2">Right</option>
              </select>
            </div>
          </div> 
          </> : ''
        }
      </Card.Body>
    );
  }
}

