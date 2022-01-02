/*
Implement pawn promotion: choose between queen, bishop, knight qnd tower
Improve check and mat detection 
*/

class ChessLogic {
  constructor(widthCell, heightCell) {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.gameState = document.getElementById("game-state");

    this.piecesImage = document.getElementById("chess-pieces");

    this.board = new Board(
      widthCell,
      heightCell,
      this.canvas.width,
      this.canvas.height
    );

    this.drag = false;

    this.canvas.addEventListener("mousedown", (e) => this.mouseDown(e), false);
    this.canvas.addEventListener("mouseup", (e) => this.mouseUp(e), false);
    this.canvas.addEventListener("mousemove", (e) => this.mouseMove(e), false);

    document
      .getElementById("toPreviousPos")
      .addEventListener("click", () => this.toPreviousPos());
    document
      .getElementById("restart")
      .addEventListener("click", () => this.restart());
  }

  restart() {
    this.board.restart();
    this.draw();
  }

  defeat() {
    this.gameState.innerHTML = "You lost !!";
  }

  drawGrid() {
    this.board.grid.forEach((line, index) => {
      this.ctx.beginPath();
      this.ctx.rect(
        line[0],
        line[1],
        this.board.widthCell,
        this.board.heightCell
      );
      if (
        this.board.authorizedMoves.filter(
          (move) =>
            move[0] === this.board.floorX(line[0]) &&
            move[1] === this.board.floorY(line[1])
        ).length > 0
      ) {
        this.ctx.fillStyle = index % 2 == 0 ? "#FF7777" : "#FF9973";
      } else {
        this.ctx.fillStyle = index % 2 == 0 ? "#DDDDDD" : "#00AA95";
      }
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    ["white", "black"].forEach((color) => {
      Object.keys(this.board.pieces[color]).forEach((piece) => {
        Object.values(this.board.pieces[color][piece]).forEach((value) => {
          if (value.isVisible) {
            this.ctx.drawImage(
              this.piecesImage,
              value.imageSx,
              value.imageSy,
              200,
              200,
              value.x,
              value.y,
              this.board.widthCell,
              this.board.heightCell
            );
          }
        });
      });
    });
  }

  toPreviousPos() {
    this.board.toPreviousPos();
    this.draw();
  }

  mouseDown(e) {
    console.log("mouse down");
    this.drag = true;
    let mouseX = e.pageX - this.canvas.offsetLeft;
    let mouseY = e.pageY - this.canvas.offsetTop;
    var pieceInst = this.board.findSelectedPieces(mouseX, mouseY);
    if (pieceInst !== null) {
      this.board.selectedPiece = pieceInst;
      this.board.authorizedMoves = this.board.getAuthorizedMoves();
      this.draw();
    }
  }

  mouseUp(e) {
    console.log("mouse up");
    let mouseX = e.pageX - this.canvas.offsetLeft;
    let mouseY = e.pageY - this.canvas.offsetTop;
    if (
      this.board.selectedPiece !== null &&
      this.board.colorToPlay === this.board.selectedPiece.color
    ) {
      console.log(
        "isMoveAuthorize : ",
        this.board.isMoveAuthorize(
          this.board.selectedPiece.lastPosX,
          this.board.selectedPiece.lastPosY,
          mouseX,
          mouseY
        )
      );
      console.log(
        "isLegalMove",
        this.board.selectedPiece.isLegalMove(mouseX, mouseY, this.board)
      );
      console.log(
        "check not same cell : ",
        this.board.floorX(this.board.selectedPiece.lastPosX) !==
          this.board.floorX(mouseX),
        this.board.floorY(this.board.selectedPiece.lastPosY) !==
          this.board.floorY(mouseY)
      );
      this.board.authorizedMoves = [];
      if (
        this.board.floorX(this.board.selectedPiece.lastPosX) !==
          this.board.floorX(mouseX) ||
        this.board.floorY(this.board.selectedPiece.lastPosY) !==
          this.board.floorY(mouseY)
      ) {
        if (
          this.board.selectedPiece.isLegalMove(mouseX, mouseY, this.board) &&
          ((["Queen", "Tower", "Bishop"].includes(
            this.board.selectedPiece.name
          ) &&
            this.board.isMoveAuthorize(
              this.board.selectedPiece.lastPosX,
              this.board.selectedPiece.lastPosY,
              mouseX,
              mouseY
            )) ||
            ["Knight", "Pawn", "King"].includes(this.board.selectedPiece.name))
        ) {
          // checkIfCellEmpty
          // if not empty and a differnent color, diePawn
          // check if piece can go to the cell (don't throw another piece)
          var pieceCollided = this.board
            .checkForCollisions(mouseX, mouseY)
            .filter(
              (pcCollided) =>
                pcCollided.color !== this.board.selectedPiece.color
            );
          console.log("pieceCollided :", pieceCollided);

          if (pieceCollided.length !== 0) {
            if (pieceCollided[0].color !== this.board.selectedPiece.color) {
              pieceCollided[0].pieceDie();
              this.board.removePiece(pieceCollided[0]);
              this.board.selectedPiece.drop(
                this.board.widthCell * this.board.floorX(mouseX),
                this.board.heightCell * this.board.floorY(mouseY)
              );
              console.log(
                "isCheck : ",
                this.board.colorToPlay,
                ["white", "black"].filter(
                  (color) => color !== this.board.colorToPlay
                )[0],
                this.board.isCheck(
                  ["white", "black"].filter(
                    (color) => color !== this.board.colorToPlay
                  )[0]
                )
              );
              this.board.pawnPromotion(mouseY);
              this.board.changeColorToPlay();
              this.board.savePos();
            } else {
              this.board.selectedPiece.returnLastPos();
            }
          } else {
            this.board.selectedPiece.drop(
              this.board.widthCell * this.board.floorX(mouseX),
              this.board.heightCell * this.board.floorY(mouseY)
            );
            console.log(
              "isCheck : ",
              this.board.colorToPlay,
              ["white", "black"].filter(
                (color) => color !== this.board.colorToPlay
              )[0],
              this.board.isCheck(
                ["white", "black"].filter(
                  (color) => color !== this.board.colorToPlay
                )[0]
              )
            );
            this.board.changeColorToPlay();
            this.board.savePos();
          }
        } else {
          this.board.selectedPiece.returnLastPos();
        }
      } else {
        this.board.selectedPiece.returnLastPos();
      }
      this.draw();
    }
    this.drag = false;
    this.board.selectedPiece = null;
  }

  mouseMove(e) {
    if (this.drag) {
      let mouseX = e.pageX - this.canvas.offsetLeft;
      let mouseY = e.pageY - this.canvas.offsetTop;
      if (
        this.board.selectedPiece !== null &&
        this.board.selectedPiece.color === this.board.colorToPlay
      ) {
        this.board.selectedPiece.move(
          mouseX - this.board.widthCell / 2,
          mouseY - this.board.heightCell / 2
        );
        this.draw();
      }
    }
  }
}

let chessLogic = new ChessLogic(50, 50);
chessLogic.draw();
