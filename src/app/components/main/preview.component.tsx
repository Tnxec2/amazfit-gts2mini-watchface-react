import { FC, useContext, useState } from "react";

import { IWatchContext, WatchfaceContext } from "../../context";
import { IImage } from "../../model/image.model";
import Canvas from "./canvas.function";
import drawActivity from "../../preview/activity.element";
import drawBackground from "../../preview/background.element";
import drawAodBackground from "../../preview/backgroundaod.element";
import drawDate from "../../preview/date.element";
import drawStatus from "../../preview/status.element";
import drawTimeAnalog from "../../preview/timeAnalog.element";
import drawTimeDigital from "../../preview/timeDigital.element";
import drawWidgets from "../../preview/widgets.element";
import cl from "./previewComponent.module.css";

interface IProps {
  width: number;
  height: number;
}

const storage_items = {
  preview_white_grid: "preview_white_grid",
  preview_black_grid: "preview_black_grid",
  preview_digit_border: "preview_digit_border",
};

const PreviewComponent: FC<IProps> = ({ width, height }) => {
  const { images, watchface, watchState, previewScreenNormal } =
    useContext<IWatchContext>(WatchfaceContext);

  const [borderWidget, setBorderWidget] = useState<boolean>(false)
  const [showWidgetPreview, setShowWidgetPreview] = useState<boolean>(false)

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [whiteGrid, setWhiteGrid] = useState<boolean>(
    localStorage.getItem(storage_items.preview_white_grid)
      ? JSON.parse(localStorage.getItem(storage_items.preview_white_grid))
      : false
  );
  const [blackGrid, setBlackGrid] = useState<boolean>(
    localStorage.getItem(storage_items.preview_black_grid)
      ? JSON.parse(localStorage.getItem(storage_items.preview_black_grid))
      : false
  );
  const [digitBorder, setDigitBorder] = useState<boolean>(
    localStorage.getItem(storage_items.preview_digit_border)
      ? JSON.parse(localStorage.getItem(storage_items.preview_digit_border))
      : false
  );

  function draw(canvas, ctx: CanvasRenderingContext2D) {
    if (images && watchface) {
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (previewScreenNormal) drawNormal(canvas, ctx, images)
        else drawAod(canvas, ctx, images)
        drawGrid(ctx);
      } else {
        console.error("don't find canvas with id canvasPreview");
      }
    }
  }

  function drawNormal(canvas, ctx: CanvasRenderingContext2D, images: IImage[]) {
    if (watchface.background) drawBackground(canvas, ctx, images, watchface.background);
    if (watchface.date) {
      drawDate(
        ctx,
        images,
        watchface.date,
        watchface.date.orderElements,
        watchState,
        digitBorder
      );
    }
    if (watchface.activity) {
      drawActivity(
        ctx,
        images,
        watchface.activity,
        watchState,
        digitBorder,
        true
      );
    }
    if (watchface.status) {
      drawStatus(ctx, images, watchface.status, watchState);
    }
    if (watchface.widgets.enabled) {
      drawWidgets(ctx, images, watchface.widgets, watchState, digitBorder, borderWidget, showWidgetPreview)
    }
    if (watchface.dialFace) {
      if ( !showWidgetPreview || watchface.widgets?.showTimeOnEditScreen || ( watchface.widgets?.widgets && watchface.widgets.widgets.length === 0 ) ) {
        drawTimeDigital(
          ctx,
          images,
          watchface.dialFace,
          watchState,
          digitBorder
        );
        drawTimeAnalog(ctx, images, watchface.dialFace, watchState);
      }
    }
  }
  
  function drawAod(canvas, ctx: CanvasRenderingContext2D, images: IImage[]) {
    if (watchface.aod) {
      drawAodBackground(canvas, ctx, images, watchface.aod.backgroundImageIndex);
    }
    if (watchface.aod.date) {
      drawDate(
        ctx,
        images,
        watchface.aod.date,
        watchface.aod.date.orderElements,
        watchState,
        digitBorder
      );
    }
    if (watchface.aod.activitylist) {
      drawActivity(
        ctx,
        images,
        watchface.aod.activitylist,
        watchState,
        digitBorder
      );
    }
    if (watchface.aod.dialFace) {
      drawTimeDigital(
        ctx,
        images,
        watchface.aod.dialFace,
        watchState,
        digitBorder
      );
      drawTimeAnalog(ctx, images, watchface.aod.dialFace, watchState);
    }
  }

  function getCursorPosition(event) {
    const canvas = document.getElementById(
      "canvasPreview"
    ) as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    x = Math.min(width, Math.max(0, Math.round(x)));
    y = Math.min(height, Math.max(0, Math.round(y)));
    setX(x);
    setY(y);
  }

  function onToggleWhiteGrid() {
    const wg = !whiteGrid;
    setWhiteGrid(wg);
    localStorage.setItem(storage_items.preview_white_grid, JSON.stringify(wg));
  }

  function onToggleBlackGrid() {
    const bg = !blackGrid;
    setBlackGrid(bg);
    localStorage.setItem(storage_items.preview_white_grid, JSON.stringify(bg));
  }

  function onToggleDigitBorder() {
    const db = !digitBorder;
    setDigitBorder(db);
    localStorage.setItem(
      storage_items.preview_digit_border,
      JSON.stringify(db)
    );
  }

  function drawGrid(ctx: CanvasRenderingContext2D) {
    if (!whiteGrid && !blackGrid) return;
    const stroke = whiteGrid ? "white" : "black";
    const step = 20;
    for (let i = width / 2; i > 0; i -= step) {
      drawLine(ctx, [i, 0], [i, height], stroke, 1);
    }
    for (let i = width / 2; i < width; i += step) {
      drawLine(ctx, [i, 0], [i, height], stroke, 1);
    }
    for (let i = height / 2; i > 0; i -= step) {
      drawLine(ctx, [0, i], [width, i], stroke, 1);
    }
    for (let i = height / 2; i < height; i += step) {
      drawLine(ctx, [0, i], [width, i], stroke, 1);
    }
    drawLine(ctx, [width / 2 - 1, 0], [width / 2 - 1, height], stroke, 2);
    drawLine(ctx, [0, height / 2 - 1], [width, height / 2 - 1], stroke, 2);
  }

  function drawLine(
    ctx: CanvasRenderingContext2D,
    begin: [number, number],
    end: [number, number],
    stroke = "black",
    width = 1
  ) {
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

  return (
    <>
      <div className={cl.canvasCcontainer}>
        {previewScreenNormal? 'Screen Normal' : 'AOD'}
        <div>
          x: {x}, y: {y}
        </div>
        <Canvas
          id='canvasPreview'
          draw={draw}
          className={cl.canvasPreview}
          width={width}
          height={height}
          onClick={getCursorPosition}
        />
      </div>

      <div className="container d-flex justify-content-center">
        <div>
        <div className="input-group input-group-sm" style={{ width: "max-content" }}>
          <span className="input-group-text" id="addon-wrapping">
            White grid
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={whiteGrid}
              onChange={onToggleWhiteGrid}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            Black grid
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={blackGrid}
              onChange={onToggleBlackGrid}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            border on digit
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={digitBorder}
              onChange={onToggleDigitBorder}
            />
          </div>
        </div>
        { watchface.widgets?.widgets && watchface.widgets.widgets.length > 0 ? 
        <div className="input-group input-group-sm" style={{ width: "max-content" }}>
          <span className="input-group-text" id="addon-wrapping">
            border on widgets
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={borderWidget}
              onChange={() => setBorderWidget(!borderWidget)}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            show preview of widgets
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={showWidgetPreview}
              onChange={() => setShowWidgetPreview(!showWidgetPreview)}
            />
          </div>
        </div> : '' }
        </div>
      </div>
    </>
  );
};

export default PreviewComponent;
