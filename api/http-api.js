/*
	                  __            _       __      
	  ___  ____  ____/ /___  ____  (_)___  / /______
	 / _ \/ __ \/ __  / __ \/ __ \/ / __ \/ __/ ___/
	/  __/ / / / /_/ / /_/ / /_/ / / / / / /_(__  ) 
	\___/_/ /_/\__,_/ .___/\____/_/_/ /_/\__/____/  
	               /_/                              



	- POST	/tictactoe
		creates a new ttt game
		ACCEPTS:
		RETURNS:
			object with a message and if successful the id of the newly created game
	

	- PUT		/tictactoe/:gameid/field/:x/:y
		sets a field on a specific ttt game
		ACCEPTS:
			"player" param in the request body
			player can be "X" or "0"
		RETURNS:
			object with a message and the updated gamefield (...)
	

	- GET		/tictactoe/:gameid
		get the gamefield of an existing game
		ACCEPTS:
		RETURNS:
			object with the representation of the gamefield



	- GET		/tictactoe/:gameid/field/:x/:y
		get the state of the field :x :y
		ACCEPTS:
		RETURNS:
			if unsuccessful:
				object with an error message
			if successful:
				object in the form:
					{
						"field":"" //or "field":"X" , or "field":"0"
					}


*/

//dep
var cr = require("../configReader"),
	mongoAccess = require("./mongo-access.js");
var restify = require("restify"),
	server = restify.createServer();

var config;
try{
	config = cr.getConfiguration("config.json");
}catch(e){
	console.log( e )
	process.exit(1);
}


server.pre(restify.pre.sanitizePath());

server.use(restify.gzipResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/tictactoe', function(req,res){
	mongoAccess.createGame( function(data){
		console.log("got response from mongoAccess");
		console.log(data);
		if( data ){
			data.id = data._id;
			res.send(data);
			res.end();
		}else{
			res.send({
				"error": 1,
				"message": "there was an error creating the game"
			});
			res.end();
		}
	});
});

server.listen(config.api.port, function() {
	console.log('API server listening at %s'.green.bold, server.url);
});