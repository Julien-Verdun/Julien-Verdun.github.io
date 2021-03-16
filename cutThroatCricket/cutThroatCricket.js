/*
Julien Verdun
24/01/2020
Web application : Cut-throat criket
*/

/* 
This class creates an object with all a player properties.
*/
class Player {
  constructor(
    name,
    ranking,
    score = 0,
    dartBubble = 0,
    dart20 = 0,
    dart19 = 0,
    dart18 = 0,
    dart17 = 0,
    dart16 = 0,
    dart15 = 0
  ) {
    this.name = name;
    this.score = score;
    this.darts = {
      bubble: dartBubble,
      20: dart20,
      19: dart19,
      18: dart18,
      17: dart17,
      16: dart16,
      15: dart15,
    };
    this.ranking = ranking;
  }
}

let lastPlayer = 0, // index of the last player who played
  listDarts = ["bubble", 20, 19, 18, 17, 16, 15], //list of the rewarded darts
  listProperties = ["name", "darts", "score", "ranking"], //list of the different player properties
  listCheckbox = [
    "checkbox-20",
    "checkbox-19",
    "checkbox-18",
    "checkbox-17",
    "checkbox-16",
    "checkbox-15",
    "checkbox-bubble",
    "checkbox-2x20",
    "checkbox-2x19",
    "checkbox-2x18",
    "checkbox-2x17",
    "checkbox-2x16",
    "checkbox-2x15",
    "checkbox-2xbubble",
    "checkbox-3x20",
    "checkbox-3x19",
    "checkbox-3x18",
    "checkbox-3x17",
    "checkbox-3x16",
    "checkbox-3x15",
  ], //list of the different checkbox's id
  orderPlayers = []; //list of the order of players

let listPlayers = translateListPlayers();
rebuilt_list_player();
buildPlayerPanel();
alert(0);
hideGame(false);

/*
  This function removes all the player from the application (the list of players is emptied).
  */
function removeAllPlayers() {
  listPlayers.splice(0, listPlayers.length);
  saveListPlayers();
  buildPlayerPanel();
  rebuilt_list_player();
  hideGame(false);
}

/*
  This function allows to add a new player to the game.
  It is possible to add players at any time with the input text and green button.
  */
function addNewPlayer() {
  addPlayerText = document.getElementById("add-player-text");
  listPlayers.push(new Player(addPlayerText.value, 0));
  addPlayerText.value = "";
  comput_ranking();
  rebuilt_list_player();
  saveListPlayers();
  buildPlayerPanel();
  alert(-1);
}

/*
  This function transforms a string into an object Player.
  It is used to translate the local storage data.
  */
function translateListPlayers() {
  translatedListPlayers = [];
  if (localStorage.listPlayers !== undefined) {
    let savedListPlayers = localStorage.listPlayers;
    savedListPlayers.split(";").forEach((playerStr) => {
      if (playerStr !== "") {
        let playerSplited = playerStr.split(",");
        translatedListPlayers.push(
          new Player(
            playerSplited[0], // name
            parseInt(playerSplited[1]), // ranking
            parseInt(playerSplited[9]), // score
            parseInt(playerSplited[2]), // darts
            parseInt(playerSplited[3]),
            parseInt(playerSplited[4]),
            parseInt(playerSplited[5]),
            parseInt(playerSplited[6]),
            parseInt(playerSplited[7]),
            parseInt(playerSplited[8])
          )
        );
        orderPlayers.push(parseInt(playerSplited[1]));
      }
    });
  }
  return translatedListPlayers;
}

/*
  This function saves the list of player into the local storage.
  */
function saveListPlayers() {
  let savedListPlayers = "";
  listPlayers.forEach((player) => {
    savedListPlayers +=
      player.name +
      "," +
      player.ranking +
      "," +
      Object.values(player.darts).join() +
      "," +
      player.score;
    savedListPlayers += ";";
  });
  if (savedListPlayers !== "") {
    localStorage.setItem(
      "listPlayers",
      savedListPlayers.slice(0, savedListPlayers.length - 1)
    );
  } else {
    localStorage.removeItem("listPlayers");
  }
}

/*
  This function destroys the html elements and rebuilts new one with the values of list players. 
  */
