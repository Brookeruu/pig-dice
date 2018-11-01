
function Game() {
  this.players = [],
  this.currentPlayer = this.players[0],
  this.playerIndex = 0
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
}

Game.prototype.resetGame = function(){
  this.currentPlayer = this.players[0];
  this.players.forEach(function(player){
    player.totalScore = 0;
    player.rollingScore = 0;
    player.lastRoll = 0;
  });
};


Game.prototype.turn = function(player) {
  console.log("It is " + player.name + "'s turn!!!");
  player.roll();
  if (player.rollCheck()) {
    this.playerRollsAOne(player);
    return "one";
  }
  else {
    player.rollingScore += player.lastRoll;
    if (player.totalScore + player.rollingScore >= 100) {
      console.log(player.name + ", congrats!!!!!!!!!!!!!!!! You dont suck, you win!");
      this.resetGame();
      return false;
    }
    else {
        return "continue";
    }
  }
};

Game.prototype.addPlayer = function(name) {
  // this addPlayer function will receive a string "name", create a player with that name, and add it to the players list
  var player = new Player(name, this.playerIndex++);
  this.players.push(player);
  var userInputs = new Ui(this);
  this.currentPlayer = this.players[0];
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
// -----------------------------------------------------------------------------
//            UI Logic
// -----------------------------------------------------------------------------

function Ui(game){
  this.players = game.players
}

Ui.prototype.createHtml = function(wellSelector){
  var allPlayersHtml = "";
  this.players.forEach(function(player){
    allPlayersHtml += "<div class='col-md-" + (12 / pigDice.players.length) + " well'><h2>" + player.name + "</h2><ul id='player" + player.id + "output'></ul><button class='btn btn-info hold currentPlayerHold' type='click'>Hold</button><button class='btn btn-danger roll currentPlayerRoll' type='click'>Roll</button></div>";
  });
  wellSelector.html(allPlayersHtml);

}

Ui.prototype.youRolledAOne = function(currentPlayerSelector){
  var currentPlayerOutput = "";
  currentPlayerOutput += "<li>You rolled a one this round!</li><li>Total Score: " + pigDice.currentPlayer.totalScore + "</li><li>Round Tally: 0</li>";
  currentPlayerSelector.html(currentPlayerOutput);
}

Ui.prototype.displayPlayerScore = function(currentPlayerSelector){
  var currentPlayerOutput = "";
  currentPlayerOutput += "<li>Total Score: " + pigDice.currentPlayer.totalScore + "</li><li>Round Tally: " + pigDice.currentPlayer.rollingScore + "</li>";
  currentPlayerSelector.html(currentPlayerOutput);
}

Ui.prototype.youWin = function(){
  alert("Congrats " + pigDice.currentPlayer.name + ", your score is: " + pigDice.currentPlayer.totalScore + "you win! Be sure to refresh the page to play again!");
}

var pigDice = new Game();

$(function() {

  $("#placeForWells").on("click", "button.currentPlayerHold", function(){
    $(".currentPlayerHold").hide();
    $(".currentPlayerRoll").hide();
    pigDice.currentPlayer.updateTotalScore();
    // display new totalScore
    var view = new Ui(pigDice);
    view.displayPlayerScore($("#player" + pigDice.currentPlayer.id + "output"));
    pigDice.switchPlayers();
    $("#player" + pigDice.currentPlayer.id + "output").siblings().show();
  });

  $("#placeForWells").on("click", "button.currentPlayerRoll", function(){
      var result = pigDice.turn(pigDice.currentPlayer);
    if (result === "continue"){
      var view = new Ui(pigDice);
      view.displayPlayerScore($("#player" + pigDice.currentPlayer.id + "output"));
    } else if (result === "one"){
      var view = new Ui(pigDice);
      view.youRolledAOne($("#player" + pigDice.currentPlayer.id + "output"));
      $(".currentPlayerHold").hide();
      $(".currentPlayerRoll").hide();
      pigDice.switchPlayers();
      $("#player" + pigDice.currentPlayer.id + "output").siblings().show();

    } else if (!result) {
      var view = new Ui(pigDice);
      view.youWin();
      pigDice.resetGame();
    }
    // we need to update/display with new totalScore, and current rolling total
  });

  $("#newPlayerForm").submit(function (event){
    event.preventDefault();

    pigDice.addPlayer($("#playerName").val());
    var view = new Ui(pigDice);
    view.createHtml($("#placeForWells"));
    $("#player" + pigDice.currentPlayer.id + "output").siblings().show();


  });

  //Need to create UI for players that adds them to the game object.
});
