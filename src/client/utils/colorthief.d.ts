declare module "colorthief" {
  type RGB = [number, number, number]

  export default class ColorThief {
    getColor(img: HTMLImageElement): RGB
    getPalette(img: HTMLImageElement, colorCount?: number): RGB[]
  }
}
