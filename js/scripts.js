function Game() {
  this.players = [],
    this.currentTurn = this.players[0],
    this.losers = [],
    this.winner = []
}


Game.prototype.turn = function(player) {
  console.log("It is " + player.name + "'s turn!!!");
  debugger;

  var rollAgain = true;
  var input = "";

  while (rollAgain) {
    player.roll();
    if (player.rollCheck()) {
      console.log(player.name + ", Congrats! you rolled a 1!")
      player.rollingScore = 0;
      console.log(player.name + "'s Total Score: " + player.totalScore)
      break;
    } else {
      player.rollingScore += player.lastRoll;
      if (player.totalScore + player.rollingScore >= 10) {
        console.log("you suck")
        this.losers.push(player);
        var indexToRemove = this.players.indexOf(player);
        this.players.splice(indexToRemove, 1);
        break;
      }
    }
    input = prompt("Would you like to roll again? (true or false only!)")
    if (!input) {
      player.updateTotalScore();
      console.log(player.name + "'s Current total score: " + player.totalScore)
      break;
    }
  }
}

Game.prototype.addPlayer = function(player) {
  this.players.push(player);
}

Game.prototype.play = function() {
  var keepGoing = true;
  while (keepGoing) {
    if (this.players.length === 1) {
      console.log(this.players[0].name + ", you win!!!!");
      break;
    } else {
      for (var i = 0; i < this.players.length; i++) {
        this.turn(this.players[i]);
      }
    }
  }
}



function Player(name) {
  this.totalScore = 0,
    this.rollingScore = 0,
    this.lastRoll = 0,
    this.name = name
}


Player.prototype.roll = function() {
  var roll = Math.floor(6 * Math.random()) + 1;
  console.log(this.name + " rolled a: " + roll)
  this.lastRoll = roll;
}

Player.prototype.rollCheck = function() {
  // rollCheck is to check value of roll
  if (this.lastRoll !== 1) {
    return false;
  }
  // then add value of roll to this.rollingScore)
  else if (this.lastRoll === 1) {
    return true;
  }
}

Player.prototype.addRoll = function() {
  // add value of this.roll add to rollingScore
  this.rollingScore += this.lastRoll;
}

Player.prototype.updateTotalScore = function() {
  // this players total should be updated by its rolling score
  this.totalScore = this.rollingScore;
  this.rollingScore = 0;
}


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
//


// --------------------------------------------------------------------------------
var pigDice = new Game();
var player1 = new Player("Rob");
var player2 = new Player("Brooke");
pigDice.addPlayer(player1);
pigDice.addPlayer(player2);
console.log("Hello " + player1.name + " and " + player2.name);
// loop will start here
pigDice.play();

$(function() {



});
