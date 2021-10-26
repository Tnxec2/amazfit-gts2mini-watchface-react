import { FC, useContext } from "react";
import { IWatchContext, WatchfaceContext } from "../context";
import DnDListComponent from "../shared/draganddroplist.component";
import { ElementOrderItem } from "../model/watchFace.model";

const ElementOrderComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  function onUpdateDateOrder(list: ElementOrderItem[]) {
    setWatchface({
      ...watchface,
      orderElements: { ...watchface.orderElements, orderElementsDate: list },
    });
  }
  return (
    <>
      <h2>order of date elements</h2>
      <DnDListComponent
        _list={watchface.orderElements.orderElementsDate}
        updateOrder={onUpdateDateOrder}
      />
    </>
  );
};

export default ElementOrderComponent;