function rebuilt_list_player() {
  delete_list_player();
  var listPlayerDisplayed = document.getElementById("list-players-content");
  var playerElt, playerValue;
  listPlayers.forEach((elt, index) => {
    let player = listPlayers[orderPlayers[index]];
    playerElt = document.createElement("tr");

    playerValue = document.createElement("th");
    playerValue.innerHTML = player.name;
    playerElt.appendChild(playerValue);

    for (var i = 0; i < listDarts.length; i++) {
      playerValue = document.createElement("td");
      playerValue.innerHTML = player.darts[listDarts[i].toString()];
      playerElt.appendChild(playerValue);
    }

    playerValue = document.createElement("td");
    playerValue.innerHTML = player.score;
    playerElt.appendChild(playerValue);

    listPlayerDisplayed.appendChild(playerElt);
  });
}

/*
  This funtion deletes the players in the html div.
  */
function delete_list_player() {
  var listPlayerDisplayed = document.getElementById("list-players-content");
  while (listPlayerDisplayed.hasChildNodes()) {
    listPlayerDisplayed.removeChild(listPlayerDisplayed.firstChild);
  }
}

/*
  This function reads the checkboxes and changes the table and score depending
  on the last player actions.
  */
function savePlayerTurn() {
  if (listPlayers.length > 0) {
    let playerResultText = document.getElementById("listOfButtons");
    let inputs = [];
    let divs = playerResultText.childNodes;
    divs.forEach((div) => {
      if (div.localName === "div") {
        inputs = inputs.concat(...div.childNodes);
      }
    });
    let lastDarts = {},
      numberDarts = 0;
    inputs.forEach((input, index) => {
      if (input.checked === true) {
        numberDarts += 1;
        lastDarts[input.name] = 1;
      }
    });
    if (numberDarts > 3) {
      alert(2);
    } else {
      alert(-2);
      lastDarts = procesLastDarts(lastDarts);
      // modifier le score du joueur et fermé les scores complets

      //compute new score and update the plaer which just payed
      changePlayerScore(lastDarts);
      rebuilt_list_player();
    }
  } else {
    alert(1);
  }
  nextTurn();
}

/*
  This function takes the object that gives the last player actions and
  changes it into an object with only the dart touched and the number of 
  dart touched.
  */
function procesLastDarts(lastDarts) {
  let lastDartsProcessed = {};
  Object.keys(lastDarts).forEach((dart) => {
    if (dart.includes("x")) {
      if (Object.keys(lastDartsProcessed).includes(dart.split("x")[1])) {
        lastDartsProcessed[dart.split("x")[1]] += parseInt(dart.split("x")[0]);
      } else {
        lastDartsProcessed[dart.split("x")[1]] = parseInt(dart.split("x")[0]);
      }
    } else {
      if (Object.keys(lastDartsProcessed).includes(dart)) {
        lastDartsProcessed[dart] += 1;
      } else {
        lastDartsProcessed[dart] = 1;
      }
    }
  });
  return lastDartsProcessed;
}

/*
  This function changes the list of darts of the current player 
  depending on the last turn he did.
  */
function changePlayerScore(lastDarts) {
  if (Object.keys(lastDarts).length > 0) {
    Object.keys(lastDarts).forEach((dart) => {
      if (listPlayers[lastPlayer].darts[dart] < 3) {
        if (listPlayers[lastPlayer].darts[dart] + lastDarts[dart] <= 3) {
          listPlayers[lastPlayer].darts[dart] += lastDarts[dart];
          delete lastDarts[dart];
        } else {
          lastDarts[dart] =
            lastDarts[dart] - (3 - listPlayers[lastPlayer].darts[dart]);
          listPlayers[lastPlayer].darts[dart] +=
            3 - listPlayers[lastPlayer].darts[dart];
        }
      }
    });
    comput_score(lastDarts);
  }
}

/*
  This function realises all the main actions for changing the player turn.
  */
function nextTurn() {
  //faire les modifications necessaire
  lastPlayer = lastPlayer < listPlayers.length - 1 ? lastPlayer + 1 : 0;
  modifyPlayerPanel();
  // var currentPlayer = document.getElementById("current-player");
  // currentPlayer.innerHTML = "Current player : " + listPlayers[lastPlayer].name;
  listCheckbox.forEach((checkbox) => {
    document.getElementById(checkbox).checked = false;
  });
  saveListPlayers();
  if (is_victory().victory === true) {
    hideGame(true);
    endRanking = document.getElementById("end-ranking");
    endRanking.innerHTML =
      "This is the end of the game. Player " +
      is_victory().player +
      " won the match.";
  }
}

