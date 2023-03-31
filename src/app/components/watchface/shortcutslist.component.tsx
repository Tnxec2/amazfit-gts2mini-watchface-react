import { FC, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import { JsonType, ShortcutType } from "../../model/types.gts2mini.model";
import { WatchShortcut } from "../../model/watchFace.gts2mini.model";
import ShortCutComponent from "./shortcut.component";


const ShortCutListComponent: FC = () => {
  const { watchface, setWatchface } =
  useContext<IWatchContext>(WatchfaceContext);
  const [selectedType, setSelectedType] = useState<string>(ShortcutType.Workout.json)

  function onUpdateShortcut(index: number, s: WatchShortcut) {
    const w = {...watchface};
    w.shortcuts.shortcuts[index] = {...s}
    setWatchface(w)
  }

  function onDelete(index: number) {
    if ( window.confirm('Would you delete shortcut ' + watchface.shortcuts.shortcuts[index].type)) {
      const w = {...watchface}
      w.shortcuts.shortcuts.splice(index, 1)
      setWatchface(w)
    }
  }

  function addShortcut() {
    const w = {...watchface}
    let shortcut = new WatchShortcut()
    shortcut.type = selectedType
    if (!w.shortcuts.shortcuts) w.shortcuts.shortcuts = []
    w.shortcuts.shortcuts.push(shortcut)
    w.shortcuts.collapsed = true
    setWatchface(w)
  }

  return (
    <Card className="activity w-100">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          let w = { ...watchface };
          w.shortcuts.collapsed = !w.shortcuts.collapsed;
          setWatchface(w);
        }}>
        Shortcuts
        <span className="d-flex flex-nowrap">
          <select className="form-select form-control-sm" 
            onChange={(e) => setSelectedType(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            value={selectedType}
            >
              {
                Object.keys(ShortcutType).map((key) => 
                ShortcutType[key] instanceof JsonType ?
                    <option key={ShortcutType[key].index} value={ShortcutType[key].json}>{ShortcutType[key].json}</option>
                    : ''
                )
              }
          </select>
          <button className="btn btn-outline-success btn-sm" type="button" onClick={addShortcut}>Add</button>
        </span>
      </Card.Header>
      {!watchface.shortcuts.collapsed ? (
        <Card.Body>
        { watchface.shortcuts.shortcuts.length > 0 ? watchface.shortcuts.shortcuts.map( (item, index ) => 
            <ShortCutComponent
              key={item.type}
              title={item.type}
              shortcut={item}
              onUpdate={(s) => onUpdateShortcut(index, s)}
              onDelete={() => onDelete(index)}
            />
            ) : 'no shortcuts added'
          }
          </Card.Body>
      ) : ''}
    </Card>
  );
};


export default ShortCutListComponent;
