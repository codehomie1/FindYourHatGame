const prompt = require('prompt-sync')();

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor (field) {
    this.field = field;
    this.rowLength = this.field[0].length;
    this.colLength = this.field.length;
    this.currPos = [0,0];
  }

  startgame() {
     while(true) {
     this.printField();
     const move = prompt("Which way? ");
     if(!myField.validMove(move)) {
       break;
     }
  }
  }
  
  printField() {
    let resString = "";
    for(let i=0; i<this.colLength; i++) {
      for(let j=0; j<this.rowLength; j++) {
        resString += this.field[i][j];
      }
      resString += '\n';
    }
    console.log(resString);
  }

  /**
   * updates pos of player 
   * returns true if successful 
   * otherwise false
   */
  updatePos(direction) {
    // check if move is valid ( not in hole )
    // or out of bounds
    this.currPos[0] += direction[0];
    this.currPos[1] += direction[1];

    if(this.currPos[0] < 0 || this.currPos[0] >= this.colLength) {
      console.log("Out of bounds instruction");
      return false;
    } 

    if(this.currPos[1] < 0 || this.currPos[1] >= this.rowLength) {
      console.log("Out of bounds instruction");
      return false;
    }

    if(this.field[this.currPos[0]][this.currPos[1]] == hole) {
      console.log("Sorry you fell down a hole");
      return false;
    }

    if(this.field[this.currPos[0]][this.currPos[1]] == hat) {
      console.log("congrats you found your hat");
      return false;
    }

    this.field[this.currPos[0]][this.currPos[1]] = pathCharacter;
    return true;
  }

  /**
   * validates move (udrl) if move is option return direction
   * u[1,0] , d[-1,0], l[0,-1], r[0,1]
   */
  validMove(cmd) {
    switch(cmd) {
      case 'u':
        return this.updatePos([-1,0]);
        break;
      case 'd':
        return this.updatePos([1,0]);
        break;
      case 'l':
        return this.updatePos([0,-1]);
        break;
      case 'r':
        return this.updatePos([0,1]);
        break;
      case 'e':
        console.log("exit game...");
        return false;
      default:
        console.log("Invalid direction");
        return false;
    }
  }

  static generateField(height, width, chance) {
    // used to compare to chance
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let newField = [];

    // add field height 
    // every position starts with field character
    for(let i=0; i<height; i++) {
      newField.push(new Array(width).fill(fieldCharacter));
    }

    // add holes to field based on chance
    // the lower chance means less holes
    for(let i=0; i<height; i++) {
      for(let j=0; j<width; j++) {
        randomNumber = Math.floor(Math.random() * 10) + 1;
        if(randomNumber < chance) {
          newField[i][j] = hole;
        }
      }
    }

     // add hat at a random place within the board
     // randI = between 0- height(exclusive)
     // randJ = between 0-width(exclusive)
     // hat will spawn in lower half of map
     let min = Math.floor(height / 2);
     let randI = Math.floor(Math.random() * (height-min)) + min;
     let randJ = Math.floor(Math.random() * (width));
     newField[randI][randJ] = hat;

     // finally make sure player is in starting pos
     newField[0][0] = pathCharacter;
     return newField;
 }
}

console.log(`you lost your hat in the forest its getting dark so you must find it quickly. 
Dont fall into the holes or leave the forest. good luck.\n\nDirections are u(up), d(down), l(left), r(right)
MapGuide: holes(O) , hat(^), player(*)\n`);


let randH = Math.floor(Math.random() * 6) + 5; // rand 5-10
let randW = Math.floor(Math.random() * 6) + 5; // rand 5-10
let chance = 4;

const myField = new Field(
    Field.generateField(
        Number(randH), 
        Number(randW), 
        Number(chance))
    );

myField.startgame();




