import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import SelectFileListComponent from "../../shared/selectFileList.component";

const BackgroundComponent = () => {
  const { watchface, setWatchface } =
    useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function onChangeBackgroundPreviewImage(index: number) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, previewIndex: index },
    });
  }

  function onChangeBackgroundImageIndex(index: number) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, imageIndex: index },
    });
  }

  function onChangeBackgroundColor(e: React.ChangeEvent<any>) {
    setWatchface({
      ...watchface,
      background: { ...watchface.background, color: e.target.value },
    });
  }

  return (
    <Card>
      <Card.Header
        className="clickable"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        Background
      </Card.Header>
      {!collapsed ? (
        <Card.Body>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">PreviewImage</span>
            <SelectFileListComponent
              setSelectedFileIndex={onChangeBackgroundPreviewImage}
              imageIndex={watchface.background.previewIndex}
            />
            <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent
              setSelectedFileIndex={onChangeBackgroundImageIndex}
              imageIndex={watchface.background.imageIndex}
            />
            <span className="input-group-text">Color</span>
            <div className="input-group-text">
              <input
                type="color"
                className="form-control form-control-sm"
                style={{ width: 40 }}
                onChange={onChangeBackgroundColor}
                id="colorBackground"
                value={watchface.background.color}
                title="Choose background color"
              />
            </div>
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default BackgroundComponent;
