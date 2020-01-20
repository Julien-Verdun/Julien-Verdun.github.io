/*
- commenter le code
- reparer le probleme
- programmer la victoire
- changer l'ajout d'un joueur par un form pour ajout auto
et cacher cette partie quand terminé
- bouton pour possibilité de modifier (ajouter ou supprimer les joueurs)
- changer les checkbox par des boutons et afficher ceux sur qui
on a cliqué (avec possibilité de les supprimer au besoin)
*/

let listPlayers = translateListPlayers();

let lastPlayer = 0,
  listDarts = ["bubble", 20, 19, 18, 17, 16, 15],
  listProperties = ["name", "darts", "score", "ranking"],
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
    "checkbox-3x15"
  ],
  orderPlayers = [0, 1, 2, 3];

rebuilt_list_player();
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
      "20": dart20,
      "19": dart19,
      "18": dart18,
      "17": dart17,
      "16": dart16,
      "15": dart15
    };
    this.ranking = ranking;
  }
}

function removePlayer() {
  localStorage;
}

function addNewPlayer() {
  addPlayerText = document.getElementById("add-player-text");
  listPlayers.push(new Player(addPlayerText.value, 0));
  addPlayerText.value = "";
  comput_ranking();
  rebuilt_list_player();
  saveListPlayers();
}

function translateListPlayers() {
  translatedListPlayers = [];
  if (localStorage.listPlayers !== undefined) {
    let savedListPlayers = localStorage.listPlayers;
    savedListPlayers.split(";").forEach(playerStr => {
      let playerSplited = playerStr.split(",");
      console.log(playerSplited);
      let p = new Player(
        playerSplited[0],
        parseInt(playerSplited[1]),
        parseInt(playerSplited[2]),
        parseInt(playerSplited[3]),
        parseInt(playerSplited[4]),
        parseInt(playerSplited[5]),
        parseInt(playerSplited[6]),
        parseInt(playerSplited[7]),
        parseInt(playerSplited[8]),
        parseInt(playerSplited[9])
      );
      translatedListPlayers.push(p);
      // new Player(
      //   playerSplited[0],
      //   parseInt(playerSplited[1]),
      //   parseInt(playerSplited[2]),
      //   parseInt(playerSplited[3]),
      //   parseInt(playerSplited[4]),
      //   parseInt(playerSplited[5]),
      //   parseInt(playerSplited[6]),
      //   parseInt(playerSplited[7]),
      //   parseInt(playerSplited[8]),
      //   parseInt(playerSplited[9])
      // )
    });
  }
  console.log("translatedListPlayers : ", translatedListPlayers);
  return translatedListPlayers;
}

function saveListPlayers() {
  let savedListPlayers = "";
  listPlayers.forEach(player => {
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
  localStorage.setItem("listPlayers", savedListPlayers);
}

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

function delete_list_player() {
  var listPlayerDisplayed = document.getElementById("list-players-content");
  while (listPlayerDisplayed.hasChildNodes()) {
    listPlayerDisplayed.removeChild(listPlayerDisplayed.firstChild);
  }
}

function savePlayerTurn() {
  let playerResultText = document.getElementById("listOfButtons");
  let inputs = [];
  let divs = playerResultText.childNodes;
  divs.forEach(div => {
    if (div.localName === "div") {
      inputs = inputs.concat(...div.childNodes);
    }
  });
  let lastDarts = {};
  inputs.forEach((input, index) => {
    if (input.checked === true) {
      lastDarts[input.name] = 1;
    }
  });
  lastDarts = procesLastDarts(lastDarts);
  // modifier le score du joueur et fermé les scores complets

  //compute new score and update the plaer which just payed
  changePlayerScore(lastDarts);
  rebuilt_list_player();
  nextTurn();
}

function procesLastDarts(lastDarts) {
  let lastDartsProcessed = {};
  Object.keys(lastDarts).forEach(dart => {
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

function changePlayerScore(lastDarts) {
  /*
  This function changes the list of darts of the current player 
  depending on the last turn he did.
  */
  if (Object.keys(lastDarts).length > 0) {
    Object.keys(lastDarts).forEach(dart => {
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

function nextTurn() {
  //faire les modifications necessaire
  lastPlayer = lastPlayer < listPlayers.length - 1 ? lastPlayer + 1 : 0;
  var currentPlayer = document.getElementById("current-player");
  currentPlayer.innerHTML = "Current player : " + listPlayers[lastPlayer].name;
  listCheckbox.forEach(checkbox => {
    document.getElementById(checkbox).checked = false;
  });
  saveListPlayers();
}

function comput_score(lastDarts) {
  /*
  This function takes the list of players and the 
  last move (3 darts max) and calculates the new score 
  and ranking of every player and updates the properties.
  lastDarts is an object which includes one or several 
  targets and the number of time they have been hit. 
  */
  listPlayers.forEach((player, index) => {
    if (lastPlayer !== index) {
      Object.keys(lastDarts).forEach(dart => {
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

// revoir ça
function comput_ranking() {
  /*
  This function takes the list of players and calculates
  the rank of every player, and updates the property.
  */
  let list_score = listPlayers.map(player => player.score);

  indexedScore = list_score.map(function(e, i) {
    return { ind: i, val: e };
  });

  indexedScore.sort(function(x, y) {
    return x.val > y.val ? 1 : x.val == y.val ? 0 : -1;
  });

  orderPlayers = indexedScore.map(function(e) {
    return e.ind;
  });
  listPlayers.forEach((player, index) => {
    player.ranking = orderPlayers[index];
  });
}