/*
  This function takes the list of players and the 
  last move (3 darts max) and calculates the new score 
  and ranking of every player and updates the properties.
  lastDarts is an object which includes one or several 
  targets and the number of time they have been hit. 
  */
function comput_score(lastDarts) {
  listPlayers.forEach((player, index) => {
    if (lastPlayer !== index) {
      Object.keys(lastDarts).forEach((dart) => {
        if (player.darts[dart] < 3) {
          if (dart === "bubble") {
            player.score += lastDarts[dart] * 25;
          } else {
            player.score += lastDarts[dart] * parseInt(dart);
          }
        }
      });
    }
  });
  comput_ranking();
}

/*
  This function takes the list of players and calculates
  the rank of every player, and updates the property.
  */
function comput_ranking() {
  let list_score = listPlayers.map((player) => player.score);

  indexedScore = list_score.map(function (e, i) {
    return { ind: i, val: e };
  });

  indexedScore.sort(function (x, y) {
    return x.val > y.val ? 1 : x.val == y.val ? 0 : -1;
  });

  orderPlayers = indexedScore.map(function (e) {
    return e.ind;
  });
  listPlayers.forEach((player, index) => {
    player.ranking = orderPlayers[index];
  });
}

/*
  This function modifies the color of the button which shows whose turn it is.
  */
function modifyPlayerPanel() {
  var listPlayerPanel = document.getElementById("current-player-panel")
    .childNodes;
  if (listPlayerPanel.length > 0) {
    if (lastPlayer !== 0) {
      listPlayerPanel[lastPlayer].setAttribute(
        "style",
        "background-color:cornflowerblue;"
      );
      listPlayerPanel[lastPlayer - 1].setAttribute(
        "style",
        "background-color:cadetblue;"
      );
    } else {
      listPlayerPanel[0].setAttribute(
        "style",
        "background-color:cornflowerblue;"
      );
      listPlayerPanel[listPlayerPanel.length - 1].setAttribute(
        "style",
        "background-color:cadetblue;"
      );
    }
  }
}

/*
  This function build the list of buttons which show whose turn it is.
  */
function buildPlayerPanel() {
  deleteListPanel();
  var listPlayerPanel = document.getElementById("current-player-panel");

  var playerElt;
  listPlayers.forEach((player) => {
    playerElt = document.createElement("div");
    playerElt.innerHTML = player.name;
    playerElt.setAttribute("class", "col btn btn-secondary currentplayer");
    listPlayerPanel.appendChild(playerElt);
  });
  modifyPlayerPanel();
}

/*
  This function deletes the list of panel.
  */
function deleteListPanel() {
  var listPlayerPanel = document.getElementById("current-player-panel");
  while (listPlayerPanel.hasChildNodes()) {
    listPlayerPanel.removeChild(listPlayerPanel.firstChild);
  }
}

/*
  This function displays some alerts when no player has been entered or too much darts has been checked.
  */
function alert(number) {
  /*
    number -> 0 for no alert, 1 for no player and 2 for too much darts
    - 1 hides no player alert and -2 hides too much darts alert
    */
  alertNoData = document.getElementById("alert-no-player");
  alertTooMuchDarts = document.getElementById("alert-too-much-darts");
  if (number === 0) {
    alertNoData.style.display = "none";
    alertTooMuchDarts.style.display = "none";
  } else if (number === 1) {
    alertNoData.style.display = "block";
    alertTooMuchDarts.style.display = "none";
  } else if (number === -1) {
    alertNoData.style.display = "none";
  } else if (number === -2) {
    alertTooMuchDarts.style.display = "none";
  } else {
    alertNoData.style.display = "none";
    alertTooMuchDarts.style.display = "block";
  }
}
/*
  This function displays either the game table and checkboxes or a div
  for congrtulate the winner.
  */
function hideGame(bool) {
  document.getElementById("congratulation-message").style.display =
    bool === false ? "none" : "block";
  document.getElementById("game-stuff").style.display =
    bool === false ? "block" : "none";
}

/*
  This function is looking whether or not a player won the game.
  A player won the game when he has reached every targets at least
  3 times and has a score lower than all other players.
  */
function is_victory() {
  let output = {};
  listPlayers.some((player) => {
    var numberDarts = 0;
    Object.keys(player.darts).forEach((dart) => {
      numberDarts += parseInt(player.darts[dart]);
    });
    if (numberDarts === 21) {
      output = { victory: true, player: player.name };
    }
  });
  return output !== {} ? output : { victory: false }; // ;
}
