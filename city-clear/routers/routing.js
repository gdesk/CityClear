const MongoClient = require("mongodb").MongoClient;
const URL = "mongodb://asw-19:asw-19@ds159963.mlab.com:59963/asw-19";
const boom = require('boom');

const USERS_PATH = "/users"; 
const USERS_COLLECTION = "users";

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
            return next(boom.badData("Inerimento incompleto!"));         

        mongoConnection
            .collection(USERS_COLLECTION)
            .findOne({ "email": req.body.email }, function (err, findOperation) {
                if (err) return next(boom.badImplementation(err));
                if (findOperation != null) 
                    return next(boom.badRequest(req.body.email + " already exist!"));
            
                var userData = {
                    email: req.body.email,
                    name: req.body.name,
                    birtdate: req.body.birtdate,
                    district: req.body.district,
                    password: req.body.password,
                    isLogin: false
                }

                mongoConnection
                    .collection(USERS_COLLECTION)
                    .insertOne(userData, function(err, insertOperation) {
                        if(err) return next(boom.badImplementation(err));
                        res.send("Utente creato correttamente. Effettua il login.");
                });
        });
    });

    routers.patch(USERS_PATH, function(req, res, next) {
        console.log("Receive login request");
        if (!req.body.email || !req.body.password)
            return next(boom.badData("Inerimento incompleto!"));

        mongoConnection
            .collection(USERS_COLLECTION)
            .findOne({ "email": req.body.email, "password": req.body.password }, function (err, findOperation) {
                if (err) return next(boom.badImplementation(err));
                if (findOperation == null) {
                    return next(boom.unauthorized(req.body.email + " Errore, dati non corretti"));
                }
            var userData = {
                email: req.body.email,
                password: req.body.password
            }
            var loginData = {$set: { isLogin: true}};
            mongoConnection
                .collection(USERS_COLLECTION)
                .updateOne(userData, loginData, function (err, updateOperation) {
                    if (err) return next(boom.badImplementation(err));
                    res.send(findOperation.email);
            });
        });
    });

    routers.get(USERS_PATH, function(req, res, next) {
        console.log("Receive get user info request");
        console.log("cazzo merda -- " + req.session)
        if (req.session.user == null) {
            return next(boom.badRequest("Errore di caricamento"));
        }
        mongoConnection
            .collection(USERS_COLLECTION)
            .findOne(req.session.email, function (err, findOperation) {
                if (err) return next(boom.unauthorized(err));
                res.send(findOperation);
        });
    });

    return routers
})();