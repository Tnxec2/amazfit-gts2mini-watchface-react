import { FC, useContext, useState } from "react";
import { WatchfaceContext } from "../context";
import ScreenNormalcomponent from "./screennormal.component";
import PreviewStatesComponent from "./previewstates.component";
import AodComponent from "./aod.component";
import WidgetsComponent from "./widgets.component";

const tabs = [
  { id: 0, name: "Screen normal" },
  { id: 1, name: "AOD" },
  { id: 2, name: "Widgets" },
  { id: 3, name: "Preview State" },
];

const LeftSideComponent: FC = () => {

  const { setPreviewScreenNormal } = useContext(WatchfaceContext)

  const [tabLeft, setTabLeft] = useState<number>(0);

  function onclick(tabid: number) {
    setTabLeft(tabid)
    if (tabid === 1) setPreviewScreenNormal(false)
    if (tabid === 0) setPreviewScreenNormal(true)
  }
  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => {
          return (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${tabLeft === tab.id ? "active" : ""} `}
                onClick={() => onclick(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          );
        })}
      </ul>
      {tabLeft === 0 ? (
        <div className="mt-3 blocks">
          <ScreenNormalcomponent />
        </div>
      ) : tabLeft === 1 ? (
        <div className="mt-3 blocks">
          <AodComponent />
        </div>
      ) : tabLeft === 2 ? (
        <div className="mt-3 blocks">
          <WidgetsComponent />
        </div>
      ) : tabLeft === 3 ? (
        <div className="mt-3">
          <PreviewStatesComponent />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LeftSideComponent;
