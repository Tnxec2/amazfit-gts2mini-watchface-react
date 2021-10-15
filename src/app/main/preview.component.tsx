import React from 'react';
import Watchface from '../model/watchFace.model';
import { WatchState } from '../model/watchState';
import './preview.css';
import drawBackground from './preview/background.element';
import drawDate from './preview/date.element';
import drawTimeDigital from './preview/timeDigital.element';
import drawTimeAnalog from './preview/timeAnalog.element';
import drawActivity from './preview/activity.element';
import Canvas from './canvas.function';


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
    blackGrid: boolean,
    digitBorder: boolean,

}

const storage_items = {
    preview_white_grid: 'preview_white_grid',
    preview_black_grid: 'preview_black_grid',
    preview_digit_border: 'preview_digit_border'
  }

export default class PreviewComponent extends React.Component<IProps, IState> {
    colorPickerRef: React.RefObject<unknown>;

    constructor(props) {
        super(props)

        let whiteGrid = false
        if ( localStorage.getItem(storage_items.preview_white_grid)) {
            whiteGrid = JSON.parse(localStorage.getItem(storage_items.preview_white_grid))
        }
        let blackGrid = false
        if ( localStorage.getItem(storage_items.preview_black_grid)) {
            blackGrid = JSON.parse(localStorage.getItem(storage_items.preview_black_grid))
        }
        let digitBorder = false
        if ( localStorage.getItem(storage_items.preview_digit_border)) {
            digitBorder = JSON.parse(localStorage.getItem(storage_items.preview_digit_border))
        }

        this.state = {
            x: 0,
            y: 0,
            watchState: new WatchState(),
            whiteGrid: whiteGrid,
            blackGrid: blackGrid,
            digitBorder: digitBorder
        }

        this.draw = this.draw.bind(this)
        this.drawGrid = this.drawGrid.bind(this)

        this.colorPickerRef = React.createRef();

    }

    colorRegex: RegExp = /^#[0-9A-F]{6}$/i;
  
    GFG_Fun(colorCode: string) {
        return this.colorRegex.test(colorCode);
    }

    draw(canvas, ctx: CanvasRenderingContext2D) {
        const props = this.props
        
        if (props.images && props.watchface) {

            if ( canvas) {
                
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                if (props.watchface.background) {
                    drawBackground(canvas, ctx, props.images, props.watchface.background )
                }
                if (props.watchface.date) {
                    drawDate(ctx,props.images, props.watchface.date, props.watchface.orderElements.orderElementsDate, this.state.watchState, this.state.digitBorder)
                }
                if (props.watchface.activity) {
                    drawActivity(ctx,props.images, props.watchface.activity, props.watchface.orderElements.orderElementsActivity, this.state.watchState, this.state.digitBorder)
                }
                if (props.watchface.dialFace) {
                    drawTimeDigital(ctx, props.images, props.watchface.dialFace, props.watchface.orderElements.orderElementsTime, this.state.watchState, this.state.digitBorder)
                    drawTimeAnalog(ctx, props.images, props.watchface.dialFace, this.state.watchState)
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
        const wg = !this.state.whiteGrid
        this.setState(({whiteGrid: wg}))
        localStorage.setItem(storage_items.preview_white_grid, JSON.stringify(wg))
    }

    onToggleBlackGrid() {
        const bg = ! this.state.blackGrid
        this.setState({blackGrid: bg})
        localStorage.setItem(storage_items.preview_white_grid, JSON.stringify(bg))
    }

    onToggleDigitBorder() {
        const db = ! this.state.digitBorder
        this.setState({digitBorder: db})
        localStorage.setItem(storage_items.preview_digit_border, JSON.stringify(db))
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
        //this.drawPreview()
        return (
            <>
            <div id="canvasCcontainer">
                <div>
                    x: {this.state.x}, y: {this.state.y}
                </div>
                <Canvas draw={this.draw.bind(this)} id="canvasPreview" width={this.props.width} height={this.props.height} onClick={this.getCursorPosition.bind(this)} />
            </div>
            
            <div className="container d-flex justify-content-center">
                    <div className="input-group input-group-sm" style={{width: 'max-content'}}>
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
                        <span className="input-group-text" id="addon-wrapping">border on digit</span>
                        <div className="input-group-text">
                            <input className="form-check-input mt-0" type="checkbox" 
                            checked={this.state.digitBorder} 
                            onChange={this.onToggleDigitBorder.bind(this)} />
                        </div>
                </div>
            </div>
            </>
        )
    }
}