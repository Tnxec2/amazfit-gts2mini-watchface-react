import { IImage } from "../model/image.model"


export function findImageById(id: number, images: IImage[]): HTMLImageElement | null {
    if ( id === null || id === undefined ) return null
    const i = images.find((item) => item.id === id)
    if (i) {
        return i.image
    } else {
        console.error('Image with Index  ' + id + ' not found')
        return null
    }
}