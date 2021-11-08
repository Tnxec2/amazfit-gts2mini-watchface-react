import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import AirQualityComponent from "./airquality.component";
import HumidityComponent from "./humidity.component";
import UvIndexComponent from "./uvindex.component";

const WeatherExtendedComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.weatherext.collapsed = !w.weatherext.collapsed;
          setWatchface(w);
        }}>
        Weather Additional
      </Card.Header>
      {!watchface.weatherext.collapsed ? (
        <Card.Body>
          <AirQualityComponent />
          <HumidityComponent />
          <UvIndexComponent />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};


export default WeatherExtendedComponent;
