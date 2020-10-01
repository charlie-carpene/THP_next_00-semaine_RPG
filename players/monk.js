class Monk extends Character {
  constructor(name, hp = 8, dmg = 2, mana = 200) {
    super(hp, dmg, mana);
    this.name = name;
    this.specialAttack = {
      onThisTurn: this.heal,
      onNextTurn: 0,
      triggerSideEffect: () => {console.log("test")},
    }
  }

  heal = (playerToHeal) => {
    if (this.mana >= 25 && playerToHeal.isAlive()) {
      this.mana -= 25;
      playerToHeal.hp += 8;
      return -8;
    } else {
      console.log("not enought mana to proceed or the targeted player is dead");
    }
  }
}

let moana = new Monk("Moana");
Character.instances.push(moana);
console.log(moana.name);
