export class Challenge {
    static solution(number: number) {
        return this.iterativeSolution(number);
    }

    private static recursiveSolution(number: number, acc: number): number {
        if (number < 3) {
            return 0;
        }
        if (number === 3) {
            return acc + number;
        }
        if (this.isMultipleOf(number, 3) || this.isMultipleOf(number, 5)) {
            return this.recursiveSolution(number - 1, acc + number);
        }
        return this.recursiveSolution(number - 1, acc);
    }

    private static iterativeSolution(number: number) {
        if (number < 4) {
            return 0;
        }
        let acc = 0;
        while (--number >= 3) {
            if (this.isMultipleOf(number, 3) || this.isMultipleOf(number, 5)) {
                acc += number
            }
        }
        return acc;
    }

    private static isMultipleOf(number: number, multipleOf: number): boolean {
        return number % multipleOf === 0;
    }
  }