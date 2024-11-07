import { Item, GildedRose, UpdatableItemFactory } from '../src/gilded-rose';

describe('Gilded Rose', () => {
  describe('When updateQuality()', () => {
    it('should preserve the item name', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('foo', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('foo');
    });
    it('should decrease the sellIn by one day', () => {
       const gildedRose = new GildedRose([UpdatableItemFactory.get('foo', 10, 10)]);
       const items = gildedRose.updateQuality();
       expect(items[0].quality).toBe(9);
    });
    it('should decrease quality by one with regular product', () => {
        const gildedRose = new GildedRose([UpdatableItemFactory.get('foo', 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(9);
    });
    it('should degrade Quality twice as fast once the sell by date has passed', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('foo', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
    });
    it('should degrade Quality unless it reaches zero', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('foo', 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
    it('should increase Quality of "Aged Brie" the older it gets', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('Aged Brie', 3, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    });
    it('should increase Quality twice as fast of "Aged Brie" the older it gets once the sell by date has passed', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('Aged Brie', 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(7);
    });
    it('should never increase Quality of an item more than 50', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('Aged Brie', 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
    it('should not decrease quality of "Sulfuras"', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('Sulfuras, Hand of Ragnaros', 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
    it('should increase quality of "Backstage passes" by 1 if there are more than 10 days to the concert', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('Backstage passes to a TAFKAL80ETC concert', 20, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });
    it('should increase quality of "Backstage passes" by 2 if there are X days left to the concert, 10 > X > 5', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });
    it('should increase quality of "Backstage passes" by 3 if there are less than 5 days left to the concert', () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
    });
    it('should decrease quality of "Conjured" item twice as fast as the rest', async () => {
      const gildedRose = new GildedRose([UpdatableItemFactory.get('Conjured', 5, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(3);
    });
  });
});