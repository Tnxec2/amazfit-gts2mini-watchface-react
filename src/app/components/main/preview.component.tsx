import { FC, useContext, useState } from "react";
import { IWatchContext, WatchfaceContext } from "../../context";
import { IImage } from "../../model/image.model";
import { WatchFace } from "../../model/watchFace.gts2mini.model";
import { WatchState } from "../../model/watchState";
import { drawStandUp } from "../../preview/standup.element";
import drawAlarm from "../../preview/alarm.element";
import {drawBackground} from "../../preview/background.element";
import drawAodBackground from "../../preview/backgroundaod.element";
import { drawBattery } from "../../preview/battery.element";
import { drawCalories } from "../../preview/calories.element";
import drawDate from "../../preview/date.element";
import drawDateAod from "../../preview/dateAod.element";
import { drawDistance } from "../../preview/distance.element";
import { drawHeartRate } from "../../preview/heartrate.element";
import {drawImage} from "../../preview/image.element";
import drawImageSet from "../../preview/imageSet.element";
import { drawPAI } from "../../preview/pai.element";
import { drawFiveDigits, drawFourDigits, drawThreeDigits } from "../../preview/separateDigits.element";
import drawShortcutElement from "../../preview/shortcut.element";
import drawStatus from "../../preview/status.element";
import { drawSteps } from "../../preview/steps.element";
import drawSunset from "../../preview/sunset.element";
import drawTimeAnalog from "../../preview/timeAnalog.element";
import drawTimeAnalogAod from "../../preview/timeAnalogAod.element";
import drawTimeDigital from "../../preview/timeDigital.element";
import drawTimeDigitalAod from "../../preview/timeDigitalAod.element";
import { drawWeather } from "../../preview/weather.element";
import Canvas from "./canvas.function";
import cl from "./previewComponent.module.css";
import { drawStepsAod } from "../../preview/stepsAod.element";
import { Constant } from "../../shared/constant";
import { drawStress } from "../../preview/stress.element";
import { drawSpo2 } from "../../preview/spo2.element";
import drawHourlyImages from "../../preview/hourlyimages.element";
import drawWeekdayImages from "../../preview/weekdayimages.element";

const storage_items = {
  preview_white_grid: "preview_white_grid",
  preview_black_grid: "preview_black_grid",
  preview_digit_border: "preview_digit_border",
  preview_shortcut_border: "preview_shortcut_border",
  preview_scale_factor: "preview_scale_factor",
};

