class Piece {
  constructor(
    imageSx,
    imageSy,
    initialX,
    initialY,
    x,
    y,
    width,
    height,
    color
  ) {
    this.imageSx = imageSx;
    this.imageSy = imageSy;
    this.initialX = initialX;
    this.initialY = initialY;
    this.x = x;
    this.y = y;
    this.lastPosX = x;
    this.lastPosY = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isVisible = true;
    this.listPos = [[initialX, initialY]];
  }

  floorX(posX) {
    return Math.floor(posX / this.width);
  }

  floorY(posY) {
    return Math.floor(posY / this.height);
  }

  difAbsPosX(posX) {
    return Math.abs(this.floorX(posX) - this.floorX(this.lastPosX));
  }

  difAbsPosY(posY) {
    return Math.abs(this.floorY(posY) - this.floorY(this.lastPosY));
  }

  restart() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.lastPosX = this.initialX;
    this.lastPosY = this.initialY;
    this.isVisible = true;
  }

  move(mouseX, mouseY) {
    this.x = mouseX;
    this.y = mouseY;
  }

  drop(mouseX, mouseY) {
    this.move(mouseX, mouseY);
    this.lastPosX = mouseX;
    this.lastPosY = mouseY;
  }

  returnLastPos() {
    this.move(this.lastPosX, this.lastPosY);
  }

  pieceDie() {
    this.isVisible = false;
  }

  returnBack() {
    if (this.listPos.length > 1) {
      this.move(
        this.listPos[this.listPos.length - 1][0],
        this.listPos[this.listPos.length - 1][1]
      );
      this.listPos = this.listPos.slice(0, this.listPos.length - 1);
      this.x = this.listPos[this.listPos.length - 1][0];
      this.y = this.listPos[this.listPos.length - 1][1];
    }
  }
}

class King extends Piece {
  constructor(
    imageSx,
    imageSy,
    initialX,
    initialY,
    x,
    y,
    width,
    height,
    color
  ) {
    super(imageSx, imageSy, initialX, initialY, x, y, width, height, color);
    this.name = "King";
  }

  isLegalMove(posX, posY, board) {
    return this.difAbsPosX(posX) <= 1 && this.difAbsPosY(posY) <= 1;
  }
}

class Queen extends Piece {
  constructor(
    imageSx,
    imageSy,
    initialX,
    initialY,
    x,
    y,
    width,
    height,
    color
  ) {
    super(imageSx, imageSy, initialX, initialY, x, y, width, height, color);
    this.name = "Queen";
  }
  isLegalMove(posX, posY, board) {
    return (
      this.difAbsPosX(posX) === 0 ||
      this.difAbsPosY(posY) === 0 ||
      this.difAbsPosX(posX) === this.difAbsPosY(posY)
    );
  }
}

class Bishop extends Piece {
  constructor(
    imageSx,
    imageSy,
    initialX,
    initialY,
    x,
    y,
    width,
    height,
    color
  ) {
    super(imageSx, imageSy, initialX, initialY, x, y, width, height, color);
    this.name = "Bishop";
  }
  isLegalMove(posX, posY, board) {
    return this.difAbsPosX(posX) === this.difAbsPosY(posY);
  }
}

class Knight extends Piece {
  constructor(
    imageSx,
    imageSy,
    initialX,
    initialY,
    x,
    y,
    width,
    height,
    color
  ) {
    super(imageSx, imageSy, initialX, initialY, x, y, width, height, color);
    this.name = "Knight";
  }
  isLegalMove(posX, posY, board) {
    return (
      this.difAbsPosX(posX) + this.difAbsPosY(posY) === 3 &&
      this.difAbsPosX(posX) !== 0 &&
      this.difAbsPosY(posY) !== 0
    );
  }
}

class Tower extends Piece {
  constructor(
    imageSx,
    imageSy,
    initialX,
    initialY,
    x,
    y,
    width,
    height,
    color
  ) {
    super(imageSx, imageSy, initialX, initialY, x, y, width, height, color);
    this.name = "Tower";
  }
  isLegalMove(posX, posY, board) {
    return this.difAbsPosX(posX) === 0 || this.difAbsPosY(posY) === 0;
  }
}

class Pawn extends Piece {
  constructor(
    imageSx,
    imageSy,
    initialX,
    initialY,
    x,
    y,
    width,
    height,
    color
  ) {
    super(imageSx, imageSy, initialX, initialY, x, y, width, height, color);
    this.name = "Pawn";
  }
  isLegalMove(posX, posY, board) {
    let fposX = this.floorX(posX),
      flposX = this.floorX(this.lastPosX),
      iniY = this.floorY(this.initialY),
      fposY = this.floorY(posY),
      flposY = this.floorY(this.lastPosY),
      sdPos = Math.sign(3.5 - iniY) * (fposY - flposY),
      lateralDif = Math.abs(fposX - flposX);
    return (
      (lateralDif === 0 &&
        board.isCellEmpty(posX, posY) &&
        (sdPos === 1 ||
          (sdPos === 2 &&
            ((flposY === 1 && iniY === 1) || (flposY === 6 && iniY === 6))))) ||
      (lateralDif === 1 && sdPos === 1 && board.canPawnTake(posX, posY))
    );
  }
}
