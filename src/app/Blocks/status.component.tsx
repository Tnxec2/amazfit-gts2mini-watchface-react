import { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import { WatchStatus } from "../model/watchFace.model";
import ImageCoordsComponent from "./imageCoords.component";

const StatusComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function updateStatus(status: WatchStatus) {
    setWatchface({ ...watchface, status: status });
  }

  return (
    <Card>
      <Card.Header
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        Status
      </Card.Header>
      <Card.Body className={`${collapsed ? "collapse" : ""}`}>
        <ImageCoordsComponent
          title="Bluetooth"
          imageCoords={watchface.status.bluetooth}
          onUpdate={(ic) => {
            const status: WatchStatus = {...watchface.status, bluetooth: ic}
            updateStatus(status)
          }}
        />
        <ImageCoordsComponent
          title="Do Not Disturb"
          imageCoords={watchface.status.dnd}
          onUpdate={(ic) => {
            const status: WatchStatus = {...watchface.status, dnd: ic}
            updateStatus(status)
          }}
        />
        <ImageCoordsComponent
          title="Alarm"
          imageCoords={watchface.status.alarm}
          onUpdate={(ic) => {
            const status: WatchStatus = {...watchface.status, alarm: ic}
            updateStatus(status)
          }}
        />
        <ImageCoordsComponent
          title="Lock"
          imageCoords={watchface.status.lock}
          onUpdate={(ic) => {
            const status: WatchStatus = {...watchface.status, lock: ic}
            updateStatus(status)
          }}
        />
      </Card.Body>
    </Card>
  );
};
export default StatusComponent;
