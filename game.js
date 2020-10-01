class Game {
  constructor(turnLeft = 10) {
    this.turnLeft = turnLeft;
  }

  gameIsOver = () => {
    if (this.turnLeft === 0) return true;
    else if (Character.getAlivedPlayers().length < 2) return true;
  }

  watchStat = () => {
    Character.getAlivedPlayers().map(player => console.log(`${player.name} still have ${player.hp} lifepoints.`));
    console.log("the other players are dead");
  }

  skipTurn = () => {
    this.turnLeft -= 1;
  }

  targetedPlayerIsPlaying = (playersBatch = Character.instances, i, playerAttacked = '') => {
    if (playersBatch.filter(player => player.name.toLowerCase() !== playersBatch[i].name.toLowerCase()).find(player => player.name.toLowerCase() === playerAttacked.toLowerCase()) === undefined) {
      return false;
    } else return true;
  }

  createNewPlayer = (playersClass, newPlayersName) => {
    if (playersClass === "fighter") {
      let newPlayer = new Fighter(`${newPlayersName}`);
      Character.instances.push(newPlayer);
    };
    if (playersClass === "paladin") {
      let newPlayer = new Paladin(`${newPlayersName}`);
      Character.instances.push(newPlayer);
    };
    if (playersClass === "monk") {
      let newPlayer = new Monk(`${newPlayersName}`);
      Character.instances.push(newPlayer)
    };
    if (playersClass === "berzerker") {
      let newPlayer = new Berzerker(`${newPlayersName}`);
      Character.instances.push(newPlayer)
    };
    if (playersClass === "assassin") {
      let newPlayer = new Assassin(`${newPlayersName}`);
      Character.instances.push(newPlayer)
    };
  }

  startTurn = () => {
    let playersBatch = Character.shufflePlayers();

    //start turn
    alert(`It's turn ${this.turnLeft}`);
    for (let i = playersBatch.length - 1; i >= 0; i--) {
      //check if player have used their special attack on last turn and triggers the power if needed
      if (playersBatch[i].specialAttack.onNextTurn === 1) {
        playersBatch[i].specialAttack.triggerSideEffect();
        playersBatch[i].specialAttack.onNextTurn = 0;
      };

      let playerAttacked = prompt(`It's time for ${playersBatch[i].name} to play. Who do you want to attack?`);

      //Make sure targeted player exists and is still playing or ask the user to enter a right name
      while(!this.targetedPlayerIsPlaying(playersBatch, i, playerAttacked)) {
        playerAttacked = prompt(`The player ${playerAttacked} is not playing, please enter a new player name to attack with ${playersBatch[i].name}`);
      }

      //find the attacked player from the given string.
      playerAttacked = playersBatch.find(player => player.name.toLowerCase() === playerAttacked.toLowerCase());

      //use the wanted attack.
      let attackType = prompt("Do you want to use your special attack? (y/n)");
      let nbrOfDamages;
      if (attackType === "y") {
        nbrOfDamages = playersBatch[i].specialAttack.onThisTurn(playerAttacked);
      } else {
        nbrOfDamages = playersBatch[i].giveDamage(playerAttacked);
      }
      console.log(`${playersBatch[i].name} is attacking ${playerAttacked.name}. He give him ${nbrOfDamages} dammage. ${playerAttacked.name} have ${playerAttacked.hp} lifepoints left.`);
    }
    let playersStillAlive = playersBatch.filter(player => player.isAlive())
    playersStillAlive.map(player =>
      console.log(`${player.name} is still alive with ${player.hp} lifepoints.`)
    );
    this.skipTurn();
    return playersStillAlive;
  }

  startGame = () => {
    let addAPlayerToTheGame = prompt("Would you like to add a player to the game? (y/n)");
    if (addAPlayerToTheGame === "y") {
      let newPlayersClass = prompt('Which class would you like between "fighter", "paladin", "monk", "berzerker", "assassin"?');
      newPlayersClass = newPlayersClass.toLowerCase();
      while(newPlayersClass !== "fighter" && newPlayersClass !== "paladin" && newPlayersClass !== "monk" && newPlayersClass !== "berzerker" && newPlayersClass !== "assassin") {
        newPlayersClass = prompt("Oops, we didn't find your class. Please try again. ('fighter', 'paladin', 'monk', 'berzerker', 'assassin')");
      }
      let newPlayersName = prompt("What would be your player's name?");
      this.createNewPlayer(newPlayersClass, newPlayersName);
    }
    while (!this.gameIsOver()) {
      this.startTurn();
    }
    console.log("Game Over");
    Character.instances.filter(player => player.status !== "loser").map(player => {
      player.status = "winner";
      console.log(`${player.name} won!`);
    });
  }
}

let newGame = new Game;
