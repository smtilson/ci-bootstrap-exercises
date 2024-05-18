import psycopg2

# connect to database
connection = psycopg2.connect(database="chinook")

# build a cursor
cursor = connection.cursor()

# queries
# Query 1
# cursor.execute('''SELECT * FROM "Artist" WHERE "Name"='Billy Cobham' ''')
cursor.execute("""SELECT * FROM "Album" WHERE "Title"='1000' """)
# fetch the results (multiple)
results = cursor.fetchall()

# for fetching a single thing we use
# results = cursor.fetchone()

# close connection
connection.close()

# display results
for result in results:
    print(result)
