import { useContext } from "react";
import { IWatchContext, WatchfaceContext } from "../../context";
import DnDListComponent from "../../shared/draganddroplist.component";
import { ElementOrderItem } from "../model/watchFace.model";

const ElementOrderComponent = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  function onUpdateTimeOrder(list: ElementOrderItem[]) {
    setWatchface({
      ...watchface,
      orderElements: { ...watchface.orderElements, orderElementsTime: list },
    });
  }

  function onUpdateDateOrder(list: ElementOrderItem[]) {
    setWatchface({
      ...watchface,
      orderElements: { ...watchface.orderElements, orderElementsDate: list },
    });
  }
  return (
    <>
      <h2>order of time elements</h2>
      <DnDListComponent
        _list={watchface.orderElements.orderElementsTime}
        updateOrder={onUpdateTimeOrder}
      />
      <h2>order of date elements</h2>
      <DnDListComponent
        _list={watchface.orderElements.orderElementsDate}
        updateOrder={onUpdateDateOrder}
      />
    </>
  );
};

export default ElementOrderComponent;
