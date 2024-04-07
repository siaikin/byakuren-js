import type { BkrRgb } from './common';
import { BkrOctreeExtractor } from './octree';

export { bkrRgbToHex } from './common';

export type ExtractedImageData = ImageData | ImageBitmapSource;

export async function extractColorPalette(
  image: ExtractedImageData,
  colorCount: number
): Promise<Array<BkrRgb>> {
  const { data } = await createImageData(image);

  const bkrRgb: Array<BkrRgb> = [];
  const length = data.length;
  for (let i = 0; i < length; i += 4) {
    bkrRgb.push({
      red: data[i],
      green: data[i + 1],
      blue: data[i + 2]
    });
  }

  const extractor = new BkrOctreeExtractor(bkrRgb, colorCount);
  extractor.build();
  const stats = extractor.extract();

  return stats.map((stat) => stat.color);
}

async function createImageData(image: ExtractedImageData): Promise<ImageData> {
  if (image instanceof ImageData) return image;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas 2D context is not supported');
  }

  const bitmap = await createImageBitmap(image);

  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  context.drawImage(bitmap, 0, 0);

  return context.getImageData(0, 0, bitmap.width, bitmap.height);
}
