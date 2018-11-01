
function Game() {
  this.players = [],
  this.currentPlayer = this.players[0]
};

Game.prototype.switchPlayers = function() {
  if (this.players.indexOf(this.currentPlayer) + 1 === this.players.length){
    this.currentPlayer = this.players[0];
  }
  else{
    this.currentPlayer = this.players[this.players.indexOf(this.currentPlayer)+1]
  }
}

Game.prototype.playerRollsAOne = function(player) {
  // this function receives a player Object, and returns false to end the loop
  console.log(player.name + ", Congrats! you rolled a 1!");
  // congratsA1(player);
  player.rollingScore = 0;
  console.log(player.name + "'s Total Score: " + player.totalScore);
  // scoreUpdate(player);
  this.switchPlayers();
}

Game.prototype.resetGame = function(){
  this.players = [];
  this.currentPlayer = this.players[0];
}


Game.prototype.turn = function(player) {
  console.log("It is " + player.name + "'s turn!!!");
  player.roll();
  if (player.rollCheck()) {
    this.playerRollsAOne(player);
    return true;
  }
  else {
    player.rollingScore += player.lastRoll;
    if (player.totalScore + player.rollingScore >= 20) {
      console.log(player.name + ", congrats!!!!!!!!!!!!!!!! You dont suck, you win!");
      this.resetGame();
      return false;
    }
    else {
        return true;
    }
  }
};

Game.prototype.addPlayer = function(name) {
  debugger;
  // this addPlayer function will receive a string "name", create a player with that name, and add it to the players list
  var playerIndex = 0;
  var player = new Player(name, playerIndex++);
  this.players.push(player);
  var userInputs = new Ui(this);
};


function Player(name, id) {
  this.totalScore = 0,
    this.rollingScore = 0,
    this.lastRoll = 0,
    this.name = name,
    this.id = id
};


Player.prototype.roll = function() {
  var roll = Math.floor(6 * Math.random()) + 1;
  console.log(this.name + " rolled a: " + roll)
  this.lastRoll = roll;
};

Player.prototype.rollCheck = function() {
  // rollCheck is to check value of roll
  if (this.lastRoll !== 1) {
    return false;
  }
  // then add value of roll to this.rollingScore)
  else if (this.lastRoll === 1) {
    return true;
  }
};

Player.prototype.addRoll = function() {
  // add value of this.roll add to rollingScore
  this.rollingScore += this.lastRoll;
};

Player.prototype.updateTotalScore = function() {
  // this players total should be updated by its rolling score
  this.totalScore += this.rollingScore;
  this.rollingScore = 0;
};


//
// Player.prototype.hold = function() {
//
// }

// function Cheater(initialScore,name) {
//   this.totalScore = initialScore,
//   this.rollingScore = 0,
//   this.name = name
// }
//
// Cheater.prototype.roll = function() {
//
// }
//
// Cheater.prototype.hold = function() {
//
// }
// //
// function itsYourTurn(player) {
//   if (player.id === 0) {
//     $("#player1").html("<li>" + "It's your turn " + player.name + "!" + "</li>");
//   } else if (player.id === 1) {
//     $("#player2").html("<li>" + "It's your turn " + player.name + "!" + "</li>");
//   }
// };
//
// function congratsA1(player) {
//   if (player.id === 0) {
//     $("#player1").html("<li>" + "Congrats " + player.name + ", you rolled a 1!" + "</li>");
//   } else if (player.id === 1) {
//     $("#player2").html("<li>" + "Congrats " + player.name + ", you rolled a 1!" + "</li>");
//   }
// };
//
// function scoreUpdate(player) {
//   if (player.id === 0) {
//     $("#player1").html("<li>" + player.name + ", your total is: " + player.totalScore + "</li>");
//   } else if (player.id === 1) {
//     $("#player2").html("<li>" + player.name + ", your total is: " + player.totalScore + "</li>");
//   }
// };
//
// function loser(player) {
//   // MAKE SURE YOU PASS A PLAYER OBJECT INTO THIS FUCNTION. NO OTHER TYPE OF OBJECT WILL WORK
//   if (player.id === 0) {
//     $("#player1").html("<li>" + player.name + ", you're a LOSER" + "</li>");
//   } else if (player.id === 1) {
//     $("#player2").html("<li>" + player.name + ", you're a LOSER" + "</li>");
//   }
// };
//
// function winner(player) {
//   if (player.id === 0) {
//     $("#player1").html("<li>" + player.name + ", you're a WINNER" + "</li>");
//   } else if (player.id === 1) {
    // $("#player2").html("<li>" + player.name + ", you're a WINNER" + "</li>");
//   }
// };

  // --------------------------------------------------------------------------------

function Ui(game){
  debugger;
  this.players = game.players
}

Ui.prototype.createHtml = function(wellSelector){
  debugger;
  var allPlayersHtml = "";
  this.players.forEach(function(player){
    allPlayersHtml += "<div class='col-md-3 well'><h2>" + player.name + "</h2><ul id='player" + player.id + "output'></ul><button id='player" + player.id + "hold' type='click'>Hold</button><button id='player" + player.id + "roll' type='click'>Roll</button></div>";
  });
  wellSelector.html(allPlayersHtml);
}


var pigDice = new Game();

$(function() {


  $("#newPlayerForm").submit(function (event){
    event.preventDefault();

    pigDice.addPlayer($("#playerName").val());
    var view = new Ui(pigDice);
    view.createHtml($("#placeForWells"));

  });

  //Need to create UI for players that adds them to the game object.
});
