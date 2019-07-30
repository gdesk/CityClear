const MongoClient = require("mongodb").MongoClient;
const URL = "mongodb://asw-19:asw-19@ds159963.mlab.com:59963/asw-19";

const USERS_PATH = "/users"; 
const USERS_COLLECTION = "users";
const LOG_CLIENT_ERRORS = true;
const LOG_SERVER_EVENTS = false;

MongoClient.connect(URL, function(err, db) {
    if (err) throw err;
    mongoConnection = db.db(db.s.options.dbName);
});

module.exports = (function() {
    "use strict"; // global declaration for use strict (not syntax error)

    var routers = require("express").Router();

    routers.post(USERS_PATH, function(req, res, next) {
        console.log("Receive create new user request");
        if (!req.body.email || !req.body.name || !req.body.birtdate || !req.body.password)
            console.log("Error request, gestione codice errore.")

        var userData = {
            email: req.body.email,
            name: req.body.name,
            birtdate: req.body.birtdate,
            password: req.body.password
        }

        mongoConnection
            .collection(USERS_COLLECTION).insertOne(userData, function(err, insertOperation) {
                if(err) console.log("gestire http error, devo guardarci");
                res.send("Succeded create user.")
        });
    });

    //routers.get(USERS_PATH, function(req, res, next) {
    //});

    return routers
})();