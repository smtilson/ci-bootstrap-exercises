from datetime import date, timedelta
import requests

class Student:
    ''''''
    def __init__(self, first_name, last_name):
        self._first_name = first_name
        self._last_name = last_name
        self._start_date = date.today()
        self.end_date = date.today() + timedelta(days=365)
        self.naughty_list = False
    
    @property
    def full_name(self):
        return f"{self._first_name} {self._last_name}"
    
    @classmethod
    def dumb(cls):
        print("dumb")

    @property
    def email(self):
        return f"{self._first_name}.{self._last_name}@email.com".lower()

    def alert_santa(self):
        self.naughty_list = True
    
    def apply_extension(self, days:int):
        self.end_date += timedelta(days=days)
    
    def course_schedule(self):
        response = requests.get(f"http://company.com/course-schedule/{self._last_name}/{self._first_name}")

        if response.ok:
            return response.text
        else:
            return "Something went wrong."

student = Student("John", "Doe")
student.dumb()