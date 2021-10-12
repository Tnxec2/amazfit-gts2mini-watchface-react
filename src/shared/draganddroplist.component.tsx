import React from "react";
import { ElementOrderItem } from "../app/model/watchFace.model";
import './draganddroplist.css'

interface IProps {
    list: any[],
    updateOrder(list: ElementOrderItem[])
}

interface IState {
    list: ElementOrderItem[]
    dragAndDrop: any
}

const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
   }

export default class DnDListComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        
        this.state =  {
            list: this.props.list,
            dragAndDrop: initialDnDState
        }

        this.onDragStart = this.onDragStart.bind(this)
    }

    // onDragStart fires when an element
    // starts being dragged
    onDragStart(event) {
        const initialPosition = Number(event.currentTarget.dataset.position);
        
        this.setState({ dragAndDrop: {
        ...this.state.dragAndDrop,
        draggedFrom: initialPosition,
        isDragging: true,
        originalOrder: this.state.list
        }});
        
        
        // Note: this is only for Firefox.
        // Without it, the DnD won't work.
        // But we are not using it.
        event.dataTransfer.setData("text/html", '');
    }

    // onDragOver fires when an element being dragged
    // enters a droppable area.
    // In this case, any of the items on the list
    onDragOver(event) {
  
        // in order for the onDrop
        // event to fire, we have
        // to cancel out this one
        event.preventDefault();
        
        let newList = this.state.dragAndDrop.originalOrder;
    
        // index of the item being dragged
        const draggedFrom = this.state.dragAndDrop.draggedFrom; 
    
        // index of the droppable area being hovered
        const draggedTo = Number(event.currentTarget.dataset.position); 
    
        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((item, index) => index !== draggedFrom);
    
        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];
        
        if (draggedTo !== this.state.dragAndDrop.draggedTo){
            this.setState({dragAndDrop:{
                ...this.state.dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo
            }})
            this.props.updateOrder(newList)
        }
    }

    onDrop(event) {
        this.setState({ list: this.state.dragAndDrop.updatedOrder});
        
        this.setState({ dragAndDrop: {
            ...this.state.dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        }});
    }

   onDragLeave() {
     this.setState({ dragAndDrop: {
     ...this.state.dragAndDrop,
     draggedTo: null
    }});
    }

    render() {


        return (
            <>
                <ul className="list-group droplist">
                    {this.state.list.map( (item, index) => {
                    return(
                    <li
                    key={index}
                    
                    data-position={index}
                    draggable
                    
                    onDragStart={this.onDragStart.bind(this)}
                    onDragOver={this.onDragOver.bind(this)}
                    onDrop={this.onDrop.bind(this)}
                    
                    onDragLeave={this.onDragLeave.bind(this)}
                    
                    className={`list-group-item ${this.state.dragAndDrop && this.state.dragAndDrop.draggedTo=== Number(index) ? "dropArea" : ""}`}
                    >
                        {item.title}
                    </li>
                    )
                    })}
                </ul>
            </>
        )
    }
}
