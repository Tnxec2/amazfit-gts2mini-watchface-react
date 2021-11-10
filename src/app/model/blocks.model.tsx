export enum BlockType {
    Button,
    Checkbox,
    Color,
    Date,
    Empty,
    Number,
    Select,
    SelectFile,
    Time,
  }
  
export  interface IRow {
    blocks: IBlock[],
    disabled?: boolean,
    onDelete?(): void,
    showDelete?: boolean
}

export interface IOption {
    value: string,
    title: string
}


export const OptionsAlignmentGTs2Mini: IOption[] =  [ 
    { value: 'TopLeft', title:'TopLeft'},
    { value: 'TopCenter', title:'TopCenter'},
    { value: 'TopRight', title:'TopRight'},
    { value: 'CenterLeft', title:'CenterLeft'},
    { value: 'Center', title:'Center'},
    { value: 'CenterRight', title:'CenterRight'},
    { value: 'BottomLeft', title:'BottomLeft'},
    { value: 'BottomCenter', title:'BottomCenter'},
    { value: 'BottomRight', title:'BottomRight'},
]

export const OptionsLineEndingCircle: IOption[] =  [ {value:'0', title: 'Circle'}, {value:'180', title: 'Flat'}]


export interface IBlock {
    title: string;
    type: BlockType;
    nvalue?: number;
    checked?: boolean;
    svalue?: string;
    selectOptions?: IOption[]
    onChange?(e): any;
    disabled?: boolean;
    min?: number
    max?: number
    onClick?(e): any
    className?: string
}