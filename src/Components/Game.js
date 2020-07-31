export default class Game {
    constructor(generation = 0, liveCells = new Map()) {
      this.generation = generation;
      this.liveCells = liveCells;
      this.nextGeneration = new Map();
      this.deadCells = new Map();
    }
  //
    getGeneration() {
      return this.generation;
    }
  
    getLiveCells() {
      return this.liveCells;
    }
  
    growCell(locus) {
      this.liveCells.set(locus.x + " , " + locus.y, {x: locus.x, y: locus.y});
    }
  
    killCell(locus) {
      this.liveCells.delete(locus);
    }
  
    isLiving(locus) {
      return this.liveCells.has(locus);
    }
  
    saveCell(locus) {
      if(this.isLiving(locus.x + " , " + locus.y)) {
        this.killCell(locus.x + " , " + locus.y);
      } else {
        this.growCell(locus);
      }
  
      return new Game(this.generation, this.liveCells);
    }
  
    addGeneration(){
      this.liveCells.forEach((item) => {
        this.countLivingNeighbors(item);
      })
  
      this.deadCells.forEach((item) => {
        this.countDeadNeighbors(item);
      })
  
      this.generation++;
  
      return new Game(this.generation, this.nextGeneration)
    }
  
    countLivingNeighbors(locus) {
      var liveNeighboors = 0;
  
      for(var i = locus.x - 1; i <= locus.x + 1; i++){
        for(var j = locus.y - 1; j <= locus.y + 1; j++){
          
          if(i === locus.x && j === locus.y)
            continue;
  
          if(this.isLiving(i + " , " + j)){
              liveNeighboors++;
          } else {
            this.deadCells.set(i + " , " +j, {x: i, y: j})
          }
        }
      }
  
      if((liveNeighboors === 2 || liveNeighboors === 3))
        this.nextGeneration.set(locus.x + " , " + locus.y, {x: locus.x, y: locus.y});
    }
  
    countDeadNeighbors(locus) {
      var liveNeighboors = 0;
  
      for(var i = locus.x - 1; i <= locus.x + 1; i++){
        for(var j = locus.y - 1; j <= locus.y + 1; j++){
  
          if(i === locus.x && j === locus.y)
            continue;
  
          if(this.isLiving(i + " , " + j)){
              liveNeighboors++;
            }
          }
        }
  
      if(liveNeighboors === 3)
        this.nextGeneration.set(locus.x + " , " + locus.y, {x: locus.x, y: locus.y});
    }
  
  }