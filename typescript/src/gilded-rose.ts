// https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/main/GildedRoseRequirements.md
export class Item {
    name: string;
    sellIn: number;
    quality: number;
  
    constructor(name: string, sellIn: number, quality: number) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  }

  export class UpdatableItemFactory {
    static get(name: string, sellIn: number, quality: number): UpdatableItem {
      if (name === 'Aged Brie') {
        return new AgedBrie(name, sellIn, quality);
      }
      return new AgedBrie(name, sellIn, quality);
    }
  }
  
  export abstract class UpdatableItem extends Item {
    abstract update(): void;

    decreaseSellin() {
      this.sellIn = this.sellIn - SELLIN_STEP;
    }  

    increaseQuality(qualitySteps = 1) {
      if (this.quality < MAX_QUALITY) {
        this.quality = this.quality + qualitySteps * QUALITY_STEP;
      }
    }  
  }

  export class AgedBrie extends UpdatableItem {
    override update() {
      this.decreaseSellin();

      const qualitySteps = this.sellIn < MIN_SELLIN ? 2 : 1;
      this.increaseQuality(qualitySteps);
    }
  }

  const QUALITY_STEP = 1;
  const NO_QUALITY = 0;
  const MIN_QUALITY = 0;
  const MAX_QUALITY = 50;
  const BACKSTAGE_PASS_UPPER_THRESHOLD_LIMIT = 11;
  const BACKSTAGE_PASS_MID_THRESHOLD_LIMIT = 6;
  const MIN_SELLIN = 0;
  const SELLIN_STEP = 1;

  export class GildedRose {
    items: Array<UpdatableItem>;
  
    constructor(items = [] as Array<UpdatableItem>) {
      this.items = items;
    }
  
    updateQuality() {
      for(const item of this.items) {
        if (isAgedBrie(item)) {
          item.update();
          break;
        }
        if (!isAgedBrie(item) && !isBackstagePass(item) && !isSulfuras(item)) {
            decreaseQuality(item);
        } else {
          increaseQuality(item);
          if (isBackstagePass(item)) {
            if (item.sellIn < BACKSTAGE_PASS_UPPER_THRESHOLD_LIMIT) {
              increaseQuality(item);
            }
            if (item.sellIn < BACKSTAGE_PASS_MID_THRESHOLD_LIMIT) {
              increaseQuality(item);
            }
          }
        }
        if (!isSulfuras(item)) {
          decreaseSellin(item);
        }
        if (item.sellIn < MIN_SELLIN) {
          if (!isBackstagePass(item)) {
            if (isAgedBrie(item) || isSulfuras(item)) {
              increaseQuality(item);
            } else {
              decreaseQuality(item);
            }
          } else {
            if (isAgedBrie(item)) {
              increaseQuality(item);
            } else {
              dropQuality(item);
            }
          }
        }
      }

      return this.items;
    }
  }

  function decreaseSellin(item: Item) {
    item.sellIn = item.sellIn - SELLIN_STEP;
  }

  function isBackstagePass(item: Item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  function isAgedBrie(item: Item) {
    return item.name === 'Aged Brie';
  }

  function isSulfuras(item: Item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  function dropQuality(item: Item) {
    item.quality = NO_QUALITY;
  }

  function increaseQuality(item: Item) {
    if (item.quality < MAX_QUALITY) {
      item.quality = item.quality + QUALITY_STEP;
    }
  }

  function decreaseQuality(item: Item) {
    if (item.quality > MIN_QUALITY) {
      item.quality = item.quality - QUALITY_STEP;
    }
  }
