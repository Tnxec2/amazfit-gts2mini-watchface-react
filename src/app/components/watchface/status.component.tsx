import { FC, useContext} from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { WatchStatus } from "../../model/watchFace.gts2mini.model";
import SwitchComponent from "./switch.component";

const StatusComponent: FC = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  function updateStatus(status: WatchStatus) {
    setWatchface({ ...watchface, status: status });
  }

  return (
    <Card>
      <Card.Header
        onClick={() => {
          const w = {...watchface}
          w.status.collapsed = !w.status.collapsed
          setWatchface(w)
        }}
      >
        Status
      </Card.Header>
      <Card.Body className={`${watchface.status.collapsed ? "collapse" : ""}`}>
        <SwitchComponent
          title="Bluetooth"
          sw={{...watchface.status.bluetooth}}
          onUpdate={(ic) => {
            const status: WatchStatus = {...watchface.status, bluetooth: ic}
            updateStatus(status)
          }}
        />
        <SwitchComponent
          title="Do Not Disturb"
          sw={{...watchface.status.doNotDisturb}}
          onUpdate={(ic) => {
            const status: WatchStatus = {...watchface.status, doNotDisturb: ic}
            updateStatus(status)
          }}
        />
        <SwitchComponent
          title="Alarm"
          sw={{...watchface.status.alarm}}
          onUpdate={(ic) => {
            const status: WatchStatus = {...watchface.status, alarm: ic}
            updateStatus(status)
          }}
        />
        <SwitchComponent
          title="Lock"
          sw={{...watchface.status.lock}}
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
