function Game() {
  this.players = [],
    this.currentTurn = this.players[0]
}


Game.prototype.turn = function(player) {
  debugger;
  var rollAgain = true;
  while (rollAgain) {
    player.roll();
    if (player.rollCheck() === 1) {
      player.rollingScore = 0;
      player.updateTotalScore;
      rollAgain = false;
    } else {
      player.rollingScore += player.lastRoll;
    }
    var rollAgain = prompt("Would you like to roll again? (true or false only!)")
    if (rollAgain === false){
      player.updateTotalScore;
    }
  }
}

Game.prototype.addPlayer = function(player){
  this.players.push(player);
}



function Player(name) {
  this.totalScore = 0,
    this.rollingScore = 0,
    this.lastRoll = 0,
    this.name = name
}


Player.prototype.roll = function() {
  var roll = Math.floor(6 * Math.random()) + 1;
  console.log(this.name + " rolled a: " +roll)
  this.lastRoll = roll;
}

Player.prototype.rollCheck = function() {
    // rollCheck is to check value of roll
    if (this.lastRoll !== 1) {
      return true;
    }
    // then add value of roll to this.rollingScore)
    else if (lastRoll === 1) {
      return false;
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
    pigDice.turn(player1);
    pigDice.turn(player2);

    $(function() {



    });
