import React, { FC, Fragment, ReactElement, useContext, useMemo, useState } from "react";
import { IWatchContext, WatchfaceContext } from "../context";
import "./selectFileList.css";
interface IProps {
  title: string,
  value: number;
  onChange(id: number): void;
  hint?: string;
  warning?: boolean;
}

const SelectFileListComponent: FC<IProps> = ({
  title,
  value: imageIndex,
  onChange,
  hint,
  warning
}) => {
  const { images } = useContext<IWatchContext>(WatchfaceContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const imageIndexReal = useMemo<string>(() => {

    if (imageIndex !== null && imageIndex !== undefined) {
      var ix = images.find(it => {
        return it.id === imageIndex
      })
      return ix ? ix.name : "None"
    } else {
      return "None"
    }
  
  },[images, imageIndex])

  function onFileSelected(id: number) {
    onChange(id);
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
      <span className="input-group-text" title={hint}>
        { warning && '⚠' }
        {title.split('\n').map((str, index) => <Fragment key={index}>{str}<br/></Fragment>)}
      </span>
      
      <div className="input-group-text dropdown">
        <div>
          {imageIndexReal}
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
        title={!images || images.length === 0 ? 'load images first' : 'select start image'}
      >
        + 
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={onRemove}
        disabled={!(imageIndex >= 0)}
        title='clear selection'
      >
        x
      </button>
      
    </>
  );
};

export default SelectFileListComponent;
