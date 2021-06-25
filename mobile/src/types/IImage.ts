interface IImageFormat {
    name: string;
    alternativeText: string;
    width: number;
    height: number;
    size: number;
    url: string;
    previewUrl: string;
}
interface IImageFormats {
    small: IImageFormat
    medium: IImageFormat
    thumbnail: IImageFormat
}

export interface IImage extends IImageFormat {
    id: number;
    fomarts: IImageFormats
}