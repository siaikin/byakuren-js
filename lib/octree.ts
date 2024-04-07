import { BkrColorStats, BkrOctreeNode, bkrRgbToInt32, statsCmp } from './common';
import type { BkrRgb, BkrOctreeReducibleListNode } from './common';

export class BkrOctreeExtractor {
  constructor(
    private readonly pixels: BkrRgb[],
    private readonly maxColors: number
  ) {}

  private leafCount = 0;
  private root: BkrOctreeNode | null = null;
  private reducibleList: Array<BkrOctreeReducibleListNode> = [];

  build(): void {
    this.reducibleList = new Array(7).fill(null);
    this.root = this.buildOctree(this.pixels);

    // after adding, we should calculate whether this.leafCount is greater
    // than max_colors.
    // if it's true, we should reduce this octree.
    while (this.leafCount > this.maxColors) {
      this.reduce(this.reducibleList);
    }
  }

  extract(): BkrColorStats[] {
    if (!this.root) throw new Error('Octree not built yet');

    const stats: BkrColorStats[] = Array.from(
      { length: this.maxColors },
      () => new BkrColorStats()
    );
    this.calculateColorStats(this.root, stats);

    return (
      stats
        .sort(statsCmp)
        // 按照八叉树算法 stats 并不一定会被填满, 所以需要过滤掉未被填充的数组项.
        .filter((stat) => stat.count > 0)
    );
  }

  private reduce(reducible: Array<BkrOctreeReducibleListNode | null>): void {
    let lv = 6;

    // find the lowest and not empty reducible list
    while (!reducible[lv] && lv >= 0) lv--;
    if (lv < 0) return;

    const reducedItem = reducible[lv];
    if (!reducedItem) return;

    // get the lowest level's first reducible node,
    // and replace the list head with it's next node
    const node: BkrOctreeNode = reducedItem.node;
    reducible[lv] = reducedItem.next;

    let r = 0,
      g = 0,
      b = 0;
    let count = 0;
    for (let i = 0; i < 8; i++) {
      const child = node.children[i];
      if (!child) continue;
      r += child.redComponents;
      g += child.greenComponents;
      b += child.blueComponents;
      count += child.pixelCount;

      // reduce one leaf
      this.leafCount--;

      // recover the node
      // In TypeScript, we don't need to manually free memory like in C.
      // The garbage collector will automatically reclaim the memory when there are no more references to it.
      node.children[i] = null;
    }

    // set the value of upper level's node
    node.isLeaf = true;
    node.redComponents = r;
    node.greenComponents = g;
    node.blueComponents = b;
    node.pixelCount = count;

    // add one leaf
    this.leafCount++;
  }

  private buildOctree(pixels: BkrRgb[]): BkrOctreeNode | null {
    const root: BkrOctreeNode = new BkrOctreeNode();

    root.isLeaf = false;

    const pixelCount = pixels.length;
    for (let i = 0; i < pixelCount; i++) {
      // for each pixel, we add this color to this octree
      // via function `_bkr_octree_add_color` with
      // updating `this.leafCount` and `_reducible_list`
      this.addColor(root, pixels[i], 0, this.reducibleList);
    }

    return root;
  }

  private addColor(
    node: BkrOctreeNode,
    color: BkrRgb,
    level: number,
    reducible: Array<BkrOctreeReducibleListNode>
  ): void {
    if (node.isLeaf) {
      node.pixelCount++;
      node.redComponents += color.red;
      node.greenComponents += color.green;
      node.blueComponents += color.blue;
    } else {
      const red = (color.red >> (7 - level)) & 1;
      const green = (color.green >> (7 - level)) & 1;
      const blue = (color.blue >> (7 - level)) & 1;
      const idx = (red << 2) + (green << 1) + blue;

      let child = node.children[idx];
      if (!child) {
        child = new BkrOctreeNode();
        node.children[idx] = child;

        if (level === 7) {
          child.isLeaf = true;
          this.leafCount++;
        } else {
          reducible[level] = {
            node: child,
            next: reducible[level]
          };
        }
      }

      this.addColor(child, color, level + 1, reducible);
    }
  }

  private calculateColorStats(node: BkrOctreeNode, stats: BkrColorStats[]): number {
    if (node.isLeaf) {
      const r: number = Math.floor(node.redComponents / node.pixelCount);
      const g: number = Math.floor(node.greenComponents / node.pixelCount);
      const b: number = Math.floor(node.blueComponents / node.pixelCount);

      stats[0].count = node.pixelCount;
      stats[0].color.red = r;
      stats[0].color.green = g;
      stats[0].color.blue = b;
      stats[0].value = bkrRgbToInt32(r, g, b);

      return 1;
    }

    let _count = 0;
    for (let i = 0; i < 8; i++) {
      const child = node.children[i];
      if (child !== null) {
        _count += this.calculateColorStats(child, stats.slice(_count));
      }
    }

    // if it's a root node
    // if (node.isLeaf === 0xff) {
    //   stats.sort(statsCmp)
    // }

    return _count;
  }
}
