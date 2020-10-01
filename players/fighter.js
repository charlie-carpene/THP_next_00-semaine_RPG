class Fighter extends Character {
  constructor(name, hp = 12, dmg = 4, mana = 40) {
    super(hp, dmg, mana);
    this.name = name;
    this.armor = 0;
    this.specialAttack = {
      onThisTurn: this.darkVision,
      onNextTurn: 0,
      triggerSideEffect: () => {this.resetArmor()},
    }
  }

  resetArmor = () => {
    this.armor = 0;
  }

  takeDamage = (receivedDmg) => {
    if (this.isAlive()) this.hp -= (receivedDmg - this.armor);
    else this.status = LOSER;
  }

  darkVision = (playerToDamage) => {
    if (this.mana >= 20 && playerToDamage.isAlive()) {
      this.mana -= 20;
      playerToDamage.takeDamage(5);
      this.armor = 2;
      this.specialAttack.onNextTurn = 1;
      return 5;
    } else {
      console.log("not enought mana to proceed or your opponent is dead");
    }
  }
}

let grace = new Fighter("Grace");
Character.instances.push(grace);
console.log(grace.name);
