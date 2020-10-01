class Paladin extends Character {
  constructor(name, hp = 16, dmg = 3, mana = 160) {
    super(hp, dmg, mana);
    this.name = name;
    this.specialAttack = {
      onThisTurn: this.healingLighting,
      onNextTurn: 0,
      triggerSideEffect: () => {console.log("test")},
    }
  }

  healingLighting = (playerToDamage) => {
    if (this.mana >= 40 && playerToDamage.isAlive()) {
      this.mana -= 40;
      playerToDamage.takeDamage(4);
      this.hp += 5;
      return 4;
    } else {
      console.log("not enought mana to proceed or your opponent is dead");
    }
  }
}

let ulder = new Paladin("Ulder");
Character.instances.push(ulder);
console.log(ulder.name);
