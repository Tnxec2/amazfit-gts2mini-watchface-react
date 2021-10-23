import React, { FC, useState } from "react";
import { ElementOrderItem } from "../model/watchFace.model";
import "./draganddroplist.css";

interface IProps {
  _list: any[];
  updateOrder(list: ElementOrderItem[]);
}

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const DnDListComponent: FC<IProps> = ({ _list, updateOrder }) => {
  const [list, setList] = useState<ElementOrderItem[]>(_list);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  // onDragStart fires when an element
  // starts being dragged
  function onDragStart(event) {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", "");
  }

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  function onDragOver(event) {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
      updateOrder(newList);
    }
  }

  function onDrop(event) {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  }

  function onDragLeave() {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  }

  return (
    <>
      <ul className="list-group droplist">
        {list.map((item, index) => {
          return (
            <li
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              className={`list-group-item ${
                dragAndDrop && dragAndDrop.draggedTo === Number(index)
                  ? "dropArea"
                  : ""
              }`}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DnDListComponent;
