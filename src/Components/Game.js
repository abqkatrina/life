export default class Rules {
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
  
    addCell(pos) {
      this.liveCells.set(pos.x + " , " + pos.y, {x: pos.x, y: pos.y});
    }
  
    killCell(pos) {
      this.liveCells.delete(pos);
    }
  
    isLiving(pos) {
      return this.liveCells.has(pos);
    }

    saveCell(pos) {
      if(this.isLiving(pos.x + " , " + pos.y)) {
        this.killCell(pos.x + " , " + pos.y);
      } else {
        this.addCell(pos);
      }
  
      return new Rules(this.generation, this.liveCells);
    }
  
    addGeneration(){
      this.liveCells.forEach((item) => {
        this.countLivingNeighbors(item);
      })
  
      this.deadCells.forEach((item) => {
        this.countDeadNeighbors(item);
      })
  
      this.generation++;
  
      return new Rules(this.generation, this.nextGeneration)
    }
  
    countLivingNeighbors(pos) {
      var liveNeighbors = 0;
  
      for(var i = pos.x - 1; i <= pos.x + 1; i++){
        for(var j = pos.y - 1; j <= pos.y + 1; j++){
          
          if(i === pos.x && j === pos.y)
            continue;
  
          if(this.isLiving(i + " , " + j)){
              liveNeighbors++;
          } else {
            this.deadCells.set(i + " , " +j, {x: i, y: j})
          }
        }
      }
  
      if((liveNeighbors === 2 || liveNeighbors === 3))
        this.nextGeneration.set(pos.x + " , " + pos.y, {x: pos.x, y: pos.y});
    }
  
    countDeadNeighbors(pos) {
      var liveNeighbors = 0;
  
      for(var i = pos.x - 1; i <= pos.x + 1; i++){
        for(var j = pos.y - 1; j <= pos.y + 1; j++){
  
          if(i === pos.x && j === pos.y)
            continue;
  
          if(this.isLiving(i + " , " + j)){
              liveNeighbors++;
            }
          }
        }
  
      if(liveNeighbors === 3)
        this.nextGeneration.set(pos.x + " , " + pos.y, {x: pos.x, y: pos.y});
    }
  
  }