// Business logic
function Person(name) {
  this.userName = name;
  this.health = 100;
  this.alive = true;
  this.activePlayer = false;
}
var people = {
  person : []
}

Person.prototype.checkHealth = function() {
  for(var i = 0; i < people.person.length; i++) {
    var health = people.person[i].health;
    if(health === 0) {
      people.person[i].alive = false;
    }
    if(people.person[i].alive === false) {
      $("#player-dead-message").text(people.person[i].userName + " your dead!");
      $("#end-message").show();
      $("#player-1-stab").prop("disabled", true);
      $("#player-2-stab").prop("disabled", true);
    }
  }
}

Person.prototype.checkActivePosition = function(diceRoll) {
  if(diceRoll === 7) {
    for(var i = 0; i < people.person.length; i++) {
      var currentPlayerBtn = i+1;
      if(people.person[i].activePlayer === true) {
        people.person[i].activePlayer = false;
        $("#player-" + currentPlayerBtn).removeClass("active-player");
        $("#player-" + currentPlayerBtn +"-stab").prop("disabled", true);
      } else {
        people.person[i].activePlayer = true;
        $("#player-" + currentPlayerBtn).addClass("active-player");
        $("#player-" + currentPlayerBtn +"-stab").prop("disabled", false);
      }
    }
  }
}

function randomNumber() {
  return Math.floor((Math.random() * 10) + 1);
}

// UI Logic
$(document).ready(function() {
  $("#user-input").submit(function(event) {
    event.preventDefault();
    var userName = $("#user-name").val();
    var user = new Person(userName);
    people.person.push(user);
    $("#user-name").val("");
    if(people.person.length === 2) {
      $("#player-1-name").text(people.person[0].userName);
      people.person[0].activePlayer = true;
      $("#player-2-name").text(people.person[1].userName);
      $("#user-input").hide();
      $("#arena").show();
    }
  });
  $("#player-1-stab").click(function() {
    people.person[1].health -= 2;
    $("#player-2-health").text(people.person[1].health);
    people.person[0].checkHealth();
    var diceRoll = randomNumber();
    people.person[0].checkActivePosition(diceRoll);
    if(people.person[0].activePlayer === true) {
      $("#player-2").addClass("hit").delay(100).queue(function(next){
    $(this).removeClass("hit");
    next();
});
    }
  });
  $("#player-2-stab").click(function() {
    people.person[0].health -= 2;
    $("#player-1-health").text(people.person[0].health);
    people.person[1].checkHealth();
    var diceRoll = randomNumber();
    people.person[1].checkActivePosition(diceRoll);
    if(people.person[1].activePlayer === true) {
      $("#player-1").addClass("hit").delay(100).queue(function(next){
    $(this).removeClass("hit");
    next();
});
    }
  });
});
