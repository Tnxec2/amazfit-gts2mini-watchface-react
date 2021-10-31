import { ChangeEvent, FC } from "react";
import { Card } from "react-bootstrap";
import { Coordinates, ImageCoord, SystemFont } from "../model/json.model";
import { AlignmentType, FollowType } from "../model/types.model";
import { WatchCommonDigit } from "../model/watchFace.model";
import Color from "../shared/color";

interface IProps {
  title: string;
  digit: WatchCommonDigit;
  onUpdate(digit: WatchCommonDigit): void;
  showNoData?: boolean;
  showDecimalPointer?: boolean;
  showDelimiter?: boolean;
  paddingZeroFix?: boolean;
  followDisabled?: boolean;
  onCopyFromNormal?(): void
}

const SystemFontComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
  paddingZeroFix,
  onCopyFromNormal,
  followDisabled
}) => {

  function onChangeX(e) {
    const d = {...digit};
    d.json.Digit.SystemFont.Coordinates.X = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeY(e) {
    const d = {...digit};
    d.json.Digit.SystemFont.Coordinates.Y = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangePaddingZero(e) {
    const d = {...digit};
    d.json.Digit.PaddingZero = !d.json.Digit.PaddingZero;
    onUpdate(d);
  }

  function onChangeAlignment(e) {
    const d = {...digit};
    d.json.Digit.Alignment = AlignmentType.toJson(parseInt(e.target.value));
    onUpdate(d);
  }

  function onChangeFollow(e) {
    const d = {...digit};
    d.json.CombingMode = d.json.CombingMode !== FollowType.Single.json ? FollowType.Single.json : FollowType.Follow.json;
    onUpdate(d);
  }

  function onChangeSpacing(e) {
    const d = {...digit};
    d.json.Digit.Spacing = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeSize(e) {
    const d = {...digit};
    d.json.Digit.SystemFont.Size = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeAngle(e) {
    const d = {...digit};
    d.json.Digit.SystemFont.Angle = parseInt(e.target.value);
    onUpdate(d);
  }

  function onChangeSeparator() {
    const d = {...digit};
    if ( d.json.Separator) 
      d.json.Separator = null
    else {
      d.json.Separator = new ImageCoord()
      d.json.Separator.Coordinates.X = -1
      d.json.Separator.Coordinates.Y = -1
    }
    onUpdate(d);
  }

  function onChangeUnitCheck(e: ChangeEvent<HTMLSelectElement>) {
    const d = {...digit};
    d.json.Digit.SystemFont.ShowUnitCheck = parseInt(e.target.value);
    onUpdate(d);
  }
 

  return (
    <Card>
      <Card.Header>
        <div className="input-group input-group-sm">
          <span className="input-group-text">{title}</span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={digit.enabledSystemFont}
              onChange={() => {
                const d = { ...digit };
                d.enabledSystemFont = !d.enabledSystemFont;
                d.enabled = d.enabledImage || d.enabledSystemFont
                if ( !d.json.Digit.SystemFont) {
                  d.json.Digit.SystemFont = new SystemFont()
                  d.json.Digit.SystemFont.Coordinates = new Coordinates()
                }
                onUpdate(d);
              }}
            />
          </div>
        </div>
      </Card.Header>
      {digit.enabledSystemFont ? (
        <Card.Body>
          { !onCopyFromNormal ? '' : <div style={{clear:'both'}}><button className='btn btn-sm btn-secondary mb-1' style={{float:'right'}} onClick={onCopyFromNormal}>Copy from normal screen</button></div> }
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text" >
              X
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={digit.json.Digit?.SystemFont?.Coordinates?.X ? digit.json.Digit.SystemFont.Coordinates.X : 0}
              onChange={onChangeX}
            />
            <span className="input-group-text" >
              Y
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={digit.json.Digit?.SystemFont?.Coordinates?.Y ? digit.json.Digit.SystemFont.Coordinates.Y : 0}
              onChange={onChangeY}
            />
            <span className="input-group-text">Color</span>
            <input
              type="color"
              className="form-control form-control-sm"
              style={{ width: 40 }}
              value={digit.json.Digit.SystemFont.Color ? Color.colorRead(digit.json.Digit.SystemFont.Color): '#000000'}
              onChange={(e) => {
                const d = { ...digit };
                d.json.Digit.SystemFont.Color = Color.colorWrite(e.target.value);
                onUpdate(d);
              }}
              defaultValue="#000000"
              title="Choose font color"
            />


          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text" >
              size
            </span>
            <input
              type="number"
              min="0" max="100"
              className="form-control form-control-sm"
              value={digit.json.Digit?.SystemFont?.Size ? digit.json.Digit.SystemFont.Size : 0}
              onChange={onChangeSize}
            />
            <span className="input-group-text" >
              angle
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={digit.json.Digit?.SystemFont?.Angle ? digit.json.Digit.SystemFont.Angle : 0}
              onChange={onChangeAngle}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text" >
              padding zero
            </span>
            <div className="input-group-text">
              <input
                className="form-check-input"
                type="checkbox"
                disabled={paddingZeroFix}
                checked={digit.json?.Digit?.PaddingZero || paddingZeroFix}
                onChange={onChangePaddingZero}
              />
            </div>
            <span className="input-group-text" >
              spacing
            </span>
            <input
              type="number"
              className="form-control form-control-sm"
              value={digit.json?.Digit?.Spacing ? digit.json.Digit.Spacing : 0}
              onChange={onChangeSpacing}
            />
          </div>
          <div className="input-group input-group-sm mb-1">
            <span className="input-group-text" >
              follow
            </span>
            <div className="input-group-text">
              <input
                className="form-check-input"
                type="checkbox"
                checked={digit.json?.CombingMode === FollowType.Follow.json}
                onChange={onChangeFollow}
                disabled={followDisabled}
              />
            </div>
            <span className="input-group-text" >
              alignment
            </span>
            <select
                value={AlignmentType.fromJson(digit.json?.Digit?.Alignment)}
                className="form-select form-select-sm"
                onChange={onChangeAlignment}
              >
                <option value="0">
                  Left
                </option>
                <option value="1">
                  Center
                </option>
                <option value="2">
                  Right
                </option>
              </select>
          </div>

          <div className="input-group input-group-sm">
            <span className="input-group-text">Unit</span>

            <select
              value={digit.json?.Digit?.SystemFont.ShowUnitCheck}
              className="form-select form-select-sm"
              onChange={onChangeUnitCheck}
            >
              <option value="-1">
                None
              </option>
              <option value="1">
                small
              </option>
              <option value="2">
                big
              </option>
            </select>

            <span className="input-group-text">Separator</span>
            <div className="input-group-text">
            <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={digit.json?.Separator != null}
                onChange={onChangeSeparator}
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

export default SystemFontComponent;
