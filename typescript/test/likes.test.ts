import { likes } from "../src/likes";

describe('likes kata', () => {
    test('should work with an empty array', async () => {
        const result = likes([])

        expect(result).toBe('no one likes this')
    });

    test('should work with 1 person', () => {
        const result = likes(['John'])

        expect(result).toBe('John likes this')
    })

    test('should work with 2 people', async () => {
        const result = likes(['John', 'Peter'])

        expect(result).toBe('John and Peter like this')
    });
});