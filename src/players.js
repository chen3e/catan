class Player {
  constructor(name, number){
    this.name = name;
    this.number = number;
    this.wheat = 0;
    this.lumber = 0;
    this.brick = 0;
    this.sheep = 0;
    this.ore = 0;
    this.points = 0;
    this.ports = [];
  }
}

export { Player }

// [1, 1, 2, 1, 1, 2, 1, 1, 2]