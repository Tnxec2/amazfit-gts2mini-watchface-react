import { IImage } from "../app/model/image.model"


export function findImageById(id: number, images: IImage[]): HTMLImageElement | null {
    const i = images.find((item) => item.id === id)
    if (i) {
        return i.image
    } else {
        alert('Image with Index  ' + id + ' not found')
        return null
    }
}