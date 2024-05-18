from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db = create_engine("postgresql:///chinook")
base = declarative_base()


# create new class based model
class Programmer(base):
    __tablename__ = "Programmer"
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    gender = Column(String)
    nationality = Column(String)
    famous_for = Column(String)


Session = sessionmaker(db)
session = Session()

base.metadata.create_all(db)


# adding new records
# C-create
# create instance of data model
"""ada_lovelace = Programmer(
    first_name="Ada",
    last_name="Lovelace",
    gender="F",
    nationality="British",
    famous_for="First programmer",
)"""

alan_turing = Programmer(
    first_name="Alan",
    last_name="Turing",
    gender="M",
    nationality="British",
    famous_for="Modern Computing",
)

grace_hopper = Programmer(
    first_name="Grace",
    last_name="Hopper",
    gender="F",
    nationality="American",
    famous_for="COBOL language",
)

margaret_hamilton = Programmer(
    first_name="Margaret",
    last_name="Hamilton",
    gender="F",
    nationality="American",
    famous_for="Apollo 11",
)

bill_gates = Programmer(
    first_name="Bill",
    last_name="Gates",
    gender="M",
    nationality="American",
    famous_for="Microsoft",
)

tim_berners_lee = Programmer(
    first_name="Tim",
    last_name="Berners-Lee",
    gender="M",
    nationality="American",
    famous_for="WWW",
)

sean_tilson = Programmer(
    first_name="Sean",
    last_name="Tilson",
    gender="M",
    nationality="American",
    famous_for="Inventor of the Omlette Sandwich",
)
# add instance to db session
# session.add(sean_tilson) commented out so it isn't added again

# commit session to db (save)
#session.commit()

# R-read
programmers = session.query(Programmer)
for programmer in programmers:
    print(programmer.id, programmer.first_name + " " + programmer.last_name)

#U-update
'''
people = session.query(Programmer)
for person in people:
    if person.gender=="F":
        person.gender = "Female"
    elif person.gender == "M":
        person.gender = "Male"
    else:
        print(f"Gender of {person.first_name} {person.last_name} not defined.")
        print(person.gender)
    session.commit() # why is this committed inside the for loop?
'''
# D-delete
fname = input("Please enter the first name.")
lname = input("Please enter the last name.")
results = session.query(Programmer).filter_by(first_name = fname, last_name = lname)
if results.first() is None:
    print("No records found matching that name.")
else:
    for programmer in results:
        print(f"{programmer.first_name} {programmer.last_name} --> {programmer.id}")

    id = input("Please enter the number of the programmer you would like to remove in order to confirm deletion.")
    record = session.query(Programmer).filter_by(id=id).first()
    if record is not None:
        session.delete(record)
        session.commit()
        print("Record deleted")