const PreviewComponent: FC = () => {
  const { images, watchface, watchState, previewScreenNormal, device } =
    useContext<IWatchContext>(WatchfaceContext);

  const [scaleFactor, setScaleFactor] = useState<number>(
    localStorage.getItem(storage_items.preview_scale_factor)
      ? JSON.parse(localStorage.getItem(storage_items.preview_scale_factor))
      : 1
  );

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
  const [shortCutBorder, setShortCutBorder] = useState<boolean>(
    localStorage.getItem(storage_items.preview_shortcut_border)
      ? JSON.parse(localStorage.getItem(storage_items.preview_shortcut_border))
      : false
  );

  function draw(canvas, ctx: CanvasRenderingContext2D) {
    if (images && watchface) {
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (previewScreenNormal) drawNormal(canvas, ctx, images);
        else drawAod(canvas, ctx, images);
        drawGrid(ctx);
      } else {
        console.error("don't find canvas with id canvasPreview");
      }
    }
  }

  function drawNormal(canvas, ctx: CanvasRenderingContext2D, images: IImage[]) {
    if (watchface.background)
      drawBackground(canvas, ctx, images, watchface.background, digitBorder);

    if (watchface.battery) {
      drawBattery(
        ctx,
        images,
        watchface.battery,
        watchState,
        digitBorder,
        shortCutBorder
      );
    }
    if (watchface.weather) {
      drawWeather(
        ctx,
        images,
        watchface.weather,
        watchface.weatherext,
        watchState,
        digitBorder,
        shortCutBorder
      );
    }
    if (watchface.activity) {
      drawActivitys(
        ctx,
        images,
        watchface,
        watchState,
        digitBorder,
        shortCutBorder
      );
    }
    if (watchface.activity.caloriesSeparatedDigits.enabled) drawFourDigits(ctx, images, watchface.activity.caloriesSeparatedDigits.json, watchState.calories, false, digitBorder)
    if (watchface.activity.stepsSeparatedDigits.enabled) drawFiveDigits(ctx, images, watchface.activity.stepsSeparatedDigits.json, watchState.steps, false, digitBorder)
    if (watchface.activity.batterySeparatedDigits.enabled) drawThreeDigits(ctx, images, watchface.activity.batterySeparatedDigits.json, watchState.battery, false, digitBorder)
    if (watchface.activity.heartRateSeparatedDigits.enabled) drawThreeDigits(ctx, images, watchface.activity.heartRateSeparatedDigits.json, watchState.hearthrate, false, digitBorder)
    if (watchface.status) {
      drawStatus(ctx, images, watchface.status, watchState, digitBorder);
    }
    
    if (watchface.date) {
      drawDate(ctx, images, watchface.date, watchState, digitBorder);
    }

    if (watchface.time) {
      drawAlarm(
        ctx,
        images,
        watchface.time.alarm,
        watchState,
        digitBorder,
        shortCutBorder
      );
      drawSunset(
        ctx,
        images,
        watchface.time.sunset,
        watchState,
        digitBorder,
        shortCutBorder
      );
      drawTimeDigital(ctx, images, watchface.time, watchState, digitBorder);
      drawTimeAnalog(ctx, images, watchface.time, watchState, device.width, device.height);
      drawHourlyImages(ctx, images, watchface.time.hourlyImages, watchState, digitBorder)
      drawWeekdayImages(ctx, images, watchface.weekdayImages, watchState, digitBorder)
    }


    if (watchface.animation.imageSetAnimation) {
      watchface.animation.imageSetAnimation.forEach((item, index) => {
        drawImageSet(
          ctx,
          images,
          item.ImageProgress,
          watchState.animation[index],
          item.ImageProgress.ImagesCount,
          digitBorder, true
        );
      });
    }
    if (watchface.shortcuts.shortcuts) {
      watchface.shortcuts.shortcuts.forEach((item) => {
        drawImage(ctx, images, item.icon.json, digitBorder);
        drawShortcutElement(ctx, item.element.json, shortCutBorder);
      });
    }
  }

  function drawAod(canvas, ctx: CanvasRenderingContext2D, images: IImage[]) {
    if (watchface.aod) {
      drawAodBackground(canvas, ctx);
    }
    if (watchface.aod.date) {
      drawDateAod(
        ctx,
        images,
        watchface.aod.date,
        watchface.aod.dateOneLine,
        watchface.aod.weekday,
        watchState,
        digitBorder
      );
    }
    if (watchface.aod.steps) {
      drawStepsAod(
        ctx,
        images,
        watchface.aod.steps,
        watchState.steps,
        digitBorder
      );
    }
    if (watchface.aod.time) {
      drawTimeDigitalAod(
        ctx,
        images,
        watchface.aod.time,
        watchState,
        digitBorder
      );
      drawTimeAnalogAod(ctx, images, watchface.aod.time.timeAnalog, watchState, device.width, device.height);
    }
  }

  function getCursorPosition(event) {
    const canvas = document.getElementById(
      "canvasPreview"
    ) as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / scaleFactor;
    let y = (event.clientY - rect.top) / scaleFactor;
    x = Math.min(device.width, Math.max(0, Math.round(x)));
    y = Math.min(device.height, Math.max(0, Math.round(y)));
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
  function onToggleShortCutBorder() {
    const db = !shortCutBorder;
    setShortCutBorder(db);
    localStorage.setItem(
      storage_items.preview_shortcut_border,
      JSON.stringify(db)
    );
  }



  function drawGrid(ctx: CanvasRenderingContext2D) {
    if (!whiteGrid && !blackGrid) return;
    const stroke = whiteGrid ? "white" : "black";
    const step = 20;
    for (let i = device.width / 2; i > 0; i -= step) {
      drawLine(ctx, [i, 0], [i, device.height], stroke, 1);
    }
    for (let i = device.width / 2; i < device.width; i += step) {
      drawLine(ctx, [i, 0], [i, device.height], stroke, 1);
    }
    for (let i = device.height / 2; i > 0; i -= step) {
      drawLine(ctx, [0, i], [device.width, i], stroke, 1);
    }
    for (let i = device.height / 2; i < device.height; i += step) {
      drawLine(ctx, [0, i], [device.width, i], stroke, 1);
    }
    drawLine(ctx, [device.width / 2 - 1, 0], [device.width / 2 - 1, device.height], stroke, 2);
    drawLine(ctx, [0, device.height / 2 - 1], [device.width, device.height / 2 - 1], stroke, 2);
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
        {previewScreenNormal ? "Screen Normal" : "AOD"} ({device.width} x {device.height})
        <div>
          x: {x}, y: {y}
        </div>
        <Canvas
          id="canvasPreview"
          draw={draw}
          className={cl.canvasPreview}
 
          onClick={getCursorPosition}
          style={device.title === Constant.devices.gts2mini.title ? {borderRadius: 72} :  {borderRadius: 38}}

          width={device.width*scaleFactor}
          height={device.height*scaleFactor}

          scaleFactor={scaleFactor}
        />
      </div>

      <div className="container d-flex justify-content-center">
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
          </div>
        </div>
        <div className="container d-flex justify-content-center">
          <div className="input-group input-group-sm" style={{ width: "max-content" }}>
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
            <span className="input-group-text" id="addon-wrapping">
              border on shortcut
            </span>
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={shortCutBorder}
                onChange={onToggleShortCutBorder}
              />
            </div>
          </div>
        </div>
        
        <div className="container d-flex justify-content-center">
        <div
            className="input-group input-group-sm"
            style={{ width: "max-content" }}
          >              
            <label className="form-check-label">
              Scale&nbsp;
            </label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale1" value="1" checked={scaleFactor===1} onChange={() => {setScaleFactor(1)}} />
              <label className="form-check-label" htmlFor="inlineRadio1">x1</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale2" value="2" checked={scaleFactor===2} onChange={() => {setScaleFactor(2)}} />
              <label className="form-check-label" htmlFor="inlineRadio2">x2</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="scaleOptions" id="scale3" value="3" checked={scaleFactor===3} onChange={() => {setScaleFactor(3)}} />
              <label className="form-check-label" htmlFor="inlineRadio3">x3</label>
            </div>
          </div>
        </div>
    </>
  );
};

