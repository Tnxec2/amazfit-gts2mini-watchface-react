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
  background: Background,
  collapsed: boolean
}

export default class BackgroundComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      background: new Background(),
      collapsed: true
    }

    this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this)
    this.onChangeBackgroundImageIndex = this.onChangeBackgroundImageIndex.bind(this)
    this.onChangeBackgroundPreviewImage = this.onChangeBackgroundPreviewImage.bind(this)
  }

  onChangeBackgroundPreviewImage(index: number) {
      const b = this.state.background
      b.previewIndex = index
      this.updateBackground(b)
  }

  onChangeBackgroundImageIndex(index: number) {
    const b = this.state.background
    b.imageIndex = index
    this.updateBackground(b)
  }

  onChangeBackgroundColor(e) {
    const b = this.state.background
    b.color = e.target.value
    this.updateBackground(b)
  }

  updateBackground(b: Background) {
    this.setState({background: b });
    this.props.onUpdateBackground(b)
  }

  render() {
    return (
      <Card>
        <Card.Header 
         onClick={() => {this.setState({collapsed: !this.state.collapsed})}}
         >
           Background</Card.Header>
        <Card.Body className={`${this.state.collapsed ? "collapse": ""}`}>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text">PreviewImage</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeBackgroundPreviewImage} />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent images={this.props.images} setSelectedFileIndex={this.onChangeBackgroundImageIndex} />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text">Color</span>
          <Form.Control onChange={this.onChangeBackgroundColor}
            type="color"
            id="colorBackground"
            defaultValue="#000000"
            title="Choose background color"
          />
        </div>
        </Card.Body>
      </Card>
    );
  }
}

