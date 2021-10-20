import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { Digit, WatchDate } from "../model/watchFace.model";
import DigitComponent from "./digit.component";

const DateAODComponent = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateDay(d: Digit) {
    const date = {...watchface.aod.date};
    date.day = d;
    updateDate(date);
  }
  function updateMonth(d: Digit) {
    const date = {...watchface.aod.date};
    date.month = d;
    updateDate(date);
  }
  function updateMonthAsWord(d: Digit) {
    const date = {...watchface.aod.date};
    date.monthAsWord = d;
    updateDate(date);
  }
  function updateYear(d: Digit) {
    const date = {...watchface.aod.date};
    date.year = d;
    updateDate(date);
  }
  function updateWeekday(d: Digit) {
    const date = {...watchface.aod.date};
    date.weekDay = d;
    updateDate(date);
  }

  function copyDayFromNormal() {
    const date = {...watchface.aod.date}
    date.day = {...watchface.date.day}
    updateDate(date)
  }
  function copyMonthFromNormal() {
    const date = {...watchface.aod.date}
    date.month = {...watchface.date.month}
    updateDate(date)
  }
  function copyMonthAsWordFromNormal() {
    const date = {...watchface.aod.date}
    date.monthAsWord = {...watchface.date.monthAsWord}
    updateDate(date)
  }
  function copyYearFromNormal() {
    const date = {...watchface.aod.date}
    date.year = {...watchface.date.year}
    updateDate(date)
  }
  function copyWeekdayFromNormal() {
    const date = {...watchface.aod.date}
    date.weekDay = {...watchface.date.weekDay}
    updateDate(date)
  }

  function updateDate(wdf: WatchDate) {
    setWatchface({ ...watchface, aod: {...watchface.aod, date: wdf} });
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
            digit={watchface.aod.date.day}
            onUpdate={updateDay}
            onCopyFromNormal={copyDayFromNormal}
          />
          <DigitComponent
            title="Month"
            digit={watchface.aod.date.month}
            onUpdate={updateMonth}
            onCopyFromNormal={copyMonthFromNormal}
          />
          <DigitComponent
            title="Month as word"
            digit={watchface.aod.date.monthAsWord}
            onUpdate={updateMonthAsWord}
            paddingZeroFix={true}
            onCopyFromNormal={copyMonthAsWordFromNormal}
          />
          <DigitComponent
            title="Year"
            digit={watchface.aod.date.year}
            onUpdate={updateYear}
            onCopyFromNormal={copyYearFromNormal}
          />
          <DigitComponent
            title="Weekday"
            digit={watchface.aod.date.weekDay}
            onUpdate={updateWeekday}
            paddingZeroFix={true}
            onCopyFromNormal={copyWeekdayFromNormal}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default DateAODComponent;
