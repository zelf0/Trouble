
var view = {

	empty: function(location) {
		if (document.getElementById(location)) {
			document.getElementById(location).style.backgroundColor = "white";
			document.getElementById(location).classList.add("empty");
		}
	},



	fill: function(location, color) {
		document.getElementById(location).classList.remove("empty");
		document.getElementById(location).classList.remove("hovered");
		if (document.getElementById(location)) {
				document.getElementById(location).style.backgroundColor = "var(--color-" + color + ")";
		}
	
	},

	borderFill: function(location, color) {

		if (document.getElementById(location)) {
				document.getElementById(location).style.borderColor = "var(--color-" + color + ")";
		}
	
	},

	validate: function(location) {
		if (document.getElementById(location)) {
			// document.querySelector(':root').style.setProperty("--valid-color", "var(--color-" + model.currentPlayer + ")");
			document.getElementById(location).classList.add("valid");
		}
	},

	invalidate: function(location) {
		if (document.getElementById(location)) {
			document.getElementById(location).classList.remove("valid");
		}
	},

	mouseover:function(location) {

		document.getElementById(location).classList.add("hovered");


	},

	mouseout: function(location) {

		document.getElementById(location).classList.remove("hovered");

	},


	startGame: function() {
		document.getElementById("menu").style.display = "none";
		document.getElementById("game-board").style.display = "block";
	},

	openCloseRules: function() {

		if (document.getElementById("help").innerHTML == "X")
		{
			document.getElementById("rules").style.display = "none";
			document.getElementById("help").innerHTML = "?";
		}
		else {
			document.getElementById("rules").style.display = "block";
			document.getElementById("help").innerHTML = "X";
		}


	},

	rollDie: function(diceroll) {

		var die = document.getElementById("die");
		die.src = "assets/dice-" + diceroll + ".svg";
		document.getElementById("die").style.transform = "translate(-1px, -3px)";
		document.getElementById("die").style.boxShadow = "4px 6px 2px 0px #aaaaaa";

	},

	showTurn: function() {

		document.getElementById("cue").innerHTML = model.players[model.currentPlayer].name + "\'s Turn";
 		document.querySelector(':root').style.setProperty("--current-color", "var(--color-" + model.currentPlayer + ")");
 		document.getElementById("die").style.transform = "translate(-5px, -7px)";
		document.getElementById("die").style.boxShadow = "8px 10px 2px 0px #aaaaaa";

	},

	win: function() {

		document.getElementById("cue").innerHTML = model.players[model.currentPlayer].name + " wins!";
		document.getElementById("game-buttons").style.display = "block";
		if (model.winners == model.numPlayers)
		{
			document.getElementById("continue").style.display = "none";
		}
	},

	hideGameButtons: function() {

		document.getElementById("game-buttons").style.display = "none";
	}
	
}



function Piece(location) {

	this.location = location;
}



var model = {

	rolled: false,
	currentPlayer: 0,
	numPlayers: 4,
	winners: 0,

	
	players: [
	{start: 101, end: 111, pieces: []},
	{start: 201, end: 211, pieces: []},
	{start: 301, end: 311, pieces: []},
	{start: 401, end: 411, pieces: []}
	],

	validSpots: [],
	pieces: function() { 

		for (let i = 0; i < model.numPlayers; i++)
 		{

			for (let j = 0; j < 4; j++) {
				this.players[i].pieces[j] = j + this.players[i].start;
				view.fill(this.players[i].pieces[j].toString(), i);
				view.borderFill(this.players[i].pieces[j].toString(), i);
			}
		
 		}
		

	},

	changeTurn: function() {
		if (this.currentPlayer == model.numPlayers - 1) {

 			this.currentPlayer = 0;
 		}
 		else { this.currentPlayer++; }



 

 		 if (this.players[this.currentPlayer].pieces.every((element) => {return (element >= this.players[this.currentPlayer].end); } ))
 		 {
 		 	if (model.winners < model.numPlayers)
 		 	{
 		 		this.changeTurn();
 		 	}
 		 	return;
 		 }

 		model.rolled = false;
 		view.showTurn();

 		if (this.players[this.currentPlayer].npc)
 		{
 			
 				document.getElementById("die").click();
 			
 			
 			// if (model.rolled)
 			// {

	 				let move = this.autoMove();
	 					setTimeout(function() {

	 					if (move) { document.getElementById(move).click(); }

	 					else {//if (model.rolled) {
	 						model.changeTurn();
	 					}
	 		

						}, 250);
	 			

 			// if (this.validSpots.some((element) => {return element; } ))
 			// {
 			// 	let move = this.autoMove();
 			// 		setTimeout(function() {

 			// 		if (move) { document.getElementById(move).click(); }
 			// 		else if (model.rolled) {
 			// 			model.changeTurn();
 			// 		}

				// 	}, 200);
 			// }
 			// else if (model.rolled) {
 			// 	this.changeTurn();
 			// }
 			
 		// 	setTimeout(function() {
  	// 		document.getElementById(move).click();
			// }, 1000);
 			
 		}

	},

	autoMove: function(){

		//check valid spots
		let arr = [];

		//check for going home
		for (let i = 0; i < 4; i++)
		{
			if (this.validSpots[i])
			{
	 			if (parseInt(this.validSpots[i]) >= this.players[this.currentPlayer].end)
	 			{
	 				return this.validSpots[i];
	 			}
	 			arr.push(this.validSpots[i]);

			}
		
		}

		//check for collisions
		for (let i = 0; i < 4; i++)
		{
			if (this.validSpots[i])
			{
	 			for (let j = 0; j < model.numPlayers; j++)
	 			{	
	 				for (let k = 0; k < 4; k++)
	 				{
	 					if (parseInt(this.validSpots[i]) == this.players[j].pieces[k])
	 					{
	 						return this.players[j].pieces[k].toString();

	 					}
	 				}
	 				
	 			}

			}
		
		}

		if (arr[0])
		{
			return arr[Math.floor(Math.random() * arr.length)];
		}
	}

}

