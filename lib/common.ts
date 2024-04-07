// 定义 RGB 颜色接口
export interface BkrRgb {
  red: number;
  green: number;
  blue: number;
}

// 定义主题色结果（颜色、色值、像素数）接口
export class BkrColorStats {
  color: BkrRgb = { red: 0, green: 0, blue: 0 };
  value = 0;
  count = 0;
}

// 定义八叉树节点接口
export class BkrOctreeNode {
  redComponents = 0;
  greenComponents = 0;
  blueComponents = 0;

  isLeaf = false;
  pixelCount = 0;

  children: Array<BkrOctreeNode | null> = new Array(8).fill(null);
}

// 定义八叉树可删减链表节点接口
export interface BkrOctreeReducibleListNode {
  node: BkrOctreeNode;
  next: BkrOctreeReducibleListNode | null;
}

// 定义标准色板接口
export interface BkrPaletteArray {
  count: number;
  colors: BkrRgb[];
}

// 定义最小差值法参数接口
export interface BkrMindiffParameter {
  palette: BkrPaletteArray;
  grayOffset: number;
}

export function bkrRgbToInt32(r: number, g: number, b: number): number {
  return (r << 16) + (g << 8) + b;
}

export function bkrRgbToHex(r: number, g: number, b: number): string {
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function bkrIsGray(a: BkrRgb, offset: number): boolean {
  return (
    Math.abs(a.red - a.green) <= offset &&
    Math.abs(a.red - a.blue) <= offset &&
    Math.abs(a.green - a.blue) <= offset
  );
}

export function statsCmp(a: BkrColorStats, b: BkrColorStats): number {
  if (a.count !== b.count) {
    return -(a.count - b.count);
  }

  return -(a.value - b.value);
}
