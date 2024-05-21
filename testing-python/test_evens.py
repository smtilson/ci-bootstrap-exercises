import unittest
from evens import even_num_of_evens
from student import Student

class TestEvens(unittest.TestCase):
    
    def test_throws_error_if_val_passed_is_not_list(self):
        self.assertRaises(TypeError,even_num_of_evens,4)
    
    def test_vals_in_list(self):
        self.assertEqual(even_num_of_evens([]), False)
        self.assertEqual(even_num_of_evens([2,4]), True)
        self.assertEqual(even_num_of_evens([2,4,6]), False)
        self.assertEqual(even_num_of_evens([2,3,1]), False)
        self.assertEqual(even_num_of_evens([1,3,1]), False)

unittest.main()