export default PreviewComponent;

function drawActivitys(
  ctx: CanvasRenderingContext2D,
  images: IImage[],
  watchface: WatchFace,
  watchState: WatchState,
  digitBorder: boolean,
  shortCutBorder: boolean
) {
  drawSteps(
    ctx,
    images,
    watchface.activity.steps,
    watchState.steps,
    watchState.stepsGoal,
    digitBorder,
    shortCutBorder
  );
  drawCalories(
    ctx,
    images,
    watchface.activity.calories,
    watchState.calories,
    watchState.caloriesGoal,
    digitBorder,
    shortCutBorder
  );
  drawDistance(
    ctx,
    images,
    watchface.activity.distance,
    watchState.distance,
    null,
    digitBorder,
    shortCutBorder
  );
  drawHeartRate(
    ctx,
    images,
    watchface.activity.heartRate,
    watchState.hearthrate,
    watchState.hearthrateGoal,
    digitBorder,
    shortCutBorder,
    watchState.hearthRateNoData
  );
  drawPAI(
    ctx,
    images,
    watchface.activity.pai,
    watchState.pai,
    watchState.paiGoal,
    digitBorder,
    shortCutBorder
  );
  drawStandUp(
    ctx,
    images,
    watchface.activity.standUp,
    watchState.standup,
    watchState.standupGoal,
    digitBorder,
    shortCutBorder
  );
  drawStress(
    ctx,
    images,
    watchface.activity.stress,
    watchState.stress,
    watchState.stressGoal,
    digitBorder,
    shortCutBorder
  );
  drawSpo2(
    ctx,
    images,
    watchface.activity.spo2,
    watchState.spo2,
    watchState.spo2Goal,
    digitBorder,
    shortCutBorder
  );
}
