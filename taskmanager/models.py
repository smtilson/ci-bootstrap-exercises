from taskmanager import db # we don't have to import all of the column types from SQLAlchemy since we can access them through this object

class Category(db.Model):
    # schema for Category tablee
    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(25), unique=True, nullable=False)
    tasks = db.relationship("Task", backref="category", cascade="all, delete", lazy=True)

    def __repr__(self):
        return self.category_name
    
class Task(db.Model):
    # schema for Task table
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(50), unique=True, nullable=False)
    task_description = db.Column(db.Text, nullable=False)
    is_urgent = db.Column(db.Boolean, default=False, nullable=False)
    due_date = db.Column(db.Date, nullable=False) # you could have time included as well, there are models for that
    category_id = db.Column(db.Integer, db.ForeignKey("category.id", ondelete="CASCADE"), nullable=False)

    def __repr__(self):
        return f"#{self.id} - Task: {self.task_name} | Urgent: {self.urgent}"