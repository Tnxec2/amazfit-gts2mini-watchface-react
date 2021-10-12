import React from 'react';
import DnDListComponent from '../../shared/draganddroplist.component';
import Watchface, { ElementOrderItem } from '../model/watchFace.model';
import './preview.css';

interface IProps {
    watchface: Watchface,
    updateWatchface(watchface: Watchface)
}

interface IState {

}

export default class ElementOrderComponent extends React.Component<IProps, IState> {


    constructor(props) {
        super(props)

        this.state = {
        }
    }

    onUpdateTimeOrder(list: ElementOrderItem[]) {
        const w = this.props.watchface
        w.orderElements.orderElementsTime = list
        this.props.updateWatchface(w)
    }

    onUpdateDateOrder(list: ElementOrderItem[]) {
        const w = this.props.watchface
        w.orderElements.orderElementsDate = list
        this.props.updateWatchface(w)
    }

    render() {
        return (
            <>
            <h2>order of time elements</h2>
             <DnDListComponent 
                list={this.props.watchface.orderElements.orderElementsTime}
                updateOrder={this.onUpdateTimeOrder.bind(this)} />
            <h2>order of date elements</h2>
             <DnDListComponent 
             list={this.props.watchface.orderElements.orderElementsDate} 
             updateOrder={this.onUpdateDateOrder.bind(this)} />
            </>
        )
    }
}