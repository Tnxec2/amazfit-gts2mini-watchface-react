import { FC, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { BlockType, IRow, OptionsAlignmentGTs2Mini } from "../../model/blocks.model";
import { Coordinates } from "../../model/json.gts2minit.model";
import { WatchNumber } from "../../model/watchFace.gts2mini.model";

interface IProps {
  title: string;
  digit: WatchNumber;
  onUpdate(digit: WatchNumber): void;
  onCopyFromNormal?(): void,
  followDisabled?: boolean;
  showDelimiter?: boolean,
  showDataType?: boolean,
  showPrefix?: boolean,
  paddingDisabled?: boolean,
}

const WatchNumberComponent: FC<IProps> = ({
  title,
  digit,
  onUpdate,
  followDisabled,
  onCopyFromNormal,
  showDelimiter,
  showDataType,
  showPrefix,
  paddingDisabled,
}) => {

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Image', type: BlockType.SelectFile, nvalue: digit.json?.ImageIndex, onChange: onChangeImageIndex },
        { title: `Count: ${digit.json?.ImagesCount}`, type: BlockType.Empty },
      ]
    },
    {
      blocks: [
        { title: 'X', type: BlockType.Number, nvalue: digit.json.TopLeftX ? digit.json.TopLeftX : 0, onChange: onChangeX },
        { title: 'Y', type: BlockType.Number, nvalue: digit.json.TopLeftY ? digit.json.TopLeftY : 0, onChange: onChangeY },
      ]
    },
    {
      blocks: [
        { title: 'Bottom Right X', type: BlockType.Number, nvalue: digit.json.BottomRightX ? digit.json.BottomRightX : 0, onChange: onChangeBottomRightX },
        { title: 'Bottom Right Y', type: BlockType.Number, nvalue: digit.json.BottomRightX ? digit.json.BottomRightY : 0, onChange: onChangeBottomRightY },
      ]
    },
    {
      blocks: [
        { title: 'padding zero', type: BlockType.Checkbox, checked: digit.paddingZero, onChange: onChagePaddingZero, disabled: paddingDisabled},
        { title: 'spacing', type: BlockType.Number, nvalue: digit.json?.Spacing ? digit.json.Spacing : 0, onChange: onChangeSpacing },
        { title: 'vertical offset', type: BlockType.Number, nvalue: digit.json?.VerticalOffset ? digit.json.VerticalOffset : 0, onChange: onChangeVerticalOffset },
      ]
    },
    {
      blocks: [
        { title: 'follow', type: BlockType.Checkbox, checked: digit.follow, onChange: onChangeFollow, disabled: followDisabled },
        { title: 'alignment', type: BlockType.Select, svalue: digit.json?.Alignment, selectOptions: OptionsAlignmentGTs2Mini,  onChange: onChangeAlignment },
      ]
    },
    {
      disabled: ! showPrefix,
      blocks: [
        { title: 'Prefix', type: BlockType.SelectFile, nvalue: digit.prefix, onChange: onChangePrefix },
      ]
    },
    {
      disabled: ! showDelimiter,
      blocks: [
        { title: 'Delimiter', type: BlockType.SelectFile, nvalue: digit.delimiter, onChange: onChangeDelimiter },
      ]
    },
    {
      disabled: ! showDataType,
      blocks: [
        { title: 'Data Type', type: BlockType.SelectFile, nvalue: digit.dataType, onChange: onChangeDatatype },
        { title: 'X', type: BlockType.Number, nvalue: digit.dataTypeCoords?.X ? digit.dataTypeCoords.X : 0, onChange: onChangeDatatypeCoordsX },
        { title: 'Y', type: BlockType.Number, nvalue: digit.dataTypeCoords?.Y ? digit.dataTypeCoords.Y : 0, onChange: onChangeDatatypeCoordsY },
      ]
    },
  ], [digit]) // eslint-disable-line react-hooks/exhaustive-deps

  function onChagePaddingZero(val: boolean) {
    const d = {...digit};
    d.paddingZero = val;
    onUpdate(d);
  }

  function onChangeDatatypeCoordsX(val: number) {
    const d = {...digit};
    if (!d.dataTypeCoords) d.dataTypeCoords = new Coordinates()
    d.dataTypeCoords.X = val;
    onUpdate(d);
  }

  function onChangeDatatypeCoordsY(val: number) {
    const d = {...digit};
    if (!d.dataTypeCoords) d.dataTypeCoords = new Coordinates()
    d.dataTypeCoords.Y = val;
    onUpdate(d);
  }

  function onChangeImageIndex(index: number) {
    const d = {...digit};
    d.json.ImageIndex = index;
    onUpdate(d);
  }

  function onChangeX(val: number) {
    const d = {...digit};
    
    let width = d.json.BottomRightX && d.json.TopLeftX ? d.json.BottomRightX - d.json.TopLeftX : 1
    d.json.TopLeftX = val;
    d.json.BottomRightX = val + width
    onUpdate(d);
  }

  function onChangeY(val: number) {
    const d = {...digit};
    let height = d.json.BottomRightY && d.json.TopLeftY ? d.json.BottomRightY - d.json.TopLeftY : 1
    d.json.TopLeftY = val;
    d.json.BottomRightY = val + height
    onUpdate(d);
  }

  function onChangeBottomRightX(val: number) {
    const d = {...digit};
    d.json.BottomRightX = val;
    onUpdate(d);
  }

  function onChangeBottomRightY(val: number) {
    const d = {...digit};
    d.json.BottomRightY = val;
    onUpdate(d);
  }

  function onChangeAlignment(val: string) {
    const d = {...digit};
    d.json.Alignment = val;
    onUpdate(d);
  }

  function onChangeSpacing(val: number) {
    const d = {...digit};
    d.json.Spacing = val;
    onUpdate(d);
  }

  function onChangeVerticalOffset(val: number) {
    const d = {...digit};
    d.json.VerticalOffset = val;
    onUpdate(d);
  }

  function onChangeDelimiter(index: number) {
    const d = {...digit};
    d.delimiter = index;
    onUpdate(d);
  }

  function onChangeDatatype(index: number) {
    const d = {...digit};
    d.dataType = index;
    onUpdate(d);
  }

  function onChangePrefix(index: number) {
    const d = {...digit};
    d.prefix = index;
    onUpdate(d);
  }

  function onChangeFollow(val: boolean) {
    const d = {...digit};
    d.follow = val;
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
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default WatchNumberComponent;
