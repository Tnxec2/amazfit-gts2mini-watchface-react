import { FC, useContext, useState } from "react";
import { WatchfaceContext } from "../../context";
import AodComponent from "../watchface/aod.component";
import ScreenNormalcomponent from "../watchface/screennormal.component";
import PreviewStatesComponent from "./previewstates.component";

const tabs = [
  {
    id: 0, name: "Screen normal", el: <div className="mt-3 blocks">
      <ScreenNormalcomponent />
    </div>
  },
  {
    id: 1, name: "AOD", el: <div className="mt-3 blocks">
      <AodComponent />
    </div>
  },
  {
    id: 2, name: "Preview State", el: <div className="mt-3">
      <PreviewStatesComponent />
    </div>
  },
];

const LeftSideComponent: FC = () => {

  const { setPreviewScreenNormal, device } = useContext(WatchfaceContext)

  const [selectedTab, setSelectedTab] = useState<number>(0);



  function onclick(tabid: number) {
    setSelectedTab(tabid)
    if (tabid === 0) setPreviewScreenNormal(true)
    if (tabid === 1) setPreviewScreenNormal(false)
  }
  
  return (
    <div>
      <ul className="nav nav-tabs">
      <span className="navbar-brand mb-0 h1">
        {device.title}
      </span>
        {tabs.map((tab) => {
          return (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${selectedTab === tab.id ? "active" : ""} `}
                onClick={() => onclick(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          );
        })}
      </ul>
      {tabs[selectedTab].el}
    </div>
  );
};

export default LeftSideComponent;
