import { Item, GildedRose } from '../src/gilded-rose';

describe('Gilded Rose', () => {
  describe('When updateQuality()', () => {
    it('should preserve the item name', () => {
      const gildedRose = new GildedRose([new Item('foo', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('foo');
    });
    it('should decrease the sellIn by one day', () => {
       const gildedRose = new GildedRose([new Item('foo', 10, 10)]);
       const items = gildedRose.updateQuality();
       expect(items[0].quality).toBe(9);
    });
    it('should decrease quality by one with regular product', () => {
        const gildedRose = new GildedRose([new Item('foo', 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(9);
    });
  });
});