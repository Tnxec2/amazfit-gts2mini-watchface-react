import React, { useContext, useMemo } from "react";
import { IWatchContext, WatchfaceContext } from "../context";
import { WeatherStates } from "../model/weather.states";

const PreviewStatesComponent = () => {
  const { watchState, setWatchState } =
    useContext<IWatchContext>(WatchfaceContext);

  const date = useMemo(
    () =>
      `${watchState.year.toString().padStart(4, "0")}-${watchState.month
        .toString()
        .padStart(2, "0")}-${watchState.day.toString().padStart(2, "0")}`,
    [watchState]
  );

  const time = useMemo(
    () =>
      `${watchState.hours.toString().padStart(2, "0")}:${watchState.minutes
        .toString()
        .padStart(2, "0")}:${watchState.seconds.toString().padStart(2, "0")}`,
    [watchState]
  );

  function updateDate(e: React.ChangeEvent<HTMLInputElement>) {
    let date = new Date(e.target.value);
    const ws = { ...watchState };
    ws.year = date.getFullYear();
    ws.month = date.getMonth() + 1;
    ws.monthasword = date.getMonth();
    ws.day = date.getDate();
    ws.weekday = date.getDay() > 0 ? date.getDay() - 1 : 6;
    setWatchState(ws);
  }

  function updateTime(e: React.ChangeEvent<HTMLInputElement>) {
    let [h, m, s] = e.target.value.split(":");
    const ws = { ...watchState };
    if (!isNaN(parseInt(h))) ws.hours = parseInt(h);
    if (!isNaN(parseInt(m))) ws.minutes = parseInt(m);
    if (!isNaN(parseInt(s))) ws.seconds = parseInt(s);
    setWatchState(ws);
  }
  return (
    <div>
      <>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Date</span>
          <input
            type="date"
            className="form-control form-control-sm"
            value={date}
            onChange={updateDate}
          />
          <span className="input-group-text">Time</span>
          <input
            type="time"
            className="form-control form-control-sm"
            step="1"
            value={time}
            onChange={updateTime}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Battery</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="100"
            value={watchState.battery}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.battery = !isNaN(v) ? Math.min(v, 100) : 0;
              setWatchState(ws);
            }}
          />
          <span className="input-group-text">Calories</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="999"
            value={watchState.calories}
            onChange={(e) => {
              let ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.calories = !isNaN(v) ? Math.min(v, 999) : 0;
              setWatchState(ws);
            }}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Steps</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="99999"
            value={watchState.steps}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.steps = !isNaN(v) ? Math.min(v, 99999) : 0;
              setWatchState(ws);
            }}
          />
          <span className="input-group-text">Steps Goal</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="99999"
            value={watchState.stepsGoal}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.stepsGoal = !isNaN(v) ? Math.min(v, 99999) : 0;
              setWatchState(ws);
            }}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Hearthrate</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="220"
            value={watchState.hearthrate}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.hearthrate = !isNaN(v) ? Math.min(v, 220) : 0;
              setWatchState(ws);
            }}
          />
          <span className="input-group-text">Distance</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="9999"
            value={watchState.distance}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.distance = !isNaN(v) ? Math.min(v, 9999) : 0;
              setWatchState(ws);
            }}
          />
        </div>

        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">PAI</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="100"
            value={watchState.pai}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.pai = !isNaN(v) ? Math.min(v, 100) : 0;
              setWatchState(ws);
            }}
          />
          <span className="input-group-text">StandUp</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="12"
            value={watchState.standup}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.standup = !isNaN(v) ? Math.min(v, 12) : 0;
              setWatchState(ws);
            }}
          />
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Weather Icon</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="0"
            max="28"
            value={watchState.weatherIcon}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.weatherIcon = !isNaN(v) ? Math.min(v, 28) : 0;
              setWatchState(ws);
            }}
          />
          <span className="input-group-text">{WeatherStates.ar[watchState.weatherIcon]}</span>
        </div>
        <div className="input-group input-group-sm mb-1">
          <span className="input-group-text">Current</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="-99"
            max="99"
            value={watchState.temperature}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.temperature = !isNaN(v) ? Math.max(Math.min(v, 99), -99) : 0;
              setWatchState(ws);
            }}
          />
          <span className="input-group-text">Min</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="-99"
            max="99"
            value={watchState.temperatureMin}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.temperatureMin = !isNaN(v) ? Math.max(Math.min(v, 99), -99) : 0;
              setWatchState(ws);
            }}
          />
          <span className="input-group-text">Max</span>
          <input
            type="number"
            className="form-control form-control-sm"
            min="-99"
            max="99"
            value={watchState.temperatureMax}
            onChange={(e) => {
              const ws = { ...watchState };
              const v = parseInt(e.target.value);
              ws.temperatureMax = !isNaN(v) ? Math.max(Math.min(v, 99), -99) : 0;
              setWatchState(ws);
            }}
          />
        </div>

        <div className="input-group input-group-sm">
          <span className="input-group-text" id="addon-wrapping">
            Blutooth
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.bluetooth}
              onChange={() => {
                let ws = { ...watchState };
                ws.bluetooth = !ws.bluetooth;
                setWatchState(ws);
              }}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            DnD
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.dnd}
              onChange={() => {
                let ws = { ...watchState };
                ws.dnd = !ws.dnd;
                setWatchState(ws);
              }}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            Alarm
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.alarm}
              onChange={() => {
                let ws = { ...watchState };
                ws.alarm = !ws.alarm;
                setWatchState(ws);
              }}
            />
          </div>
          <span className="input-group-text" id="addon-wrapping">
            Lock
          </span>
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={watchState.lock}
              onChange={() => {
                let ws = { ...watchState };
                ws.lock = !ws.lock;
                setWatchState(ws);
              }}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default PreviewStatesComponent;
