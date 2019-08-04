const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const URL = "mongodb://asw-19:asw-19@ds159963.mlab.com:59963/asw-19";
const boom = require('boom');

const USERS_PATH = "/users"; 
const USERS_COLLECTION = "users";

const DISTRICT_PATH = "/district"; 
const DISTRICT_COLLECTION = "district";

MongoClient.connect(URL,  { useNewUrlParser: true }, function(err, db) {
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

    routers.put("/login", function(req, res, next) {
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
                console.log("session: " + req.session.save.name)
                req.session.user = findOperation.email;
                console.log("user " + req.session.user)
                res.send(req.session.user);
            });
    });

    routers.put(USERS_PATH, function(req, res, next) {
        console.log("Receive get user info request");
        console.log("session.user: " + req.session.user + " " + req.body.user);
        console.log("session: " + req.session)
        if(!req.body.user)
            return next(boom.badData("Inerimento incompleto!"));

        mongoConnection
            .collection(USERS_COLLECTION)
            .findOne({"email": req.body.user}, function (err, findOperation) {
                console.log("Dati: " + findOperation);
                if (err) return next(boom.unauthorized(err));
                res.send(findOperation);
        });
    });

    routers.put("/logout", function (req, res, next) {
        console.log("Receive logout request");
        /* if (req.session.user == null) {
            console.log("error");
            return next(boom.badRequest("Cannot logout if not logged-in"));
        } */
        req.session.destroy(function (err) {
          if (err) return next(boom.badImplementation(err));
          console.log("ok");
          res.send("ok");
        });
    });

    routers.patch(USERS_PATH, function(req, res, next) {
        console.log("Receive modifier user password request");
        console.log("user " + req.body.user + " " + req.body.password);
        /*if (req.session.user == null)
            return next(boom.badImplementation("Errore nella sessione utente!"));*/
        if(!req.body.user)
            return next(boom.badData("Inerimento incompleto!"));
        mongoConnection
            .collection(USERS_COLLECTION)
            .findOne({ "email": req.body.user }, function (err, findOperation) {
                if (err) return next(boom.badImplementation(err));
                if (findOperation == null) {
                    return next(boom.unauthorized( req.session.user + " Errore, dati non corretti"));
                }
            var userData = {
                email: req.body.user
            }
            var passwordData = {$set: { "password": req.body.password}};
            mongoConnection
                .collection(USERS_COLLECTION)
                .updateOne(userData, passwordData, function (err, updateOperation) {
                    if (err) return next(boom.badImplementation(err));
                    res.send("Password modificata correttamente.");
            });
        });
    });

    routers.patch("/users/uploadFile", function(req, res, next) {
        console.log("Receive modifier user photo request");
        /*if (req.session.user == null)
            return next(boom.badImplementation("Errore nella sessione utente!"));*/
        if(!req.body.user)
            return next(boom.badData("Inerimento incompleto!"));
        mongoConnection
            .collection(USERS_COLLECTION)
            .findOne({ "email": req.body.user }, function (err, findOperation) {
                if (err) return next(boom.badImplementation(err));
                if (findOperation == null) {
                    return next(boom.unauthorized( req.session.user + " Errore, dati non corretti"));
                }
            var userData = {
                email: req.body.user
            }
            var photo = {$set: { "photo": req.body.photo}};
            mongoConnection
                .collection(USERS_COLLECTION)
                .updateOne(userData, photo, function (err, updateOperation) {
                    if (err) return next(boom.badImplementation(err));
                    res.send("Foto modificata correttamente.");
            });
        });
    });

    routers.put("/loginDistrict", function(req, res, next) {
        console.log("Receive district login request");
        if (!req.body.email || !req.body.district || !req.body.password)
            return next(boom.badData("Inerimento incompleto!"));

        mongoConnection
            .collection(DISTRICT_COLLECTION)
            .findOne({ "email": req.body.email, "district": req.body.district, "password": req.body.password }, function (err, findOperation) {
                if (err) return next(boom.badImplementation(err));
                if (findOperation == null) {
                    return next(boom.unauthorized(req.body.email + " Errore, dati non corretti"));
                }
                res.send(findOperation.email);
        });
    });

    return routers
})();