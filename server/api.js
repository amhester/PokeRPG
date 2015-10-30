/**
 * Created by amhes_000 on 6/24/2015.
 */
var restify = require('restify');
var chalk = require('chalk');
var db = require('mongoose');
db.connect('mongodb://localhost/PokeRPG');
var passHash = require('password-hash');
var User = require('../server/models/UserModel');
var jwt = require('jsonwebtoken');
var appConfig = require('../app.config.json');

/* ----------------  Stuff to be refactored out at some point  ----------------- */


//Custom authentication check for requests
function authenticateRequest(req, res, next) {
    var authHeader = req.header('Authorization');
    var authHeaderToken = authHeader && authHeader.split(' ').length > 1 ? authHeader.split(' ')[1] : '';
    if (req.url == '/token') {
        console.log('not authorized, seeking authentication');
        next();
    } else if (req.method == 'POST' && req.url == '/user') {
        console.log('not authorized, creating a user.');
        next();
    } else if (authHeader) {
        jwt.verify(authHeaderToken, appConfig.appSecret, function (err, payload) {
            if(err) {
                console.log('Unauthorized Access.');
                res.send(403, "Unauthorized Access.");
            } else {
                req.authContext = payload;
                console.log('authorized request');
                next();
            }
        });
    } else {
        console.log('Unauthorized Access.');
        res.send(403, "Unauthorized Access.");
    }
}

function enableCors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
}

/* ---------------------------------------------------------------------------- */

//Create server object with necessary options sent in
var server = restify.createServer({
    name: 'my-badAss-server'
});

//Global restify server event handling
server.on('uncaughtException', function (request, response, route, error) {
    console.error(error);
    response.send(500, 'Unknown Server Exception.');
});

//Generic handlers for any incoming request (careful, executed in order!)
server.use(enableCors);
server.use(restify.acceptParser(server.acceptable));
server.use(authenticateRequest);
//server.use(restify.CORS());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());

//Actual api routes
//Token route for authentication
server.post('/token', function (req,res, err) {
    console.log('Looking for a token...');
    console.log('email: ' + req.params.email + '; password: ' + req.params.password);
    User.authenticate(req.params.email, req.params.password, function (results) {
        if(results.ok) {
            var token = jwt.sign({user: results.user}, appConfig.appSecret, {});
            res.send(200, {token: token});
            console.log(token);
        } else {
            res.send(400, "Bad Request");
        }
    });
});

//Account user routes
var userPath = '/user';
server.get(userPath, function (req, res, err) {
    User.find({}, 'email', function (error, docs) {
        if(error) {
            res.send(400, 'No users found');
        } else {
            res.send(200, docs);
        }
    });
});

server.get(userPath + '/:id', function (req, res, err) {
    User.findById(req.params.id, 'email', function (error, doc) {
        if(error) {
            res.send(400, 'Bad Request.');
        } else {
            res.send(200, doc);
        }
    });
});

server.put(userPath + '/:id', function (req, res, err) {
    User.findOneAndUpdate({ _id: req.params.id }, { email: req.params.email }, function (error, doc) {
        if(error) {
            res.send(400, 'Bad Request.');
        } else {
            res.send(200, doc);
        }
    });
});

server.post(userPath, function (req, res, err) {
    console.log('hit post user...');

    var newUser = new User({
        email: req.params.email,
        password: req.params.password
    });

    newUser.save(function (error) {
        if(error) {
            console.error(error);
            res.send(500, 'Error creating user.\\n' + error);
        }
        res.send(200, 'User successfully created.');
    });
});

server.del(userPath + '/:id', function (req, res, err) {
    User.remove({ _id: req.params.id}, function (error) {
        if(error) {
            res.send(400, 'Bad Request.');
        } else {
            res.send(200, 'User Successfully Deleted.');
        }
    });
});

process.on('exit', function () {
    db.connection.close();
});

//Start server listening...
server.listen(8090, '127.0.0.1', function () {
    console.log(chalk.green('api running, listening on 127.0.0.1:8090'));
});