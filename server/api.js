/**
 * Created by amhes_000 on 6/24/2015.
 */
var restify = require('restify');
var db = require('mongoose');
db.connect('mongodb://localhost/PokeRPG');
var passHash = require('password-hash');
var User = require('../server/models/UserModel');

/* ----------------  Stuff to be refactored out at some point  ----------------- */
//Some convienance methods
function authStoreHasToken(token) {
    for(var i =  0; i < authTokenStore.length; i++) {
        if(authTokenStore[i].token == token) {
            return true;
        }
    }
    return false;
}

//Used to store an object with token and userId for all currently signed in users (e.g. { token: 345=Gd2!d, id: 45 })
var authTokenStore = [];

//Custom authentication check for requests
function authenticateRequest(req, res, next) {
    var authHeader = req.header('Authorization');
    var authHeaderToken = authHeader && authHeader.split(' ').length > 1 ? authHeader.split(' ')[1] : '';
    console.log('current auth header' + authHeader);
    console.log('current auth token, if it exists: ' + authHeaderToken);
    console.log('tokenStore has token? ' + authStoreHasToken(authHeaderToken));
    if(authHeader && authStoreHasToken(authHeaderToken)) {
        console.log('authorized request');
        next();
    } else if (req.url == '/token') {
        console.log('not authorized, seeking authentication');
        next();
    } else if (req.method == 'POST' && req.url == '/user') {
        console.log('not authorized, creating a user.');
        next();
    } else {
        res.send(403, "Unauthorized Access.");
    }
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
server.use(restify.acceptParser(server.acceptable));
server.use(authenticateRequest);
server.use(restify.CORS());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());

//Actual api routes
//Token route for authentication
server.post('/token', function (req,res, err) {
    console.log('Looking for a token...');
    User.authenticate(req.params.email, req.params.password, function (results) {
        if(results.ok) {
            var token = new Buffer(Math.floor((Math.random() * 100000000) + 1000).toString() + results.user._id.toString()).toString('base64');
            authTokenStore.push({ token: token, id: results.user._id });
            res.send(200, {token: token});
            console.log(authTokenStore);
        } else {
            res.send(400, "Bad Request");
        }
    });
});

//Account user routes
var userPath = '/user';
server.get(userPath, function (req, res, err) {
    res.send(200, 'dummy path');
});

server.get(userPath + '/:id', function (req, res, err) {

});

server.put(userPath + '/:id', function (req, res, err) {

});

server.post(userPath, function (req, res, err) {
    console.log('hit post user...');

    var newUser = new User({
        email: req.params.email,
        password: req.params.password
    });

    newUser.save(function (err) {
        if(err) {
            console.error(err);
            res.send(500, 'Error creating user.\\n' + err);
        }
        res.send(200, 'User successfully created.');
    });
});

server.del(userPath + ':id', function (req, res, err) {

});

//Start server listening...
server.listen(8090, '127.0.0.1', function () {
    console.log('api running, listening on 127.0.0.1:8090');
});