var controller = {


	roll: function() {
		if (model.rolled) {
			return;
		}
		diceroll = Math.floor(Math.random() * 6) + 1;
		view.rollDie(diceroll);
		
		//iterate through every piece and find which space it can move to if any
		for (let i = 0; i < 4; i++) {
			
			//move pieces out of start
			if (model.players[model.currentPlayer].pieces[i] >= model.players[model.currentPlayer].start 
				&& model.players[model.currentPlayer].pieces[i] <= model.players[model.currentPlayer].start + 3)
			{
				model.validSpots[i] = (4 + (7 * model.currentPlayer) + diceroll).toString();
				if (model.validSpots[i] > 28) {
					model.validSpots[i] = (model.validSpots[i] - 28).toString();
				}
				//view.validate(model.validSpots[i]);
									
			}


			else {
					
				model.validSpots[i] = (model.players[model.currentPlayer].pieces[i] + diceroll).toString();

				//allow moving from 28 back to 1
				
				if (model.validSpots[i] > 28) {
					model.validSpots[i] = (model.validSpots[i] - 28).toString();
				}

				//do not allow moving past home
				if (
					((model.players[model.currentPlayer].pieces[i] < 5 + (7 * model.currentPlayer))
					&& (parseInt(model.validSpots[i]) > 5 + (7 * model.currentPlayer))) //valid spot is past home
					||  (parseInt(model.validSpots[i]) < 3 && model.players[model.currentPlayer].pieces[i] > 22 && (model.players[model.currentPlayer].pieces[i] < 5 + (7 * model.currentPlayer))) //prevent piece from passing home by passing 28
					|| (parseInt(model.validSpots[i]) > 5 + (7 * model.currentPlayer) && model.players[model.currentPlayer].pieces[i] >= 27 && parseInt(model.validSpots[i]) < 27)  //prevent piece from passing home by passing 28
					
					) {
					model.validSpots[i] = null;
				}

				//getting home
				if ((
					(model.players[model.currentPlayer].pieces[i] < 5 + (7 * model.currentPlayer))
					|| 
					(model.players[model.currentPlayer].pieces[i] <= 28 && model.players[model.currentPlayer].pieces[i] > 26))
					
					&& 
					(model.validSpots[i] == 5 + (7 * model.currentPlayer))) {
					let homeSpace = model.players[model.currentPlayer].end + 3;
					do 
					{
						model.validSpots[i] = homeSpace.toString();
						homeSpace--;
					} while (document.getElementById(model.validSpots[i]).style.backgroundColor == "var(--color-" + model.currentPlayer + ")");

				}



			}

			if (!document.getElementById(model.validSpots[i]) 
				|| document.getElementById(model.validSpots[i]).style.backgroundColor == "var(--color-" + model.currentPlayer + ")") 
			{
				model.validSpots[i] = null;
			}

			view.validate(model.validSpots[i]);
		}
			model.rolled = true;
			//if no spots valid, end turn
			if (model.validSpots.every((element) => {return element == null; } )) {
				 
				 model.changeTurn();
 			}

 	},

 	move: function(e) { 
 		//if the selected space is a valid move, move piece
 		let piece = model.validSpots.indexOf(e.target.id);
 		if (piece >= 0)
 		{


 			for (let i = 0; i < model.numPlayers; i++)
 			{	
 				for (let j = 0; j < 4; j++)
 				{
 					if (model.players[i].pieces[j] == parseInt(e.target.id))
 					{
 		

 						for (let k = 3; k >= 0; k--)
 						{
 							if (document.getElementById((model.players[i].start + k).toString()).classList.contains("empty"))
 							{
 								
 								model.players[i].pieces[j] = model.players[i].start + k;
 								view.fill(model.players[i].pieces[j], i);
 								k = -1;

 							}
 							
 						}
 						

 					}
 				}
 				
 			}

 			//update board and game state
 			view.empty(model.players[model.currentPlayer].pieces[piece].toString());
 			model.players[model.currentPlayer].pieces[piece] = parseInt(e.target.id);
 			view.fill(e.target.id, model.currentPlayer);

 			//reset valid spots in board and game state
 			for (let i = 0; i < 4; i++) {
 				if (model.validSpots[i])
 				{
 					view.invalidate(model.validSpots[i]);
 				}
 			}
 			model.validSpots = [];


 			if (e.target.id == model.players[model.currentPlayer].end) {

 				model.winners++;
 				view.win();

 			}
 			else {
 				model.changeTurn();
 			}

 
 		}

 		//move piece by clicking the piece itself
 		else if (model.players[model.currentPlayer].pieces.indexOf(parseInt(e.target.id)) >= 0)
 		{
 		
 			piece = model.players[model.currentPlayer].pieces.indexOf(parseInt(e.target.id));
 			if (model.validSpots[piece])
 			{
 				document.getElementById(model.validSpots[piece]).click();
 			}
 		}

 	},

 	hover: function(e) { //show valid spot when piece is hovered over

 		if (model.players[model.currentPlayer].pieces.indexOf(parseInt(e.target.id)) >= 0)
 		{
 	
 			piece = model.players[model.currentPlayer].pieces.indexOf(parseInt(e.target.id));
 			if (model.validSpots[piece])
 			{
 				view.mouseover(model.validSpots[piece]);
 			}
 		}

 	},

 	unhover: function(e) { 

 		if (model.players[model.currentPlayer].pieces.indexOf(parseInt(e.target.id)) >= 0)
 		{
 	
 			piece = model.players[model.currentPlayer].pieces.indexOf(parseInt(e.target.id));
 			if (model.validSpots[piece])
 			{
 				view.mouseout(model.validSpots[piece]);
 				//document.getElementById(model.validSpots[piece]).style.backgroundColor = "black";
 			}
 		}

 	},

 	start: function() {
 		model.numPlayers = document.getElementById("player-count").value;
 		for (let i = 0; i < model.numPlayers; i++)
 		{
 			model.players[i].npc = document.getElementById("check-" + i).checked;
 			//model.players[i].color = "color-" + i;
 			document.querySelector(':root').style.setProperty(("--color-" + i), document.getElementById("color-" + i).value);
 			model.players[i].name = document.getElementById("name-" + i).value;
 		}
 		view.startGame();
 		model.pieces();
 		model.currentPlayer = model.numPlayers - 1;
 		model.changeTurn();
 	},

 	count: function() {
 		for (let i = 0; i < document.getElementById("player-count").value; i++)
 		{
 			document.getElementById("player-" + i).style.display = "flex";
 		}
 		for (let i = document.getElementById("player-count").value; i < 4; i++)
 		{
 			document.getElementById("player-" + i).style.display = "none";
 		}
 	},

 	continue: function() {
 		view.hideGameButtons();
 		model.changeTurn();
 	},

 	newGame: function() {

 		document.location.reload();
 	}


}



function init() {
	document.getElementById("die").addEventListener("click", controller.roll, false);
	//model.pieces();
	var spaces = document.getElementsByTagName("button");
	for (let i = 0; i < spaces.length; i++) {
		spaces[i].addEventListener("click", controller.move);
		spaces[i].addEventListener("mouseover", controller.hover);
		spaces[i].addEventListener("mouseout", controller.unhover);	
	}
	document.getElementById("start-button").addEventListener("click", controller.start);
	document.getElementById("player-count").addEventListener("click", controller.count);
	document.getElementById("help").addEventListener("click", view.openCloseRules);
	document.getElementById("new-game").addEventListener("click", controller.newGame);
	document.getElementById("continue").addEventListener("click", controller.continue);

}




window.addEventListener("load", init, false);


