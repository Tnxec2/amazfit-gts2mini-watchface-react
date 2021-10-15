import React from 'react';
import { Card } from 'react-bootstrap';

import { WatchActivityList } from '../model/watchFace.model';
import ActivityComponent from './activity.component';

interface IProps {
  images: HTMLImageElement[],
  activity: WatchActivityList,
  onUpdateActivityList(activityList: WatchActivityList): void,
}

interface IState {
  collapsed: boolean
}

export default class ActivityListComponent extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)

    this.state = {
      collapsed: true
    }

    this.updateActivityList = this.updateActivityList.bind(this)
  }
  
  updateActivityList(a: WatchActivityList) {
    this.props.onUpdateActivityList(a)
  }

  render() {
    return (
      <Card>
        <Card.Header 
         onClick={() => {this.setState({collapsed: !this.state.collapsed})}}
         >
           Activity</Card.Header>
          { !this.state.collapsed ? 
        <Card.Body>
          <ActivityComponent
            title='Battery'
            images={this.props.images}
            activity={this.props.activity.battery}
            onUpdateActivity={(a) => {const l = this.props.activity; l.battery = a; this.updateActivityList(l)}}
            showNoData={true}  
          >
          </ActivityComponent>
          <ActivityComponent
            title='Steps'
            images={this.props.images}
            activity={this.props.activity.steps}
            onUpdateActivity={(a) => {const l = this.props.activity; l.steps = a; this.updateActivityList(l)}}
            showNoData={true}  
          >
          </ActivityComponent>
          <ActivityComponent
            title='Calories'
            images={this.props.images}
            activity={this.props.activity.calories}
            onUpdateActivity={(a) => {const l = this.props.activity; l.calories = a; this.updateActivityList(l)}}
            showNoData={true}  
          >
          </ActivityComponent>
          <ActivityComponent
            title='HearthRate'
            images={this.props.images}
            activity={this.props.activity.heartRate}
            onUpdateActivity={(a) => {const l = this.props.activity; l.heartRate = a; this.updateActivityList(l)}}
            showNoData={true}  
          >
          </ActivityComponent>
          <ActivityComponent
            title='PAI'
            images={this.props.images}
            activity={this.props.activity.pai}
            onUpdateActivity={(a) => {const l = this.props.activity; l.pai = a; this.updateActivityList(l)}}
            showNoData={true}  
          >
          </ActivityComponent>
          <ActivityComponent
            title='Distance'
            images={this.props.images}
            activity={this.props.activity.distance}
            onUpdateActivity={(a) => {const l = this.props.activity; l.distance = a; this.updateActivityList(l)}}
            showDecimalPointer={true} 
            showNoData={true}  
            showProgress={false}
          >
          </ActivityComponent>
          <ActivityComponent
            title='StandUp'
            images={this.props.images}
            activity={this.props.activity.standUp}
            onUpdateActivity={(a) => {const l = this.props.activity; l.standUp = a; this.updateActivityList(l)}}
            showNoData={true}  
          >
          </ActivityComponent>
          <ActivityComponent
            title='Weather'
            images={this.props.images}
            activity={this.props.activity.weather}
            onUpdateActivity={(a) => {const l = this.props.activity; l.weather = a; this.updateActivityList(l)}}
            showDelimiter={true} 
            showNoData={true}  
          >
          </ActivityComponent>
        </Card.Body>
     : ''}
      </Card>
    );
  }
}

