const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://asw-19:asw-19@ds159963.mlab.com:59963/asw-19";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    mongoConnection = db.db(db.s.options.dbName);
});

module.exports = (function() {
    "use strict"; // global declaration for use strict (not syntax error)

    var routers = require("express").Router();

    routers.post("/users", function(req, res, next) {
        if (!req.body.email || !req.body.name || !req.body.birtdate || !req.body.password)
            console.log("Eror request, gestione codice errore.")

        var userData = {
            email: req.body.email,
            name: req.body.name,
            birtdate: req.body.birtdate,
            password: req.body.password
        }
            
        mongoConnection.collection("users").insertOne(userData, function(err, insertOperation) {
            if(err) console.log("gestire http error, devo guardarci");
            res.send("Succeded create user.")
        })
    });
    return routers
})();