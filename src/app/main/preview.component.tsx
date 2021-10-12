import React from 'react';
import Watchface from '../model/watchFace.model';
import { WatchState } from '../model/watchState';
import './preview.css';
import drawBackground from './preview/background.element';
import drawDate from './preview/date.element';
import drawTimeDigital from './preview/timeDigital.element';


interface IProps {
    images: HTMLImageElement[],
    watchface: Watchface,
    width: number,
    height: number
}

interface IState {
    x: number,
    y: number,
    watchState: WatchState,
    whiteGrid: boolean,
    blackGrid: boolean
}

export default class PreviewComponent extends React.Component<IProps, IState> {


    constructor(props) {
        super(props)

        this.state = {
            x: 0,
            y: 0,
            watchState: new WatchState(),
            whiteGrid: false,
            blackGrid: false
        }

        this.drawPreview = this.drawPreview.bind(this)
        this.drawGrid = this.drawGrid.bind(this)
    }

    colorRegex: RegExp = /^#[0-9A-F]{6}$/i;
  
    GFG_Fun(colorCode: string) {
        return this.colorRegex.test(colorCode);
    }

    drawPreview() {
        const props = this.props
        console.log(props.watchface);
        
        if (props.images && props.watchface) {

            const canvas: HTMLCanvasElement = document.getElementById("canvasPreview") as HTMLCanvasElement;
            if ( canvas) {

                const ctx = canvas.getContext("2d"); 
                
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                if (props.watchface.background) {
                    drawBackground(canvas, ctx, props.images, props.watchface.background )
                }
                if (props.watchface.date) {
                    drawDate(ctx,props.images, props.watchface.date, props.watchface.orderElements.orderElementsDate, this.state.watchState)
                }
                if (props.watchface.timeDigital) {
                    drawTimeDigital(ctx, props.images, props.watchface.timeDigital, props.watchface.orderElements.orderElementsTime, this.state.watchState)
                }
                this.drawGrid(ctx)
            } else {
                console.error('don\'t find canvas with id canvasPreview')
            }
        }
    }

    getCursorPosition(event) {
        const canvas = document.getElementById("canvasPreview") as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top
        x = Math.min(this.props.width, Math.max(0, Math.round(x)))
        y = Math.min(this.props.height, Math.max(0, Math.round(y)))
        this.setState({x: x, y: y})
    }

    onToggleWhiteGrid() {
        this.setState(({whiteGrid: !this.state.whiteGrid}))
    }

    onToggleBlackGrid() {
        this.setState({blackGrid: ! this.state.blackGrid})
    }

    drawGrid(ctx: CanvasRenderingContext2D) {
        if (!this.state.whiteGrid && !this.state.blackGrid) return
        const stroke = this.state.whiteGrid ? 'white' : 'black'
        const step = 20
        for(let i = this.props.width / 2; i > 0; i -= step) {
            this.drawLine(ctx, [i,0], [i,this.props.height], stroke, 1)
        }
        for(let i = this.props.width / 2; i < this.props.width; i += step) {
            this.drawLine(ctx, [i,0], [i,this.props.height], stroke, 1)
        }
        for(let i = this.props.height / 2; i > 0; i -= step) {
            this.drawLine(ctx, [0,i], [this.props.width,i], stroke, 1)
        }
        for(let i = this.props.height / 2; i < this.props.height; i += step) {
            this.drawLine(ctx, [0,i], [this.props.width,i], stroke, 1)
        }
        this.drawLine(ctx, [this.props.width / 2 -1, 0], [this.props.width / 2 -1, this.props.height], stroke, 2 )
        this.drawLine(ctx, [0, this.props.height / 2 -1], [this.props.width, this.props.height /2 -1], stroke, 2 )
    }

    drawLine(ctx: CanvasRenderingContext2D, begin: [number, number], end: [number, number], stroke = 'black', width = 1) {
        if (stroke) {
            ctx.strokeStyle = stroke;
        }
    
        if (width) {
            ctx.lineWidth = width;
        }
    
        ctx.beginPath();
        ctx.moveTo(begin[0], begin[1]);
        ctx.lineTo(end[0], end[1]);
        ctx.stroke();
    }

    render() {
        this.drawPreview()
        return (
            <>
            <div>
                x: {this.state.x}, y: {this.state.y}
            </div>
            <canvas id="canvasPreview"  width={this.props.width} height={this.props.height} onClick={this.getCursorPosition.bind(this)}></canvas>
            
            <div className="input-group input-group-sm flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">White grid</span>
                <div className="input-group-text">
                <input className="form-check-input mt-0" type="checkbox" 
                checked={this.state.whiteGrid} 
                onChange={this.onToggleWhiteGrid.bind(this)} />
                </div>
                <span className="input-group-text" id="addon-wrapping">Black grid</span>
                <div className="input-group-text">
                <input className="form-check-input mt-0" type="checkbox" 
                checked={this.state.blackGrid} 
                onChange={this.onToggleBlackGrid.bind(this)} />
                </div>            
            </div>
            </>
        )
    }
}