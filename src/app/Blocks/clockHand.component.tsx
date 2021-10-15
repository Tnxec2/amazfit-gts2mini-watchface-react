import React from 'react';
import { Card } from 'react-bootstrap';

import { WatchClockHand } from '../model/watchFace.model';
import SelectFileListComponent from '../../shared/selectFileList.component';

interface IProps {
  images: HTMLImageElement[],
  clockHand: WatchClockHand,
  onUpdate(clockHand: WatchClockHand): void,
}

interface IState {
  collapsed: boolean
}

export default class ClockHandComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      collapsed: true
    }
  }

  render() {

    return (
      <Card.Body>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Pointer</span>
          <SelectFileListComponent images={this.props.images} 
            setSelectedFileIndex={(i) => { let ch = this.props.clockHand; ch.pointerImageIndex = i; this.props.onUpdate(ch) }}
            imageIndex={this.props.clockHand.pointerImageIndex} />
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Center of rotation</span>
          <span className="input-group-text" id="addon-wrapping">X</span>
          <input type="number" className="form-control form-control-sm" value={this.props.clockHand.x} 
          onChange={(e) => {const ch = this.props.clockHand; ch.x = parseInt(e.target.value); this.props.onUpdate(ch)}} />
          <span className="input-group-text" id="addon-wrapping">Y</span>
          <input type="number" className="form-control form-control-sm" value={this.props.clockHand.y} 
          onChange={(e) => {const ch = this.props.clockHand; ch.y = parseInt(e.target.value); this.props.onUpdate(ch)}} />
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Pointer offset</span>
          <span className="input-group-text" id="addon-wrapping">X</span>
          <input type="number" className="form-control form-control-sm" value={this.props.clockHand.pointerX} 
          onChange={(e) => {const ch = this.props.clockHand; ch.pointerX = parseInt(e.target.value); this.props.onUpdate(ch)}} />
          <span className="input-group-text" id="addon-wrapping">Y</span>
          <input type="number" className="form-control form-control-sm" value={this.props.clockHand.pointerY} 
          onChange={(e) => {const ch = this.props.clockHand; ch.pointerY = parseInt(e.target.value); this.props.onUpdate(ch)}} />
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Cover</span>
            <SelectFileListComponent images={this.props.images} 
            setSelectedFileIndex={(i) => { let ch = this.props.clockHand; ch.coverImageIndex = i; this.props.onUpdate(ch) }}
            imageIndex={this.props.clockHand.coverImageIndex} />
          <span className="input-group-text" id="addon-wrapping">X</span>
          <input type="number" className="form-control form-control-sm" value={this.props.clockHand.coverX} 
          onChange={(e) => {const ch = this.props.clockHand; ch.coverX = parseInt(e.target.value); this.props.onUpdate(ch)}} />
          <span className="input-group-text" id="addon-wrapping">Y</span>
          <input type="number" className="form-control form-control-sm" value={this.props.clockHand.coverY} 
          onChange={(e) => {const ch = this.props.clockHand; ch.coverY = parseInt(e.target.value); this.props.onUpdate(ch)}} />
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Scale</span>
            <SelectFileListComponent images={this.props.images} 
            setSelectedFileIndex={(i) => { let ch = this.props.clockHand; ch.scaleImageIndex = i; this.props.onUpdate(ch) }}
            imageIndex={this.props.clockHand.scaleImageIndex} />
          <span className="input-group-text" id="addon-wrapping">X</span>
          <input type="number" className="form-control form-control-sm" value={this.props.clockHand.scaleX} 
          onChange={(e) => {const ch = this.props.clockHand; ch.scaleX = parseInt(e.target.value); this.props.onUpdate(ch)}} />
          <span className="input-group-text" id="addon-wrapping">Y</span>
          <input type="number" className="form-control form-control-sm" value={this.props.clockHand.scaleY} 
          onChange={(e) => {const ch = this.props.clockHand; ch.scaleY = parseInt(e.target.value); this.props.onUpdate(ch)}} />
        </div>
      </Card.Body>
    );
  }
}

