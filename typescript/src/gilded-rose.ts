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
    const AGED_BRIE_NAME = 'Aged Brie';
    const SULFURAS_NAME = 'Sulfuras, Hand of Ragnaros';
    const BACKSTAGE_PASSES_NAME = 'Backstage passes to a TAFKAL80ETC concert';
    const CONJURED_NAME = 'Conjured';

    if (name === AGED_BRIE_NAME || name === SULFURAS_NAME) {
      return new AgingItem(name, sellIn, quality);
    }
    if (name === BACKSTAGE_PASSES_NAME) {
      return new BackstagePass(name, sellIn, quality);
    }
    if (name === CONJURED_NAME) {
      return new ConjuredItem(name, sellIn, quality);
    }
    return new RegularItem(name, sellIn, quality);
  }
}

const QUALITY_STEP = 1;
const DEFAULT_QUALITY_STEP_FACTOR = 1;
const NO_QUALITY = 0;
const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const MIN_SELLIN = 0;
const SELLIN_STEP = 1;
export abstract class UpdatableItem extends Item {
  abstract update(): void;

  protected decreaseSellin() {
    this.sellIn = this.sellIn - SELLIN_STEP;
  }  

  protected increaseQuality(qualityStepFactor = DEFAULT_QUALITY_STEP_FACTOR) {
    if (this.quality < MAX_QUALITY) {
      this.quality = this.quality + qualityStepFactor * QUALITY_STEP;
    }
  }  

  protected dropQuality() {
    this.quality = NO_QUALITY;
  }

  protected isOutdated() {
    return this.sellIn < MIN_SELLIN;
  }

  protected decreaseQuality(factor = DEFAULT_QUALITY_STEP_FACTOR) {
    if (this.quality > MIN_QUALITY) {
      this.quality = this.quality - factor * QUALITY_STEP;
    }
  }  
}

const AGING_OUTDATED_FACTOR = 2;
const AGING_IN_SELLIN_FACTOR = 1;
export class AgingItem extends UpdatableItem {
  override update() {
    this.decreaseSellin();

    const qualityStepFactor = this.isOutdated() ? AGING_OUTDATED_FACTOR : AGING_IN_SELLIN_FACTOR;
    this.increaseQuality(qualityStepFactor * QUALITY_STEP);
  }
}

export class RegularItem extends UpdatableItem {
  override update() {
    this.decreaseSellin();

    this.decreaseQuality();
    if (this.sellIn < MIN_SELLIN) {
      this.decreaseQuality();
    }      
  }
}

const CONJURED_QUALITY_DEGRADING_FACTOR = 2
export class ConjuredItem extends UpdatableItem {
  override update() {
    this.decreaseSellin();
    this.decreaseQuality(CONJURED_QUALITY_DEGRADING_FACTOR);
  }
}

const BACKSTAGE_PASS_UPPER_THRESHOLD_LIMIT = 11;
const BACKSTAGE_PASS_LOWER_THRESHOLD_LIMIT = 6;
const BACKSTAGE_PASSES_UPPER_THRESHOLD_QUALITY_FACTOR = 2;
const BACKSTAGE_PASSES_LOWER_THRESHOLD_QUALITY_FACTOR = 3;
export class BackstagePass extends UpdatableItem {
  override update() {
    this.decreaseSellin();
    
    if (this.isOutdated()) {
        this.dropQuality();
    } else if (this.isAboveUpperThreshold()) {
      this.increaseQuality();
    } else if (this.isInUpperThreshold()) {
      this.increaseQuality(BACKSTAGE_PASSES_UPPER_THRESHOLD_QUALITY_FACTOR);
    } else if (this.isInLowerThreshold()) {
      this.increaseQuality(BACKSTAGE_PASSES_LOWER_THRESHOLD_QUALITY_FACTOR);
    }
  }

  isAboveUpperThreshold() {
    return this.sellIn >= BACKSTAGE_PASS_UPPER_THRESHOLD_LIMIT
  }

  isInUpperThreshold() {
    return this.sellIn >= BACKSTAGE_PASS_LOWER_THRESHOLD_LIMIT && this.sellIn < BACKSTAGE_PASS_UPPER_THRESHOLD_LIMIT
  }

  isInLowerThreshold() {
    return this.sellIn > MIN_SELLIN && this.sellIn < BACKSTAGE_PASS_LOWER_THRESHOLD_LIMIT
  }
}

export class GildedRose {
  items: Array<UpdatableItem>;

  constructor(items = [] as Array<UpdatableItem>) {
    this.items = items;
  }

  updateQuality() {
    for(const item of this.items) {
      item.update();
    }

    return this.items;
  }
}

