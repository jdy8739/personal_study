//Q2
class User {
  private static x = 10;
  public static y = 20;

  static addOne(param: number) {
    User.x += param;
  }

  static showX() :void {
    console.log(User.x)
  }

  protoF() {
    alert('hi.');
  }
}


//Q3
const body = document.getElementsByTagName('body')[0];
const aniBox = document.createElement('div');
const len = '400px';
aniBox.style.width = len;
aniBox.style.height = len;

body.append(aniBox);

class Square {
  width;
  height;
  color;
  constructor(width: number, height: number, color: string) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    if(aniBox) {
      const newBox = document.createElement('div');
      newBox.style.position = 'absolute';
      newBox.style.backgroundColor = 'red';
      newBox.style.width = this.width + 'px';
      newBox.style.height = this.height + 'px';

      const x = Math.random() * 400 + 1;
      const y = Math.random() * 400 + 1;

      newBox.style.top = x + 'px';
      newBox.style.left = y + 'px';

      aniBox.append(newBox);
    }
  }
}

const sq = new Square(30, 30, 'red');
sq.draw();

const boxMaker = document.querySelector('#box-maker');

if(boxMaker instanceof HTMLButtonElement) {
  boxMaker.addEventListener('click', () => {
    sq.draw();
  });
}


