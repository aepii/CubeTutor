import mysql.connector

database = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    passwd = 'Root@123'
)

cursor = database.cursor()
cursor.execute("CREATE DATABASE cubetutor")

print("Complete")