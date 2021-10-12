import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageLoaderComponent from './app/main/imageLoader.component';
import PreviewComponent from './app/main/preview.component';
import Watchface, { Background, WatchDate, WatchTimeDigital } from './app/model/watchFace.model';
import BackgroundComponent from './app/Blocks/backgroud.component';
import TimeDigitalComponent from './app/Blocks/timeDigital.component';
import DateComponent from './app/Blocks/date.component';
import ElementOrderComponent from './app/main/elementOrder.component';
import JsonComponent from './app/main/json.component';

interface IProps {

}

interface IState {
  images: HTMLImageElement[],
  watchface: Watchface,
  tab: number
}

const storage_items = {
  element_order: 'element_order'
}
export default class App extends React.Component<IProps, IState> {

  readonly NONE = 'None'
  
  constructor(props: IProps) {
    super(props)

    const w = new Watchface()
    if (localStorage.getItem(storage_items.element_order) ) {
      w.orderElements = JSON.parse(localStorage.getItem(storage_items.element_order))
    }
    this.state = {
      images: [],
      watchface: w,
      tab: 0
    }
    this.onImageLoaderChangeHandler = this.onImageLoaderChangeHandler.bind(this)
    this.onChangeBackground = this.onChangeBackground.bind(this)
    this.onChangeTimeDigital = this.onChangeTimeDigital.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)

  }
	
  onImageLoaderChangeHandler(images: HTMLImageElement[]) {
		this.setState({images: images})
	};

  onChangeBackground(background: Background) {
    const face = this.state.watchface
    face.background = background
    this.setState({watchface: face})
  }

  onChangeTimeDigital(time: WatchTimeDigital) {
    const face = this.state.watchface
    face.timeDigital = time
    this.setState({watchface: face})
  }

  onChangeDate(date: WatchDate) {
    const face = this.state.watchface
    face.date = date
    this.setState( {watchface: face})
  }

  onUpdateWatchface(w: Watchface) {
    this.setState( {watchface: w})
    localStorage.setItem(storage_items.element_order, JSON.stringify(w.orderElements))
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <ImageLoaderComponent setUploadedImages={this.onImageLoaderChangeHandler} />
        </Row>
        <Row>
           <Col xs={6} className="blocks">
            <h2>Blocks</h2>
            <BackgroundComponent
                images={this.state.images} 
                background={this.state.watchface.background}
                onUpdateBackground={this.onChangeBackground}
              />
              <TimeDigitalComponent
                images={this.state.images} 
                timeDigital={this.state.watchface.timeDigital}
                onUpdateTimeDigital={this.onChangeTimeDigital}
              />
              <DateComponent 
                  images={this.state.images} 
                  date={this.state.watchface.date}
                  onUpdateDate={this.onChangeDate}
              />
          </Col> 
          <Col xs={6}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className={`nav-link ${this.state.tab === 0} `} 
              onClick={ () => this.setState({tab: 0})}>Preview</button>
            </li>
            <li className="nav-item">
            <button className={`nav-link ${this.state.tab === 1} `} 
              onClick={ () => this.setState({tab: 1})}>Element Order</button>
            </li>
            <li className="nav-item">
            <button className={`nav-link ${this.state.tab === 2} `} 
              onClick={ () => this.setState({tab: 2})}>Json</button>
            </li>
          </ul>
          { this.state.tab === 0 ?
            <PreviewComponent
             images={this.state.images} 
             watchface={this.state.watchface}
             width={348}
             height={442}/> : 
             ( this.state.tab === 1 ? 
            <ElementOrderComponent 
                watchface={this.state.watchface} 
                updateWatchface={this.onUpdateWatchface.bind(this)}
                />
              :
            <JsonComponent 
                watchface={this.state.watchface}/>
              )
          }
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            test
          </Col>
        </Row>
      </Container>
    );
  }
}

