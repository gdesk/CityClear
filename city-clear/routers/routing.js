const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;
const boom = require('boom');

const URL = "mongodb://asw-19:asw-19@ds159963.mlab.com:59963/asw-19";

const USERS_PATH = "/users"; 
const USERS_COLLECTION = "users";

const POINT_PATH = "/point/add"; 
const POINT_COLLECTION = "point";

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
                    level: 1,
                    point: 5
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

    routers.put(DISTRICT_PATH, function(req, res, next) {
        console.log("Receive get district info request");
        console.log("session.user: " + req.session.user + " " + req.body.user);
        console.log("session: " + req.session)
        if(!req.body.user)
            return next(boom.badData("Inerimento incompleto!"));

        mongoConnection
            .collection(DISTRICT_COLLECTION)
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

    routers.patch(DISTRICT_PATH, function(req, res, next) {
        console.log("Receive modifier district password request");
        console.log("user " + req.body.user + " " + req.body.password);
        /*if (req.session.user == null)
            return next(boom.badImplementation("Errore nella sessione utente!"));*/
        if(!req.body.user)
            return next(boom.badData("Inerimento incompleto!"));
        mongoConnection
            .collection(DISTRICT_COLLECTION)
            .findOne({ "email": req.body.user }, function (err, findOperation) {
                if (err) return next(boom.badImplementation(err));
                if (findOperation == null) {
                    return next(boom.unauthorized( req.session.user + " Errore, dati non corretti"));
                }
            var districtData = {
                email: req.body.user
            }
            var passwordData = {$set: { "password": req.body.password}};
            mongoConnection
                .collection(DISTRICT_COLLECTION)
                .updateOne(districtData, passwordData, function (err, updateOperation) {
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
        
        var pic = new PicSchema({
            image: {
                data: Buffer, 
                contentType: String
            }
        });

        //var newPic = new pic();
        //newPic.image.data = fs.readFileSync(req.files.userPhoto.path)
        //newPic.image.contentType = 'image/png';
        //newPic.save();
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

    routers.post(POINT_PATH, function(req, res, next) {
        console.log("Receive create new point request");
        if (!req.body.user || !req.body.title || !req.body.description || !req.body.tag || !req.body.lat || !req.body.lng)
            return next(boom.badData("Inerimento incompleto!"));         

        mongoConnection
            .collection(USERS_COLLECTION)
            .findOne({ "email": req.body.email }, function (err, findOperation) {
                if (err) return next(boom.badImplementation(err));
                if (findOperation != null) 
                    return next(boom.badRequest(req.body.email + " non esiste!"));

                var pointData = {
                    user: req.body.user,
                    title: req.body.title,
                    description: req.body.description,
                    //image
                    tag: req.body.tag,
                    lat: req.body.lat,
                    lng: req.body.lng,
                    district: "Cesena" // TODO: METTERE A POSTO
                }

                mongoConnection
                    .collection(POINT_COLLECTION)
                    .insertOne(pointData, function(err, insertOperation) {
                        if(err) return next(boom.badImplementation(err));
                        res.send("Punto caldo creato correttamente.");
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

    //all markers
    routers.put("/allPoints", function(req, res, next) {
        console.log("Receive get all hot point");

        mongoConnection
            .collection(POINT_COLLECTION)
            .find().toArray((err, items) => {
                if (err) return next(boom.unauthorized(err))
                res.json(items);
        });
    });

    //all discussions
    routers.put("/allDiscussion", function(req, res, next) {
        console.log("Receive all discussions in the forum");
        const discussion_collection = req.body.collection;

        mongoConnection
            .collection(discussion_collection)
            .find().toArray((err, items) => {
                if (err) return next(boom.unauthorized(err));
                res.json(items);
        });
    });

    //single discussion
    routers.put("/singleDiscussion", function(req, res, next) {
        console.log("Receive get single discussion --> "+ req.body.id);
        const discussion_collection = req.body.collection;
    
        mongoConnection
            .collection(discussion_collection)
            .find({_id: ObjectId(req.body.id)}).toArray((err, findOperation) => {
                console.log("res: " + findOperation);
                if (err) return next(boom.unauthorized(err));
                res.send(findOperation);
        });
    });

    //add comment
    routers.put("/addComment", function(req, res, next) {
        console.log("Add comment in single discussion");
        const discussion_collection = req.body.collection;
        
        mongoConnection
            .collection(discussion_collection)
            .update({_id: ObjectId(req.body.id)},
            {"$push": 
                {"comments": 
                    {
                        "user": req.body.user,
                        "date": req.body.date, 
                        "comment": req.body.comment
                    }
                }
            });
    });

    //all events
    routers.put("/allEvent", function(req, res, next) {
        console.log("Receive get all events in the forum");

        mongoConnection
            .collection("events")
            .find().sort({eventDate:1}).toArray((err, items) => {
                if (err) return console.log(err);
                res.json(items);
        });
    });

    //single event
    routers.put("/singleEvent", function(req, res, next) {
        console.log("Receive get single event ");
        
        mongoConnection
            .collection("events")
            .find({_id: ObjectId(req.body.id)}).toArray((err, findOperation) => {
                console.log("res: " + findOperation);
                if (err) return next(boom.unauthorized(err));
                res.send(findOperation);
        });
    });

    routers.patch("/users/addPartecipant", function(req, res, next) {
        console.log("add Partecipant Request  "+ req.body.user +"    "+ req.body.id);

        mongoConnection
            .collection("events")
            .findOne({_id: ObjectId(req.body.id)},(err, findOperation) => {
                console.log("res: " + findOperation.data);
                if (err) return next(boom.unauthorized(err));

                var partecipantData = {"$push": {"partecipants": req.body.user}};

                mongoConnection
                    .collection("events")
                    .update({_id: ObjectId(req.body.id)}, partecipantData, function (err, updateOperation) {
                    if (err) return next(boom.badImplementation(err));
                    res.send("Add partecipant");
            });
        });
    });

    //create event
    routers.post("/createEvent", function(req, res, next) {
        console.log("Create an event")
        var newEvent= {
            title: req.body.title,
            description: req.body.description,
            fullname: req.body.fullname,
            username: req.body.username,
            date: new Date().toLocaleDateString(),
            eventDate: req.body.eventDate,
            hour: req.body.hour,
            location: req.body.location,
            people: 1
        }
        mongoConnection
            .collection("events")
            .insertOne(newEvent, function(err, insertOperation) {
                if(err) return next(boom.badImplementation(err));
                res.json(insertOperation);
            });
        
    });
        
    //create discussion
    routers.post("/createDiscussion", function(req, res, next) {
        console.log("Create a discussion")
        var newDiscussion= {
            title: req.body.title,
            description: req.body.description,
            fullname: req.body.fullname,
            username: req.body.username,
            date: new Date().toLocaleDateString(),
            comments:[]
        }
        mongoConnection
            .collection("cesena.discussions")
            .insertOne(newDiscussion, function(err, insertOperation) {
                if(err) return next(boom.badImplementation(err));
                res.json(insertOperation);
            });
        
    });

    //increment people's number in single event
    routers.patch("/modifiedPeople", function(req, res, next) {
        console.log("Add people in single event");
        
        mongoConnection
            .collection("events")
            .updateOne({_id: ObjectId(req.body.id)},
            {"$set": 
                {
                    "people": req.body.people 
                }
            });
    });

    routers.patch("/users/point", function(req, res, next) {
        console.log("Receive increment user poin request");
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
            var pointData = {$set: { "point": req.body.point, "level": req.body.level}};
            mongoConnection
                .collection(USERS_COLLECTION)
                .updateOne(userData, pointData, function (err, updateOperation) {
                    if (err) return next(boom.badImplementation(err));
                    res.send("Punti modificati correttamente.");
            });
        });
    });

    routers.put("/users/point", function(req, res, next) {
        console.log("Receive get user poin request");
        if(!req.body.user)
            return next(boom.badData("Inerimento incompleto!"));
        mongoConnection
            .collection(USERS_COLLECTION)
            .findOne({ "email": req.body.user }, function (err, findOperation) {
                if (err) return next(boom.badImplementation(err));
                res.send(findOperation);
        });
    });
    routers.get("/count/members", function(req, res, next) {
        console.log("Receive count user in district request");
        mongoConnection
            .collection(USERS_COLLECTION)
            .count(function (err, countOperation) {
                if (err) return next(boom.badImplementation(err));
                res.send(countOperation.toString());
        });
    });
    routers.get("/count/tags", function(req, res, next) {
        console.log("Receive count tag in district request");
        mongoConnection
            .collection(POINT_COLLECTION)
            .count(function (err, countOperation) {
                if (err) return next(boom.badImplementation(err));
                res.send(countOperation.toString());
        });
    });

    routers.get("/count/tag/spazzatura", function(req, res, next) {
        console.log("Receive count spazzatura tag in district request");
        mongoConnection
            .collection(POINT_COLLECTION)
            .find({"tag": "Spazzatura"})
            .count(function (err, countOperation) {
                if (err) return next(boom.badImplementation(err));
                res.send(countOperation.toString());
        });
    });

    routers.get("/count/tag/storico", function(req, res, next) {
        console.log("Receive count patrimonio tag in district request");
        mongoConnection
            .collection(POINT_COLLECTION)
            .find({"tag": "Patrimonio culturale o artistico"})
            .count(function (err, countOperation) {
                if (err) return next(boom.badImplementation(err));
                res.send(countOperation.toString());
        });
    });
    
    routers.get("/count/tag/strada", function(req, res, next) {
        console.log("Receive count strada tag in district request");
        mongoConnection
            .collection(POINT_COLLECTION)
            .find({"tag": "Strada dissestata"})
            .count(function (err, countOperation) {
                if (err) return next(boom.badImplementation(err));
                res.send(countOperation.toString());
        });
    });

    routers.get("/count/tag/altro", function(req, res, next) {
        console.log("Receive count altro tag in district request");
        mongoConnection
            .collection(POINT_COLLECTION)
            .find({"tag": "Altro"})
            .count(function (err, countOperation) {
                if (err) return next(boom.badImplementation(err));
                res.send(countOperation.toString());
        });
    });

    //resolve point
    routers.put("/resolvePoint", function(req, res, next){
        console.log("Resolve Problems  "+ req.body.id);

        mongoConnection
            .collection(POINT_COLLECTION)
            .deleteOne({_id: ObjectId(req.body.id) }, function(err, operation){
                res.send(operation.toString())
            
            });
    });

    return routers
})();