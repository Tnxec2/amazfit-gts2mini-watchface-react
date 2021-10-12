import React from "react";
import { Form } from "react-bootstrap";
import WatchFace from "../model/watchFace.model";

interface IProps {
    watchface: WatchFace,
}

interface IState {
    
}
export default class JsonComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)


    }



    render() {
        return (
            <>
            Json
            </>
        )
    }
}