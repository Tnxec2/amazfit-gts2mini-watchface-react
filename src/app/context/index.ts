import {createContext} from 'react'
import { IImage } from '../model/image.model';
import { WatchFace } from '../model/watchFace.gts2mini.model';
import { WatchState } from '../model/watchState';

export const WatchfaceContext = createContext(null);

export interface IWatchContext {
    images: IImage[],
    setImages(images: IImage[]): void,
    watchface: WatchFace,
    setWatchface(watchface: WatchFace): void,
    watchState: WatchState,
    setWatchState(watchState: WatchState): void,
    jsonName: string,
    setJsonName(jsonName: string): void,
    previewScreenNormal: boolean,
    setPreviewScreenNormal(s: boolean): void,
  }