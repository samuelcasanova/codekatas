# https://www.codewars.com/kata/6574d1bde7484b5a56ec8f29/train/python
import unittest
import math

class Result:
    def __init__(self, repeating_char, difference):
        self.repeating_char = repeating_char
        self.difference = difference

class CharDifference:
    def __init__(self, last_position, min_difference):
        self.last_position = last_position
        self.min_difference = min_difference

def min_repeating_character_difference(text):
    dictionary = dict()
    best_result = Result(None, math.inf)
    for i, char in enumerate(text):
        if char in dictionary:
            previous_char_min_difference = dictionary[char].min_difference
            current_char_difference = i - dictionary[char].last_position
            new_min_difference = min(current_char_difference, previous_char_min_difference)
            dictionary[char] = CharDifference(i, new_min_difference)
            if new_min_difference < best_result.difference:
                best_result = Result(char, new_min_difference)
        else:
            dictionary[char] = CharDifference(i, math.inf)

    if (best_result.repeating_char == None):
        return None
    else:
        return (best_result.difference, best_result.repeating_char)

class TestMinimumDifference(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(min_repeating_character_difference('aabbca'), (1, 'a'))

    def test_case_2(self):
        self.assertEqual(min_repeating_character_difference('abded'), (2, 'd'))

    def test_case_3(self):
        self.assertEqual(min_repeating_character_difference('abbbbbc'), (1, 'b'))

    def test_case_4(self):
        self.assertEqual(min_repeating_character_difference('aa'), (1, 'a'))

    def test_case_5(self):
        self.assertEqual(min_repeating_character_difference('aba'), (2, 'a'))
    
    def test_case_6(self):
        self.assertIsNone(min_repeating_character_difference('abc'))

    def test_case_7(self):
        self.assertIsNone(min_repeating_character_difference('abcdefghijklmnñopqrstuvwxyz'))

    def test_case_8(self):
        self.assertEqual(min_repeating_character_difference('abacc'), (1, 'c'))

if __name__ == '__main__':
    unittest.main()
