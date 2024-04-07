export interface BkrRgb {
    red: number;
    green: number;
    blue: number;
}
export declare class BkrColorStats {
    color: BkrRgb;
    value: number;
    count: number;
}
export declare class BkrOctreeNode {
    redComponents: number;
    greenComponents: number;
    blueComponents: number;
    isLeaf: boolean;
    pixelCount: number;
    children: Array<BkrOctreeNode | null>;
}
export interface BkrOctreeReducibleListNode {
    node: BkrOctreeNode;
    next: BkrOctreeReducibleListNode | null;
}
export interface BkrPaletteArray {
    count: number;
    colors: BkrRgb[];
}
export interface BkrMindiffParameter {
    palette: BkrPaletteArray;
    grayOffset: number;
}
export declare function bkrRgbToInt32(r: number, g: number, b: number): number;
export declare function bkrRgbToHex(r: number, g: number, b: number): string;
export declare function bkrIsGray(a: BkrRgb, offset: number): boolean;
export declare function statsCmp(a: BkrColorStats, b: BkrColorStats): number;
