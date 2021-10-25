import { FC, useState } from "react";
import { Constant } from "../shared/constant";
import ElementOrderComponent from "./elementOrder.component";
import JsonComponent from "./json.component";
import PreviewComponent from "./preview.component";

const tabs = [
  { id: 0, name: "Preview" },
  { id: 1, name: "Element Order" },
  { id: 2, name: "Json" },
];

const RightSideComponent: FC = () => {
  const [tabRight, setTabRight] = useState<number>(0);

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => {
          return (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${tabRight === tab.id ? "active" : ""} `}
                onClick={() => setTabRight(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          );
        })}
      </ul>
      {tabRight === 0 ? (
        <PreviewComponent width={Constant.width} height={Constant.height} />
      ) : tabRight === 1 ? (
        <ElementOrderComponent />
      ) : (
        <JsonComponent />
      )}
    </div>
  );
};

export default RightSideComponent;
