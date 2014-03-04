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
	server = restify.createServer(),
	colors = require("colors");

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


/*
                     __           
   _________  __  __/ /____  _____
  / ___/ __ \/ / / / __/ _ \/ ___/
 / /  / /_/ / /_/ / /_/  __(__  ) 
/_/   \____/\__,_/\__/\___/____/  
                                  
*/

//creates a new ttt game
server.post('/tictactoe', function(req,res){
	mongoAccess.createGame( function(data){
		if( data ){
			console.log("got response from mongoAccess".green);
			console.log(data);

			data.id = data._id;
			res.send(data);
			res.end();
		}else{
			console.log("there was an error when creating the game".red);
			res.send({
				"error": 1,
				"message": "there was an error creating the game"
			});
			res.end();
		}
	});
});

//get the gamefield of an existing game
server.get("/tictactoe/:gameid", function(req,res){
	var id = req.params.gameid;
	mongoAccess.getGamefield(id, function(data){
		console.log( data );
		if( data ){
			data.id = data._id;
			res.send( data );
			res.end();
		}else{
			res.send({
				"message": "it seems like there is no such game field",
				"error": 2
			});
		}
	});
});

server.listen(config.api.port, function() {
	console.log('API server listening at %s'.green.bold, server.url);
});