class Berzerker extends Character {
  constructor(name, hp = 8, dmg = 4, mana = 0) {
    super(hp, dmg, mana);
    this.name = name;
    this.specialAttack = {
      onThisTurn: this.rage,
      onNextTurn: 0,
      triggerSideEffect: () => {console.log("test")},
    }
  }

  rage = () => {
    if (this.isAlive()) {
      this.hp -= 1;
      this.dmg += 1;
    }
  }
}

let draven = new Berzerker("Draven");
Character.instances.push(draven);
console.log(draven.name);
