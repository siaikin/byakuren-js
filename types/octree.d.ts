import { BkrColorStats } from './common';
import type { BkrRgb } from './common';
export declare class BkrOctreeExtractor {
    private readonly pixels;
    private readonly maxColors;
    constructor(pixels: BkrRgb[], maxColors: number);
    private leafCount;
    private root;
    private reducibleList;
    build(): void;
    extract(): BkrColorStats[];
    private reduce;
    private buildOctree;
    private addColor;
    private calculateColorStats;
}
