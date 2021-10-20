import React, { FC, ReactElement, useContext, useState } from "react";
import { Constant } from "../app/model/constant";
import { IWatchContext, WatchfaceContext } from "../context";
import "./selectFileList.css";
interface IProps {
  imageIndex: number;
  setSelectedFileIndex(id: number): void;
}

const SelectFileListComponent: FC<IProps> = ({
  imageIndex,
  setSelectedFileIndex,
}) => {
  const { images } = useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function onFileSelected(id: number) {
    setSelectedFileIndex(id);
    setCollapsed(true);
  }

  function onRemove() {
    onFileSelected(null);
  }

  const options: ReactElement[] = [];

  options.push(
    <option key={"None"} value={"None"}>
      {" "}
    </option>
  );

  if (images) {
    for (var i = 0; i < images.length; i++) {
      let img = images[i];

      options.push(
        <li
          key={img.id}
          value={img.id}
          className="list-group-item fileitem"
          onClick={() => onFileSelected(img.id)}
        >
          {<img src={img.image.src} alt={img.name} width={30} />}
          {img.name}
        </li>
      );
    }
  }

  return (
    <>
      <div className="input-group-text dropdown">
        <div>
          {imageIndex !== null &&
          imageIndex !== undefined &&
          images[imageIndex - Constant.startImageIndex]
            ? images[imageIndex - Constant.startImageIndex].name
            : "None"}
        </div>
        {collapsed ? (
          ""
        ) : (
          <ul className="list-group dropdown-content">{options}</ul>
        )}
      </div>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
        disabled={!images || images.length === 0}
      >
        +
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={onRemove}
        disabled={!imageIndex}
      >
        x
      </button>
    </>
  );
};

export default SelectFileListComponent;
