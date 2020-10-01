const LOSER = "loser";
const WINNER = "winner";
const PLAYING = "playing";

class Character {
  constructor(hp, dmg, mana, status = PLAYING) {
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = status;
  }

  isAlive = () => {
    if (this.hp > 0) return true;
    else {
      this.status = LOSER;
      return false;
    }
  }

  takeDamage = (receivedDmg) => {
    if (this.isAlive()) this.hp -= receivedDmg;
    else this.status = LOSER;
  }

  giveDamage = (playerToDamage) => {
    if (playerToDamage.isAlive()) {
      playerToDamage.takeDamage(this.dmg);
      if (playerToDamage.hp < 1) {
        playerToDamage.status = LOSER;
        console.log(`This is bullshit! ${playerToDamage.name} was supposed to win and now I'm dead...`);
        this.mana += 20;
      }
      return this.dmg;
    } else return console.log("can't beat a dead player, sorry");
  }
}

Character.instances = [];
Character.getAlivedPlayers = () => {
  return Character.instances.filter(player => player.status === 'playing');
}
Character.shufflePlayers = () => {
  let newBatch = Character.instances.filter(player => player.status != LOSER);
  return newBatch.sort(() => Math.random() - 0.5);
}
