import React from 'react';
import { Card, Form } from 'react-bootstrap';

import { Background } from '../model/watchFace.model';
import SelectFileListComponent from '../../shared/selectFileList.component';

interface IProps {
  images: HTMLImageElement[],
  background: Background,
  onUpdateBackground(background: Background): void,
}

interface IState {
  collapsed: boolean
}

export default class BackgroundComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      collapsed: true
    }

    this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this)
    this.onChangeBackgroundImageIndex = this.onChangeBackgroundImageIndex.bind(this)
    this.onChangeBackgroundPreviewImage = this.onChangeBackgroundPreviewImage.bind(this)
  }

  onChangeBackgroundPreviewImage(index: number) {
      const b = this.props.background
      b.previewIndex = index
      this.updateBackground(b)
  }

  onChangeBackgroundImageIndex(index: number) {
    const b = this.props.background
    b.imageIndex = index
    this.updateBackground(b)
  }

  onChangeBackgroundColor(e) {
    const b = this.props.background
    b.color = e.target.value
    this.updateBackground(b)
  }

  updateBackground(b: Background) {
    this.props.onUpdateBackground(b)
  }

  render() {

    return (
      <Card>
        <Card.Header className="clickable"
         onClick={() => {this.setState({collapsed: !this.state.collapsed})}}
         >
           Background</Card.Header>
        { !this.state.collapsed ? 
        <Card.Body>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">PreviewImage</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeBackgroundPreviewImage} imageIndex={this.props.background.previewIndex}/>
        </div>
        
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeBackgroundImageIndex} imageIndex={this.props.background.imageIndex}/>
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Color</span>
          <Form.Control onChange={this.onChangeBackgroundColor}
            type="color"
            id="colorBackground"
            defaultValue="#000000"
            title="Choose background color"
          />
        </div>
        </Card.Body> : '' }
      </Card>
    );
  }
}

