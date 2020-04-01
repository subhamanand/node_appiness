const dbConnection = require('./db');


//calling createdb function
createDb();

/*
createDb will do the following:
1.create mysql database named as 'test' 
2.create table named as 'Users' in the database 'test'
3.create table named as 'User_Roles' in the database 'test'
*/


function createDb() {

  //creating mysql connection by using calling dbConnection() declared in db.js 
  var connection = dbConnection.dbConnection();



  connection.connect(function (err) {
    //declaring sql statement to be executed to create database test

    var sql_to_create_db = `CREATE DATABASE IF NOT EXISTS test`
    connection.query(sql_to_create_db, function (err, result) {
      if (err) throw err;
      //declaring sql statement to be executed to create Users table
      var sql_to_create_users_table =
        `CREATE TABLE test.Users (id INT AUTO_INCREMENT PRIMARY KEY,
           name VARCHAR(255), address VARCHAR(255))`;

      //executing sql_to_create_users_table query 
      connection.query(sql_to_create_users_table, function (err, result) {


        if (result) {

          //declaring sql statement to be executed to create User_Roles table

          var sql_to_create_user_roles_table =
            `CREATE TABLE test.User_Roles (id INT AUTO_INCREMENT PRIMARY KEY,
             role VARCHAR(255),foreign key (id) references Users(id) on delete cascade)`;

          //executing sql_to_create_user_roles_table query 

          connection.query(sql_to_create_user_roles_table, function (err, result) {
            if (result) {
              console.log('Successfull operation!');
            }
          });
        }

      });

    });
  });

}
