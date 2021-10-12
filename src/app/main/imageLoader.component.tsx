import React from "react";
import { Form } from "react-bootstrap";

interface IProps {
    setUploadedImages(images: HTMLImageElement[])
}


export default class ImageLoaderComponent extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
        
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.getImages = this.getImages.bind(this)
    }

    fileUploadHandler(event: any) {
		this.getImages(event.target.files, [])
        
	}
    
    getImages(files: FileList, ar: HTMLImageElement[], index = 0) {
        if ( index < files.length) {
            const img = new Image();
            img.addEventListener("load", () => {
                index += 1
                if (index < files.length)
                    this.getImages(files, ar, index)
                else {
                    this.props.setUploadedImages(ar)
                }
            });
            img.src = URL.createObjectURL(files[index]);
            img.alt = files[index].name
            ar.push(img)
        }
    }

    render() {
        return (
            <>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">PreviewImage</span>
                <Form.File multiple id="fileUpload" onChange={this.fileUploadHandler} />
            </div>
            </>
        )
    }
}