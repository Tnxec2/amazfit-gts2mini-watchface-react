import { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import { IWatchContext, WatchfaceContext } from "../../context";
import SelectFileListComponent from "../../shared/selectFileList.component";
import { Digit } from "../model/watchFace.model";

interface IProps {
  title: string;
  digit: Digit;
  onUpdate(digit: Digit): void;
  showNoData?: boolean;
  showDecimalPointer?: boolean;
  showDelimiter?: boolean;
  paddingZeroFix?: boolean;
  onCopyFromNormal?(): void
}

const DigitComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
  showNoData,
  showDecimalPointer,
  showDelimiter,
  paddingZeroFix,
  onCopyFromNormal
}) => {

  function onChangeImageIndex(index: number) {
    const d = {...digit};
    d.imageIndex = index;
    onUpdate(d);
  }

  function onChangeUnit(index: number) {
    const d = {...digit};
    d.unitImageIndex = index;
    onUpdate(d);
  }

  function onChangeX(e) {
    const d = {...digit};
    d.x = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeY(e) {
    const d = {...digit};
    d.y = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangePaddingZero(e) {
    const d = {...digit};
    d.paddingZero = !d.paddingZero;
    onUpdate(d);
  }

  function onChangeAlignment(e) {
    const d = {...digit};
    d.alignment = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeFollow(e) {
    const d = {...digit};
    d.follow = !d.follow;
    onUpdate(d);
  }

  function onChangeSpacing(e) {
    const d = {...digit};
    d.spacing = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeNoData(index: number) {
    const d = {...digit};
    d.noDataImageIndex = index;
    onUpdate(d);
  }

  function onChangeDelimiter(index: number) {
    const d = {...digit};
    d.delimiterImageIndex = index;
    onUpdate(d);
  }

  function onChangeDecimalPointer(index: number) {
    const d = {...digit};
    d.decimalPointImageIndex = index;
    onUpdate(d);
  }

  function onChangeSeparator(index: number) {
    const d = {...digit};
    d.separator.imageIndex = index;
    onUpdate(d);
  }

  function onChangeSeparatorX(e) {
    const d = {...digit};
    d.separator.x = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeSeparatorY(e) {
    const d = {...digit};
    d.separator.y = parseInt(e.target.value);
    onUpdate(d);
  }

  const x = digit.x ? digit.x : 0;
  const y = digit.y ? digit.y : 0;
  const separatorx = digit.separator.x ? digit.separator.x : 0;
  const separatory = digit.separator.y ? digit.separator.y : 0;
  const spacing = digit.spacing ? digit.spacing : 0;

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={digit.enabled}
              onChange={() => {
                const d = { ...digit };
                d.enabled = !d.enabled;
                onUpdate(d);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {digit.enabled ? (
        <Card.Body>
          { !onCopyFromNormal ? '' : <div style={{clear:'both'}}><button className='btn btn-sm btn-secondary mb-1' style={{float:'right'}} onClick={onCopyFromNormal}>Copy from normal screen</button></div> }
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text">ImageIndex</span>
            <SelectFileListComponent
              setSelectedFileIndex={onChangeImageIndex}
              imageIndex={digit.imageIndex}
            />
            <span className="input-group-text">count: {digit.imageCount}</span>
            <span className="input-group-text" id="addon-wrapping">
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={x}
              onChange={onChangeX}
            />
            <span className="input-group-text" id="addon-wrapping">
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={y}
              onChange={onChangeY}
            />
          </div>
          {!digit.displayFormAnalog ? (
            <div className="input-group input-group-sm">
              <span className="input-group-text">Unit</span>
              <SelectFileListComponent
                setSelectedFileIndex={onChangeUnit}
                imageIndex={digit.unitImageIndex}
              />
            </div>
          ) : (
            ""
          )}
          {showNoData ? (
            <div className="input-group input-group-sm">
              <span className="input-group-text">NoData</span>
              <SelectFileListComponent
                setSelectedFileIndex={onChangeNoData}
                imageIndex={digit.noDataImageIndex}
              />
            </div>
          ) : (
            ""
          )}
          {showDelimiter ? (
            <div className="input-group input-group-sm">
              <span className="input-group-text">Minus</span>
              <SelectFileListComponent
                setSelectedFileIndex={onChangeDelimiter}
                imageIndex={digit.delimiterImageIndex}
              />
            </div>
          ) : (
            ""
          )}
          {showDecimalPointer ? (
            <div className="input-group input-group-sm">
              <span className="input-group-text">Decimal pointer</span>
              <SelectFileListComponent
                setSelectedFileIndex={onChangeDecimalPointer}
                imageIndex={digit.decimalPointImageIndex}
              />
            </div>
          ) : (
            ""
          )}
          {!digit.displayFormAnalog ? (
            <>
              <div className="input-group input-group-sm flex-nowrap mb-1">
                <span className="input-group-text" id="addon-wrapping">
                  padding zero
                </span>
                <div className="input-group-text">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    disabled={paddingZeroFix}
                    checked={digit.paddingZero || paddingZeroFix}
                    onChange={onChangePaddingZero}
                  />
                </div>
                <span className="input-group-text" id="addon-wrapping">
                  spacing
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={spacing}
                  onChange={onChangeSpacing}
                />
                <span className="input-group-text" id="addon-wrapping">
                  follow
                </span>
                <div className="input-group-text">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    checked={digit.follow}
                    onChange={onChangeFollow}
                  />
                </div>
                <span className="input-group-text" id="addon-wrapping">
                  alignment
                </span>
                <div className="input-group-text">
                  <select
                    className="form-select form-select-sm"
                    onChange={onChangeAlignment}
                  >
                    <option value="0" selected={digit.alignment === 0}>
                      Left
                    </option>
                    <option value="1" selected={digit.alignment === 1}>
                      Center
                    </option>
                    <option value="2" selected={digit.alignment === 2}>
                      Right
                    </option>
                  </select>
                </div>
              </div>

              <div className="input-group input-group-sm">
                <span className="input-group-text">Separator</span>
                <SelectFileListComponent
                  setSelectedFileIndex={onChangeSeparator}
                  imageIndex={digit.separator.imageIndex}
                />
                <span className="input-group-text" id="addon-wrapping">
                  X
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={separatorx}
                  onChange={onChangeSeparatorX}
                />
                <span className="input-group-text" id="addon-wrapping">
                  Y
                </span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={separatory}
                  onChange={onChangeSeparatorY}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default DigitComponent;
