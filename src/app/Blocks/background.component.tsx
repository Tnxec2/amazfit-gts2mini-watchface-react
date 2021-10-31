import React, { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../context";
import SelectFileListComponent from "../shared/selectFileList.component";

const BackgroundComponent: FC = () => {
  const { watchface, setWatchface }  = useContext<IWatchContext>(WatchfaceContext)

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
          let w = {...watchface};
          w.background.collapsed = !w.background.collapsed;
          setWatchface(w);
        }}
      >
        Background
      </Card.Header>
      {!watchface.background.collapsed ? (
        <Card.Body>
          <div className="input-group input-group-sm mb-1 flex-nowrap">
            <SelectFileListComponent
              title='Preview'
              setSelectedFileIndex={onChangeBackgroundPreviewImage}
              imageIndex={watchface.background.previewIndex}
            />
            <SelectFileListComponent
              title='Background'
              setSelectedFileIndex={onChangeBackgroundImageIndex}
              imageIndex={watchface.background.imageIndex}
            />
          </div>
          <div className="input-group input-group-sm flex-nowrap">
            <span className="input-group-text">Color</span>
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
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default BackgroundComponent;
