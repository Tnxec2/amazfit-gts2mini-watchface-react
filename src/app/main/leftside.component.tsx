import { useContext, useState } from "react";
import { WatchfaceContext } from "../../context";
import Blocks from "./screennormal.component";
import PreviewStatesComponent from "./previewstates.component";
import AodComponent from "./aod.component";

const tabs = [
  { id: 0, name: "Screen normal" },
  { id: 1, name: "AOD" },
  { id: 2, name: "Preview State" },
];

const LeftSideComponent = () => {
  
  const {setPreviewScreenNormal} = useContext(WatchfaceContext)

  const [tabLeft, setTabLeft] = useState<number>(0);

  function onclick(tabid: number) {
    setTabLeft(tabid)
    if ( tabid === 1) setPreviewScreenNormal(false)
    if ( tabid === 0) setPreviewScreenNormal(true)
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
          <Blocks />
        </div>
      ) : tabLeft === 1 ? (
        <div className="mt-3">
          <AodComponent />
        </div>
      ) : tabLeft === 2 ? (
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
