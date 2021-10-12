import React, { ReactElement } from "react";
import './selectFileList.css'

interface IProps {
    images: HTMLImageElement[],
    setSelectedFileIndex(index: number)
}

interface IState {
    selectedFileIndex: number,
    collapsed: boolean
}
export default class SelectFileListComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        
        this.state =  {
            selectedFileIndex: null,
            collapsed: true
        }
        this.onFileSelected = this.onFileSelected.bind(this);
        this.onRemove = this.onRemove.bind(this)
    }

    onFileSelected(index: number) {
        this.props.setSelectedFileIndex(index)
        this.setState({ selectedFileIndex: index, collapsed: true})
	};

    onClick = (val: number) => (e) => {
        this.onFileSelected(val)
    };

    onRemove() {
        this.onFileSelected(null)
    }

    render() {
        const options: ReactElement[] = []
    
        options.push(<option key={'None'} value={'None'}> </option> )
    
        if (this.props?.images) {
          for (var i = 0; i < this.props.images.length; i++) {
            let img = this.props.images[i]

            options.push(
                <li key={i} value={i} className="list-group-item" 
                    onClick={this.onClick(i)}>
                 {  
                    <img src={img.src} alt={img.alt} width={30} />
                 }
                 {this.props.images[i].alt}
              </li> )
          }
        }

        return (
            <>
            <div className="input-group-text dropdown">
                <div >{ this.state.selectedFileIndex !== null  ? this.state.selectedFileIndex : 'None'}</div>
                { this.state.collapsed ? '' : 
                    <ul className="list-group dropdown-content" >
                        {options}
                    </ul>
                }
            </div>
            <button className="btn btn-outline-secondary" type="button"
                onClick={() => {this.setState({collapsed: !this.state.collapsed})}}>+</button>
            <button className="btn btn-outline-secondary" type="button"
                onClick={this.onRemove}>x</button>
            </>
        )
    }
}
