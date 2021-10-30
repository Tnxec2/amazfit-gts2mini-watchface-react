import { FC, useContext } from "react";
import { IWatchContext, WatchfaceContext } from "../context";
import { ElementOrderItem } from "../model/watchFace.model";
import DnDListComponent, { IDNDItem } from "../shared/draganddroplist.component";

const ElementOrderComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  function onUpdateDateOrder(list: IDNDItem<ElementOrderItem>[]) {
    setWatchface({
      ...watchface,
      orderElements: { ...watchface.orderElements, orderElementsDate: list.map((value) => value.item) },
    });
  }
  return (
    <>
      <h2>order of date elements</h2>
      <DnDListComponent
        _list={watchface.orderElements.orderElementsDate.map((value) => ({ item: value, reactItem: value.title}) )}
        updateOrder={onUpdateDateOrder}
      />
    </>
  );
};

export default ElementOrderComponent;
