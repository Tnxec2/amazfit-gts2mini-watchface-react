import { FC, useState } from "react";
import JsonComponent from "./json.gts2mini.component";
import PreviewComponent from "./preview.component";
import SettingsComponent from "./settings.component";
import UploadedImagesomponent from "./uploadedImages.component";

const tabs = [
  { id: 0, name: "Preview", el: <PreviewComponent /> },
  { id: 1, name: "Uploaded Images", el:  <UploadedImagesomponent />},
  { id: 2, name: "Json", el: <JsonComponent /> },
  { id: 3, name: "Settings", el: <SettingsComponent /> },
];

const RightSideComponent: FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => {
          return (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${selectedTab === tab.id ? "active" : ""} `}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          );
        })}
      </ul>
      { tabs[selectedTab].el }
    </div>
  );
};

export default RightSideComponent;
