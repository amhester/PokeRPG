/**
 * Created by amhes_000 on 6/24/2015.
 */
var restify = require('restify');
var db = require('mongoose');
db.connect('');

/* ----------------  Stuff to be refactored out at some point  ----------------- */
//Some convienance methods
function findFirstOrDefault(arr, compFun) {
    arr.forEach(function (el, i) {
        if(compFun(el)) {
            return el;
        }
    });
}

//Used to store an object with token and userId for all currently signed in users (e.g. { token: 345=Gd2!d, id: 45 })
var authTokenStore = [];

//Custom authentication check for requests
function authenticateRequest(req, res, next) {
    if(req.header('Authorization') && findFirstOrDefault(authTokenStore, function (el) { return el.token == req.header('Authorization').split(' ')[1]; })) {
        next();
    } else if (req.path == '/token') {
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
server.on('uncaughtException', function (request, response, route, error) {});

//Generic handlers for any incoming request (careful, executed in order!)
server.use(restify.acceptParser(server.acceptable));
server.use(authenticateRequest);
server.use(restify.CORS());
server.use(restify.dateParser());
server.use(restify.queryParser());

//Actual api routes
//Token route for authentication
server.post('/token', function (req,res, err) {

});

//Account user routes
var userPath = '/user';
server.get(userPath, function (req, res, err) {

});

server.get(userPath + '/:id', function (req, res, err) {

});

server.put(userPath + '/:id', function (req, res, err) {

});

server.post(userPath, function (req, res, err) {

});

server.del(userPath + ':id', function (req, res, err) {

});

//Start server listening...
server.listen(8090, '127.0.0.1');