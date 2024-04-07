import type { BkrRgb } from './common';
export { bkrRgbToHex } from './common';
export type ExtractedImageData = ImageData | ImageBitmapSource;
export declare function extractColorPalette(image: ExtractedImageData, colorCount: number): Promise<Array<BkrRgb>>;
