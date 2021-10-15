import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PreviewComponent from './app/main/preview.component';
import Watchface, { Background, WatchActivityList, WatchDate, WatchDialFace } from './app/model/watchFace.model';
import BackgroundComponent from './app/Blocks/backgroud.component';
import TimeDigitalComponent from './app/Blocks/timeDigital.component';
import DateComponent from './app/Blocks/date.component';
import ElementOrderComponent from './app/main/elementOrder.component';
import JsonComponent from './app/main/json.component';
import ActivityListComponent from './app/Blocks/activitylist.component';
import WatchFace from './app/model/watchFace.model';
import { WatchJson } from './app/model/json.model';
import TimeAnalogComponent from './app/Blocks/timeAnalog.component';
import { Constant } from './app/model/constant';

interface IProps {

}

interface IState {
  images: HTMLImageElement[],
  watchface: Watchface,
  tab: number,
  jsonName: string
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
      const o = JSON.parse(localStorage.getItem(storage_items.element_order))
      if (( o.orderElementsTime && o.orderElementsDate && o.orderElementsTime) &&
      ( o.orderElementsTime.lenght === w.orderElements.orderElementsTime.length 
          && o.orderElementsDate.lenght === w.orderElements.orderElementsDate.length
          && o.orderElementsActivity.lenght === w.orderElements.orderElementsActivity.length))
          w.orderElements = o
      else
        localStorage.removeItem(storage_items.element_order)
    }
    this.state = {
      images: null,
      watchface: w,
      tab: 0,
      jsonName: null
    }
    this.onImageLoaderChangeHandler = this.onImageLoaderChangeHandler.bind(this)
    this.onChangeBackground = this.onChangeBackground.bind(this)
    this.onChangeTime = this.onChangeTime.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)

    this.onLoadJson = this.onLoadJson.bind(this)
    this.imagesUploadHandler = this.imagesUploadHandler.bind(this);
    this.getImages = this.getImages.bind(this)
  }
	
  onImageLoaderChangeHandler(images: HTMLImageElement[]) {
		this.setState({images: images})
	};

  onChangeBackground(background: Background) {
    const face = this.state.watchface
    face.background = background
    this.onUpdateWatchface(face)
  }

  onChangeTime(time: WatchDialFace) {
    const face = this.state.watchface
    face.dialFace = time
    this.onUpdateWatchface(face)
  }

  onChangeDate(date: WatchDate) {
    const face = this.state.watchface
    face.date = date
    this.onUpdateWatchface(face)
  }

  onChangeActivity(a: WatchActivityList) {
    const face = this.state.watchface
    face.activity = a
    this.onUpdateWatchface(face)
  }

  onUpdateWatchface(w: Watchface) {
    this.setState( {watchface: w})
    localStorage.setItem(storage_items.element_order, JSON.stringify(w.orderElements))
  }

  uploadJsonFile(e) {
    let file = e.target.files.item(0)
    if (file) {
      let fr = new FileReader()
      fr.onload = this.onLoadJson
      fr.readAsText(file);
      this.setState({jsonName: e.target.files.item(0).name})
    }
  }

  onLoadJson(e: ProgressEvent<FileReader>) {
    let json = e.target.result;
    let j: WatchJson = JSON.parse(json.toString())
    let w = new WatchFace()
    w.updateFormJson(j)
    this.setState({watchface: w})
  }

  imagesUploadHandler(event: any) {
  this.getImages(event.target.files, [])
      
  }

  getImages(files: FileList, ar: HTMLImageElement[], index = 0) {
      if ( index < files.length) {
          const img = new Image();
          img.addEventListener("load", () => {
              index += 1
              if (index < files.length)
                  this.getImages(files, ar, index)
              else {
                  this.setState({images: ar})
              }
          });
          img.src = URL.createObjectURL(files[index]);
          img.alt = files[index].name
          ar.push(img)
      }
  }

  render() {
    return (
      <Container className="App">
        <Row>
            <span className="input-group input-group-sm mb-3">
                <span className="input-group-text">Load images</span>
                <input type='file' multiple id="fileUpload" accept="image/*" onChange={this.imagesUploadHandler} />
          { this.state.images ? 
          <>
                <span className="input-group-text">Load json file</span>
                <input type='file' accept="application/json" onChange={this.uploadJsonFile.bind(this)} />
                </>
                : '' }
            </span> 
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
                timeDigital={this.state.watchface.dialFace}
                onUpdateTimeDigital={this.onChangeTime}
              />
              <TimeAnalogComponent
                images={this.state.images} 
                dialface={this.state.watchface.dialFace}
                onUpdate={this.onChangeTime}
              />
              <DateComponent 
                  images={this.state.images} 
                  date={this.state.watchface.date}
                  onUpdateDate={this.onChangeDate}
              />
              <ActivityListComponent 
                  images={this.state.images} 
                  activity={this.state.watchface.activity}
                  onUpdateActivityList={this.onChangeActivity.bind(this)}
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
             width={Constant.width}
             height={Constant.height}/> : 
             ( this.state.tab === 1 ? 
            <ElementOrderComponent 
                watchface={this.state.watchface} 
                updateWatchface={this.onUpdateWatchface.bind(this)}
                />
              :
            <JsonComponent 
                watchface={this.state.watchface}
                jsonName={this.state.jsonName}
                />
              )
          }
          </Col>
        </Row>
      </Container>
    );
  }
}

