
function Game() {
  this.players = [],
    this.losers = []
};


Game.prototype.turn = function(player) {
  console.log("It is " + player.name + "'s turn!!!");
  // itsYourTurn(player);

  var rollAgain = true;
  var response = "";

  while (rollAgain) {
    // debugger;
    player.roll();
    if (player.rollCheck()) {
      console.log(player.name + ", Congrats! you rolled a 1!");
      // congratsA1(player);
      player.rollingScore = 0;
      console.log(player.name + "'s Total Score: " + player.totalScore);
      // scoreUpdate(player);
      rollAgain = false;
    } else {
      player.rollingScore += player.lastRoll;
      if (player.totalScore + player.rollingScore >= 15) {
        console.log("you suck");
        // loser(player);
        this.losers.push(player);
        var indexToRemove = this.players.indexOf(player);
        this.players.splice(indexToRemove, 1);
        rollAgain = false;
      }
    }
    response = prompt("Would you like to roll again? ('y' or 'n' !)");
    if (response = "n") {
      player.updateTotalScore();
      console.log(player.name + "'s Current total score ========= " + player.totalScore);
      // scoreUpdate(player);

      rollAgain = false;;
    }
  }
};

Game.prototype.addPlayer = function(player) {
  this.players.push(player);
};

Game.prototype.play = function() {
  var keepGoing = true;
  while (keepGoing) {
    // debugger;
    if (this.players.length === 1) {
      console.log(this.players[0].name + ", you win!!!!");
      // winner(this.players[0]);
      keepGoing = false;
    } else {
      for (var i = 0; i < this.players.length; i++) {
        this.turn(this.players[i]);
      }
    }
  }
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
//     $("#player2").html("<li>" + player.name + ", you're a WINNER" + "</li>");
//   }
// };

  // --------------------------------------------------------------------------------
var pigDice = new Game();
var player1 = new Player("Rob", 0);
var player2 = new Player("Brooke", 1);
pigDice.addPlayer(player1);
pigDice.addPlayer(player2);
console.log("Hello " + player1.name + " and " + player2.name);
// loop will start here
pigDice.play();

$(function() {



});
