import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchCommonDigit, WatchDate } from "../model/watchFace.model";
import ImageDigitComponent from "./imagedigit.component";

const DateComponent = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateDay(d: WatchCommonDigit) {
    const date = {...watchface.date};
    date.day = d;
    updateDate(date);
  }
  function updateMonth(d: WatchCommonDigit) {
    const date = {...watchface.date};
    date.month = d;
    updateDate(date);
  }
  function updateMonthAsWord(d: WatchCommonDigit) {
    const date = {...watchface.date};
    date.monthAsWord = d;
    updateDate(date);
  }
  function updateYear(d: WatchCommonDigit) {
    const date = {...watchface.date};
    date.year = d;
    updateDate(date);
  }
  function updateWeekday(d: WatchCommonDigit) {
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
          <ImageDigitComponent
            title="Day"
            digit={watchface.date.day}
            onUpdate={updateDay}
          />
          <ImageDigitComponent
            title="Month"
            digit={watchface.date.month}
            onUpdate={updateMonth}
          />
          <ImageDigitComponent
            title="Month as word"
            digit={watchface.date.monthAsWord}
            onUpdate={updateMonthAsWord}
            paddingZeroFix={true}
          />
          <ImageDigitComponent
            title="Year"
            digit={watchface.date.year}
            onUpdate={updateYear}
          />
          <ImageDigitComponent
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
