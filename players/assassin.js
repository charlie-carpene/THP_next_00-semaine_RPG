class Assassin extends Character {
  constructor(name, hp = 6, dmg = 6, mana = 20) {
    super(hp, dmg, mana);
    this.name = name;
    this.specialAttack = {
      onThisTurn: this.shadowHit,
      onNextTurn: 0,
      triggerSideEffect: () => {this.battleFallback()},
      targetedPlayer: '',
    }
  }

  battleFallback = () => {
    if (this.specialAttack.targetedPlayer.status === "playing") {
      this.takeDamage(7);
      console.log(`${this.name} gets -7 lifepoints because his opponent from last round is not dead`);
    }
  }

  takeDamage = (receivedDmg) => {
    if (this.isAlive()) this.hp -= (receivedDmg - this.armor);
    else this.status = LOSER;
  }

  shadowHit = (playerToDamage) => {
    if (this.mana >= 20 && playerToDamage.isAlive()) {
      this.mana -= 20;
      playerToDamage.takeDamage(7);
      this.specialAttack.targetedPlayer = playerToDamage;
      this.specialAttack.onNextTurn = 1;
      return 7;
    } else {
      console.log("not enought mana to proceed or the targeted player is dead");
    }
  }
}

let carl = new Assassin("Carl");
Character.instances.push(carl);
console.log(carl.name);
