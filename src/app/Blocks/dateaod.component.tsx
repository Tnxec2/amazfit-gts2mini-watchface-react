import { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchCommonDigit, WatchDate } from "../model/watchFace.model";
import ImageDigitComponent from "./imageDigit.component";

const DateAODComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateDay(d: WatchCommonDigit) {
    const date = {...watchface.aod.date};
    date.day = d;
    updateDate(date);
  }
  function updateMonth(d: WatchCommonDigit) {
    const date = {...watchface.aod.date};
    date.month = d;
    updateDate(date);
  }
  function updateMonthAsWord(d: WatchCommonDigit) {
    const date = {...watchface.aod.date};
    date.monthAsWord = d;
    updateDate(date);
  }
  function updateYear(d: WatchCommonDigit) {
    const date = {...watchface.aod.date};
    date.year = d;
    updateDate(date);
  }
  function updateWeekday(d: WatchCommonDigit) {
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
          <ImageDigitComponent
            title="Day"
            digit={watchface.aod.date.day}
            onUpdate={updateDay}
            onCopyFromNormal={copyDayFromNormal}
          />
          <ImageDigitComponent
            title="Month"
            digit={watchface.aod.date.month}
            onUpdate={updateMonth}
            onCopyFromNormal={copyMonthFromNormal}
          />
          <ImageDigitComponent
            title="Month as word"
            digit={watchface.aod.date.monthAsWord}
            onUpdate={updateMonthAsWord}
            paddingZeroFix={true}
            onCopyFromNormal={copyMonthAsWordFromNormal}
          />
          <ImageDigitComponent
            title="Year"
            digit={watchface.aod.date.year}
            onUpdate={updateYear}
            onCopyFromNormal={copyYearFromNormal}
          />
          <ImageDigitComponent
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
