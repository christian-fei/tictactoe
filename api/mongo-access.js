/*
    ____  ____  ______
   / __ \/ __ \/ ____/
  / / / / / / / /     
 / /_/ / /_/ / /___   
/_____/\____/\____/   
                      

I need methods for:

- "creates a new ttt game" ()
- "sets a field on a specific ttt game" (gameid,player,x,y)
- "get the gamefield of an existing game" (gameid)
- "get the state of the field :x :y" (gameid,x,y)

*/


//dep
var mongo = require("mongodb"),
	colors = require("colors"),
	db, gamesColl;


var voidGame = {
	"board": [
		["","",""],
		["","",""],
		["","",""]
	]
};

mongo.connect("mongodb://localhost:27017/tictactoe", function(err,_db){
	if( err ){
		console.log( "err".red.bold );
		throw err;
	}
	db = _db;
	gamesColl = db.collection("games");
	console.log( "connected to mongo".blue.bold );
});

function createGame( callback ){
	//fucking shit mongo
	delete voidGame._id;
	gamesColl.insert(voidGame, function(err,doc){
		if( err ){
			console.log( "error creating a game",err );
			callback(null);
		}else{
			console.log( "successfully created game", doc[0] );
			callback( doc[0] );
		}
	});
}


module.exports = {
	createGame: createGame
}