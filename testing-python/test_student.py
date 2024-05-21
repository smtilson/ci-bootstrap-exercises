from datetime import date, timedelta
import unittest
from unittest.mock import patch
from student import Student

class TestStudent(unittest.TestCase):

    def setUp(self):
        self.student = Student("John","Doe")

    def tearDown(self):
        pass
    
    def test_full_name(self):
        self.assertEqual(self.student.full_name, "John Doe")
    
    def test_email(self):
        self.assertEqual(self.student.email, "john.doe@email.com")
    
    def test_alert_santa(self):
        self.student.alert_santa()
        self.assertTrue(self.student.naughty_list)
    
    def test_apply_extension(self):
        new_end_date = self.student.end_date + timedelta(days=20)
        self.student.apply_extension(days=20)
        self.assertEqual(self.student.end_date, new_end_date)

    def test_course_scheduler_ok(self):
        with patch("student.requests.get") as mocked_get:
            mocked_get.return_value.ok = True
            mocked_get.return_value.text = "Success"
            
            schedule = self.student.course_schedule()
            self.assertEqual(schedule, "Success")

    def test_course_scheduler_fail(self):
        with patch("student.requests.get") as mocked_get:
            mocked_get.return_value.ok = False
            mocked_get.return_value.text = "Something went wrong."
            
            schedule = self.student.course_schedule()
            self.assertEqual(schedule, "Something went wrong.")

    

if __name__ == "__main__":
    unittest.main()