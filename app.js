
//inmporting required modules
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
const dbConnection = require('./db');


app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


//demo api
app.get('/', (req, res) => res.send('Hello World!'))



/*
api to register users
Sample json request :

{
	"name":"Subham",
	"address":"kolkata"
}

*/

app.post('/register', function (req, res) {

    //Storing parameters recieved from HTTP request
    var name = req.body.name;
    var address = req.body.address;

 

    //creating mysql connection by using calling dbConnection() declared in db.js 
    var connection = dbConnection.dbConnection();

    try {

        connection.connect(function (err) {
            //declaring sql statement to be executed to check number of users in Users table

            var sql_to_check_number_of_users =
                `select count(*) as number_of_users from test.Users`;

            connection.query(sql_to_check_number_of_users, function (err, result, fields) {
                var result_string = JSON.stringify(result);
                var result_json = JSON.parse(result_string);

                var role = '';
                //assigning 'admin' role to the first user and 'user' role to all subsequent users
                if (result_json[0].number_of_users == 0) {
                    role = 'admin';
                }
                else {
                    role = 'user';
                }

                //declaring sql statement to be executed to insert records in Users and User_Roles table

                var sql_to_insert_users =
                   `INSERT INTO test.Users(name, address) 
                    VALUES ('${name}', '${address}');
                    
                    INSERT INTO test.User_Roles(role) 
                    VALUES ('${role}');`;

                connection.query(sql_to_insert_users, function (err, result) {

                    if (result) {
                        res.status(200).send({ message: 'success' });

                    }
                });
            });



        });

    }
    catch (e) {

        res.status(500).send({ message: 'error' });


    }

});





app.listen(3000, function () {
    console.log('App listening on port 3000!');
});