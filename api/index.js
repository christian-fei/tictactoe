//dep
var restify = require("restify"),
	mongo = require("mongodb");

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
		RETURNS:
			object with a message and the updated gamefield (...)
	

	- GET		/tictactoe/:gameid
		get the gamefield of an existing game
		ACCEPTS:
		RETURNS:
			object with the representation of the gamefield



	- GET		/tictactoe/:gameid/:x/:y
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

