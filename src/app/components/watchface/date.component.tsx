import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import { ElementOrderItem, WatchCommonDigit, WatchDate } from "../../model/watchFace.model";
import DnDListComponent, { IDNDItem } from "../../shared/draganddroplist.component";
import ImageDigitComponent from "./imageDigit.component";
import SystemFontComponent from "./systemFont.component";
import SystemFontCircleComponent from "./systemFontCircle.component";

interface IProps {
  date: WatchDate,
  onUpdate(date: WatchDate): void,
  collapsed: boolean,
  setCollapsed(collapsed: boolean): void,
}

const DateComponent: FC<IProps> = ({ date, onUpdate, collapsed, setCollapsed }) => {

  const [collapsedOrderElement, setCollapsedOrderelement] = useState<boolean>(true)

  function updateDay(d: WatchCommonDigit) {
    const _date = { ...date };
    _date.day = d;
    onUpdate(_date);
  }
  function updateMonth(d: WatchCommonDigit) {
    const _date = { ...date };
    _date.month = d;
    onUpdate(_date);
  }
  function updateMonthAsWord(d: WatchCommonDigit) {
    const _date = { ...date };
    _date.monthAsWord = d;
    onUpdate(_date);
  }
  function updateYear(d: WatchCommonDigit) {
    const _date = { ...date };
    _date.year = d;
    onUpdate(_date);
  }
  function updateWeekday(d: WatchCommonDigit) {
    const _date = { ...date };
    _date.weekDay = d;
    onUpdate(_date);
  }

  function ononUpdateOrder(list: IDNDItem<ElementOrderItem>[]) {
    const _date = { ...date };
    _date.orderElements = list.map((item) => item.item)
    onUpdate(_date)
  }

  return (
    <>
      <Card>
        <Card.Header
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          Date
        </Card.Header>
        <Card.Body className={`${collapsed ? "collapse" : ""}`}>

          <Card className='mb-1'>
            <Card.Header
                      onClick={() => {
                        setCollapsedOrderelement(!collapsedOrderElement);
                      }}>
              Order of date elements
            </Card.Header>
              { !collapsedOrderElement ? 
            <Card.Body>
              <DnDListComponent
                _list={date.orderElements.map((value) => ({ item: value, reactItem: value.title }))}
                updateOrder={ononUpdateOrder} />
            </Card.Body>
               : '' }
          </Card>

          <ImageDigitComponent
            title="Day Digit"
            digit={date.day}
            onUpdate={updateDay}
          />
          <SystemFontComponent
            title="Day Systemfont Rotated"
            digit={date.day}
            onUpdate={updateDay}
          />
          <SystemFontCircleComponent
            title="Day Systemfont Circle"
            digit={date.day}
            onUpdate={updateDay}
          />

          <ImageDigitComponent
            title="Month"
            digit={date.month}
            onUpdate={updateMonth}
          />
          <SystemFontComponent
            title="Month Systemfont Rotated"
            digit={date.month}
            onUpdate={updateMonth}
          />
          <SystemFontCircleComponent
            title="Month Systemfont Circle"
            digit={date.month}
            onUpdate={updateMonth}
          />
          <ImageDigitComponent
            title="Month as word"
            digit={date.monthAsWord}
            onUpdate={updateMonthAsWord}
            paddingZeroFix={true}
          />
          <ImageDigitComponent
            title="Year"
            digit={date.year}
            onUpdate={updateYear}
          />
          <SystemFontComponent
            title="Year Systemfont Rotated"
            digit={date.year}
            onUpdate={updateYear}
          />
          <SystemFontCircleComponent
            title="Year Systemfont Circle"
            digit={date.year}
            onUpdate={updateYear}
          />
          <ImageDigitComponent
            title="Weekday"
            digit={date.weekDay}
            onUpdate={updateWeekday}
            paddingZeroFix={true}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default DateComponent;
