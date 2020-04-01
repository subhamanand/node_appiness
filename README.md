# node_appiness
A simple node js application to register users and store data in MySql database.


Steps to set up and run the application:

Run the command: "git clone https://github.com/subhamanand/node_appiness.git" in a directory.

Make sure Node js and MySql is installed on the system. You can follow the given links if it's not installed :

Node js : https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04

MySql : https://linuxize.com/post/how-to-install-mysql-on-ubuntu-18-04/

Once Node js and MySQl are setup we can proceed with the next steps.

Open the project directory in terminal : node_appiness

Open the file 'db.js' and edit the MySql credentials:
MysqlHost: MySql Hostname
MysqlUser: Mysql Username
MysqlPass: MySql Password
MysqlPort: port on which MySql in running (3306 by default)

Now you need to execute the 1 script to create the database and tables in MySQL.

Run the command : node db_setup.js. 
This script will do the following tasks:
i. Create a MySql databse named as 'test'
ii. Create table named as 'Users' to store user records.
ii. Create table named as 'User_Roles' to store user roles.


Run the command : node app.js This command will run the Node js server and make all the REST API accessible. It will run on http://localhost:3000/ In the browser you can go to http://localhost:3000/ to verify. The application is running if it shows Hello World!



API DETAILS:

/register : To register user and insert user details in MySql tables, Type: POST

Sample JSON Request:

{
	
	"name":"Subham",
	"address":"kolkata"
}

The first user will be allocated the role of 'admin' in User_Roles table and all subsequent users will be allocated the role of 'admin' in Users table.
There is a primary key - Foreign key relationship between the two tables based on id.