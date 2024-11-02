import { Challenge } from "../src/multiples-of-3-and-5";

function test(num: number, expected: number) {
    expect(Challenge.solution(num)).toBe(expected);
}

describe("solution", function(){
  it("should handle basic tests", function() {
    test(-20, 0);
    test(2, 0);
    test(3, 0);
    test(4, 3);
    test(10, 23);
    test(20, 78);
  });
});