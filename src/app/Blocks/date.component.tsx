import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { Digit, WatchDate } from "../model/watchFace.model";
import DigitComponent from "./digit.component";

const DateComponent = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateDay(d: Digit) {
    const date = {...watchface.date};
    date.day = d;
    updateDate(date);
  }
  function updateMonth(d: Digit) {
    const date = {...watchface.date};
    date.month = d;
    updateDate(date);
  }
  function updateMonthAsWord(d: Digit) {
    const date = {...watchface.date};
    date.monthAsWord = d;
    updateDate(date);
  }
  function updateYear(d: Digit) {
    const date = {...watchface.date};
    date.year = d;
    updateDate(date);
  }
  function updateWeekday(d: Digit) {
    const date = {...watchface.date};
    date.weekDay = d;
    updateDate(date);
  }

  function updateDate(wdf: WatchDate) {
    setWatchface({ ...watchface, date: wdf });
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
          <DigitComponent
            title="Day"
            digit={watchface.date.day}
            onUpdate={updateDay}
          />
          <DigitComponent
            title="Month"
            digit={watchface.date.month}
            onUpdate={updateMonth}
          />
          <DigitComponent
            title="Month as word"
            digit={watchface.date.monthAsWord}
            onUpdate={updateMonthAsWord}
            paddingZeroFix={true}
          />
          <DigitComponent
            title="Year"
            digit={watchface.date.year}
            onUpdate={updateYear}
          />
          <DigitComponent
            title="Weekday"
            digit={watchface.date.weekDay}
            onUpdate={updateWeekday}
            paddingZeroFix={true}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default DateComponent;
