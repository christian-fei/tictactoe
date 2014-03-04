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
	ObjectID = mongo.ObjectID,
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
			console.log( "error creating a game".red,err );
			callback(null);
		}else{
			console.log( "successfully created game".green, doc[0] );
			callback( doc[0] );
		}
	});
}

function getBoard( id, callback ){
	try{
		var realId = ObjectID(id);
		gamesColl.find({_id: realId}).toArray(function(err,docs){
			console.log( "got data from getBoard".green.bold );
			callback( docs[0] );
		});
	}catch(e){
		console.log( e );
		callback(null);
	}
}


function getField( gameid, x, y, callback ){
	try{
		var realId = ObjectID(gameid);
		x = parseInt(x);
		y = parseInt(y);
		console.log( x,y );
		gamesColl.find({_id: realId}).toArray(function(err,docs){
			if( docs && docs[0] ){
				console.log( "got data from getBoard".green.bold );
				var board = docs[0].board;
				console.log( board[y][x] );
				if( board[y] != undefined && board[y][x] != undefined ){
					callback( board[y][x] );
				}else{
					callback(null);
				}
			}else{
				callback(null);
			}
		});
	}catch(e){
		console.log( e );
		callback(null);
	}
}


module.exports = {
	createGame: createGame,
	getBoard: getBoard,
	getField: getField
}