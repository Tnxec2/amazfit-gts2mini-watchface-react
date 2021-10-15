import React from 'react';
import { Card } from 'react-bootstrap';

import { WatchImageProgress } from '../model/watchFace.model';
import SelectFileListComponent from '../../shared/selectFileList.component';

interface IProps {
  images: HTMLImageElement[],
  imageProgress: WatchImageProgress,
  onUpdate(imageProgress: WatchImageProgress): void,
}

interface IState {
  collapsed: boolean
}

export default class ImageProgressComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      collapsed: true
    }
  }

  render() {
    const x = this.props.imageProgress?.coordinates[0].x ? this.props.imageProgress.coordinates[0].x : 0
    const y = this.props.imageProgress?.coordinates[0].y ? this.props.imageProgress.coordinates[0].y : 0

    return (
      <Card.Body>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent images={this.props.images} 
            setSelectedFileIndex={(i) => { let ip = this.props.imageProgress; ip.imageIndex = i; this.props.onUpdate(ip) }}
            imageIndex={this.props.imageProgress.imageIndex} />
            <span className="input-group-text" id="addon-wrapping">Count</span>
            <input type="number" className="form-control form-control-sm" value={this.props.imageProgress.imageCount} 
            onChange={(e) => {const d = this.props.imageProgress; d.imageCount = parseInt(e.target.value); this.props.onUpdate(d)}} />
        </div>
        { this.props.imageProgress.imageCount }
        <div className="input-group input-group-sm flex-nowrap mb-1 mt-1">
          <span className="input-group-text" id="addon-wrapping">X</span>
          <input type="number" className="form-control form-control-sm" value={x } 
          onChange={(e) => {const d = this.props.imageProgress; d.coordinates[0].x = parseInt(e.target.value); this.props.onUpdate(d)}} />
          <span className="input-group-text" id="addon-wrapping">Y</span>
          <input type="number" className="form-control form-control-sm" value={y } 
          onChange={(e) => {const d = this.props.imageProgress; d.coordinates[0].y = parseInt(e.target.value); this.props.onUpdate(d)}} />
        </div>
      </Card.Body>
    );
  }
}

