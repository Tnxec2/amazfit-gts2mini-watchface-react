export enum BlockType {
    Empty,
    Number,
    Date,
    Time,
    Checkbox,
    Select,
    Color,
    SelectFile,
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

export const OptionsAlignment: IOption[] =  [ {value:'0', title: 'Left'}, {value: '1', title: 'Center'}, {value:'2', title: 'Right'}]
export const OptionsUnitSystemFont: IOption[] =  [ {value:'-1', title: 'Default'}, {value: '1', title: 'Normal'}, {value:'2', title: 'Alt'}]
export const OptionsSystemFontDirection: IOption[] =  [ {value:'0', title: 'Clockwise'}, {value: '1', title: 'Counter clock'}]
export const OptionsLineEndingLine: IOption[] =  [ {value:'0', title: 'Circle'}, {value:'180', title: 'Flat'}]
export const OptionsLineEndingCircle: IOption[] =  [ {value:'0', title: 'Circle'}, {value: '90', title: 'Triangle'}, {value:'180', title: 'Flat'}]


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
}