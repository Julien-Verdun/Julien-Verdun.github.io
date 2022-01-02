class Board {
  constructor(widthCell, heightCell, widthBoard, heightBoard) {
    this.widthCell = widthCell;
    this.heightCell = heightCell;
    this.widthBoard = widthBoard;
    this.heightBoard = heightBoard;
    this.grid = this.initGrid(widthCell, heightCell, widthBoard, heightBoard);
    this.authorizedMoves = [];
    this.piecesCoordinates = this.initPiecesCoordinates(widthCell, heightCell);
    this.pieces = null;
    this.initPieces(widthCell, heightCell);
    this.selectedPiece = null;
    this.colorToPlay = "white";
  }

  floorX(posX) {
    return Math.floor(posX / this.widthCell);
  }

  floorY(posY) {
    return Math.floor(posY / this.heightCell);
  }

  initGrid() {
    var grid = [];
    for (var i = 0; i <= this.floorX(this.widthBoard); i++) {
      for (var j = 0; j <= this.floorY(this.heightBoard); j++) {
        grid.push([
          i * this.widthCell,
          j * this.heightCell,
          i * this.widthCell,
          j * this.heightCell,
        ]);
      }
    }
    return grid;
  }

  initPiecesCoordinates() {
    var whiteSide = parseInt(2 * Math.random()); // 0 for white at the top and 1 for white at the bottom
    return {
      white: {
        King: {
          imageSx: 0,
          imageSy: 0,
          initialX: [4 * this.widthCell],
          initialY: [(whiteSide === 0 ? 0 : 7) * this.heightCell],
          x: [4 * this.widthCell],
          y: [(whiteSide === 0 ? 0 : 7) * this.heightCell],
        },
        Queen: {
          imageSx: 200,
          imageSy: 0,
          initialX: [3 * this.widthCell],
          initialY: [(whiteSide === 0 ? 0 : 7) * this.heightCell],
          x: [3 * this.widthCell],
          y: [(whiteSide === 0 ? 0 : 7) * this.heightCell],
        },
        Bishop: {
          imageSx: 400,
          imageSy: 0,
          initialX: [2 * this.widthCell, 5 * this.widthCell],
          initialY: [
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
          ],
          x: [2 * this.widthCell, 5 * this.widthCell],
          y: [
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
          ],
        },
        Knight: {
          imageSx: 600,
          imageSy: 0,
          initialX: [this.widthCell, 6 * this.widthCell],
          initialY: [
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
          ],
          x: [this.widthCell, 6 * this.widthCell],
          y: [
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
          ],
        },
        Tower: {
          imageSx: 800,
          imageSy: 0,
          initialX: [0, 7 * this.widthCell],
          initialY: [
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
          ],
          x: [0, 7 * this.widthCell],
          y: [
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
            (whiteSide === 0 ? 0 : 7) * this.heightCell,
          ],
        },
        Pawn: {
          imageSx: 1000,
          imageSy: 0,
          initialX: [
            0,
            this.widthCell,
            2 * this.widthCell,
            3 * this.widthCell,
            4 * this.widthCell,
            5 * this.widthCell,
            6 * this.widthCell,
            7 * this.widthCell,
          ],
          initialY: [
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
          ],
          x: [
            0,
            this.widthCell,
            2 * this.widthCell,
            3 * this.widthCell,
            4 * this.widthCell,
            5 * this.widthCell,
            6 * this.widthCell,
            7 * this.widthCell,
          ],
          y: [
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
            (whiteSide === 0 ? 1 : 6) * this.heightCell,
          ],
        },
      },
      black: {
        King: {
          imageSx: 0,
          imageSy: 200,
          initialX: [4 * this.widthCell],
          initialY: [(whiteSide === 1 ? 0 : 7) * this.heightCell],
          x: [4 * this.widthCell],
          y: [(whiteSide === 1 ? 0 : 7) * this.heightCell],
        },
        Queen: {
          imageSx: 200,
          imageSy: 200,
          initialX: [3 * this.widthCell],
          initialY: [(whiteSide === 1 ? 0 : 7) * this.heightCell],
          x: [3 * this.widthCell],
          y: [(whiteSide === 1 ? 0 : 7) * this.heightCell],
        },
        Bishop: {
          imageSx: 400,
          imageSy: 200,
          initialX: [2 * this.widthCell, 5 * this.widthCell],
          initialY: [
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
          ],
          x: [2 * this.widthCell, 5 * this.widthCell],
          y: [
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
          ],
        },
        Knight: {
          imageSx: 600,
          imageSy: 200,
          initialX: [this.widthCell, 6 * this.widthCell],
          initialY: [
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
          ],
          x: [this.widthCell, 6 * this.widthCell],
          y: [
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
          ],
        },
        Tower: {
          imageSx: 800,
          imageSy: 200,
          initialX: [0, 7 * this.widthCell],
          initialY: [
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
          ],
          x: [0, 7 * this.widthCell],
          y: [
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
            (whiteSide === 1 ? 0 : 7) * this.heightCell,
          ],
        },
        Pawn: {
          imageSx: 1000,
          imageSy: 200,
          initialX: [
            0,
            this.widthCell,
            2 * this.widthCell,
            3 * this.widthCell,
            4 * this.widthCell,
            5 * this.widthCell,
            6 * this.widthCell,
            7 * this.widthCell,
          ],
          initialY: [
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
          ],
          x: [
            0,
            this.widthCell,
            2 * this.widthCell,
            3 * this.widthCell,
            4 * this.widthCell,
            5 * this.widthCell,
            6 * this.widthCell,
            7 * this.widthCell,
          ],
          y: [
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
            (whiteSide === 1 ? 1 : 6) * this.heightCell,
          ],
        },
      },
    };
  }

  initPieces() {
    var piecesClass = {
      King: King,
      Queen: Queen,
      Bishop: Bishop,
      Knight: Knight,
      Tower: Tower,
      Pawn: Pawn,
    };

    this.pieces = {
      white: {
        King: {},
        Queen: {},
        Bishop: {},
        Knight: {},
        Tower: {},
        Pawn: {},
      },
      black: {
        King: {},
        Queen: {},
        Bishop: {},
        Knight: {},
        Tower: {},
        Pawn: {},
      },
    };
    var pieceType;
    ["white", "black"].forEach((color) => {
      Object.keys(this.piecesCoordinates[color]).forEach((piece) => {
        pieceType = this.piecesCoordinates[color][piece];
        pieceType.initialX.forEach((vle, idx) => {
          this.pieces[color][piece][idx] = new piecesClass[piece](
            pieceType.imageSx,
            pieceType.imageSy,
            pieceType.initialX[idx],
            pieceType.initialY[idx],
            pieceType.x[idx],
            pieceType.y[idx],
            this.widthCell,
            this.heightCell,
            color
          );
        });
      });
    });
  }

  findSelectedPieces(mouseX, mouseY) {
    let color, piece, pieceInst;
    for (var i = 0; i < 2; i++) {
      color = ["white", "black"][i];
      for (var j = 0; j < Object.values(this.pieces[color]).length; j++) {
        piece = Object.values(this.pieces[color])[j];
        for (var k = 0; k < Object.values(piece).length; k++) {
          pieceInst = Object.values(piece)[k];
          if (
            pieceInst.x < mouseX &&
            mouseX < pieceInst.x + this.widthCell &&
            pieceInst.y < mouseY &&
            mouseY < pieceInst.y + this.heightCell
          ) {
            return pieceInst;
          }
        }
      }
    }
    return null;
  }

  restart() {
    this.initPieces();
    ["white", "black"].forEach((color) => {
      Object.keys(this.piecesCoordinates[color]).forEach((piece) => {
        this.piecesCoordinates[color][piece].initialX.forEach((vle, idx) => {
          this.pieces[color][piece][idx].restart();
        });
      });
    });
  }

  checkForCollisions(mouseX, mouseY) {
    let color,
      piece,
      pieceInst,
      collisions = [];
    for (var i = 0; i <= 1; i++) {
      color = ["white", "black"][i];
      for (var j = 0; j < Object.values(this.pieces[color]).length; j++) {
        piece = Object.values(this.pieces[color])[j];
        for (var k = 0; k < Object.values(piece).length; k++) {
          pieceInst = Object.values(piece)[k];
          if (
            pieceInst.x <= mouseX &&
            mouseX < pieceInst.x + this.widthCell &&
            pieceInst.y <= mouseY &&
            mouseY < pieceInst.y + this.heightCell
          ) {
            collisions.push(pieceInst);
          }
        }
      }
    }
    return collisions;
  }

  removePiece(pieceCollided) {
    pieceCollided.x = -200;
    pieceCollided.y = -200;
  }

  changeColorToPlay() {
    this.colorToPlay = this.colorToPlay === "black" ? "white" : "black";
  }

  savePos() {
    let color, piece, pieceInst;
    for (var i = 0; i < 2; i++) {
      color = ["white", "black"][i];
      for (var j = 0; j < Object.values(this.pieces[color]).length; j++) {
        piece = Object.values(this.pieces[color])[j];
        for (var k = 0; k < Object.values(piece).length; k++) {
          pieceInst = Object.values(piece)[k];
          pieceInst.listPos.push([pieceInst.x, pieceInst.y]);
        }
      }
    }
  }

  toPreviousPos() {
    let color, piece;
    for (var i = 0; i <= 1; i++) {
      color = ["white", "black"][i];
      for (var j = 0; j < Object.values(this.pieces[color]).length; j++) {
        piece = Object.values(this.pieces[color])[j];
        for (var k = 0; k < Object.values(piece).length; k++) {
          Object.values(piece)[k].returnBack();
        }
      }
    }
  }

  isCellEmpty(posX, posY) {
    var color, piece, pieceInst;
    for (var i = 0; i <= 1; i++) {
      color = ["white", "black"][i];
      for (var j = 0; j < Object.keys(this.pieces[color]).length; j++) {
        piece = this.pieces[color][Object.keys(this.pieces[color])[j]];
        for (var k = 0; k < Object.keys(piece).length; k++) {
          pieceInst = piece[Object.keys(piece)[k]];
          if (
            pieceInst.x <= posX &&
            posX < pieceInst.x + this.widthCell &&
            pieceInst.y <= posY &&
            posY < pieceInst.y + this.heightCell &&
            pieceInst !== this.selectedPiece
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  canPawnTake(posX, posY) {
    // check if there is a piece in this pos
    var collisions = this.checkForCollisions(posX, posY).filter(
      (collision) => collision.color != this.selectedPiece.color
    );
    return collisions.length >= 1;
  }

  isCheck(colorKingThreatened) {
    // check if the enemy cells are threatening the king
    var posKingX = Object.values(this.pieces[colorKingThreatened]["King"])[0].x,
      posKingY = Object.values(this.pieces[colorKingThreatened]["King"])[0].y;
    var colorEnemy, piece, pieceInst;
    colorEnemy = ["white", "black"].filter(
      (color) => color !== colorKingThreatened
    )[0];
    // console.log(
    //   "colorEnemy : ",
    //   colorEnemy,
    //   "colorKingThreatened : ",
    //   colorKingThreatened
    // );
    for (var j = 0; j < Object.keys(this.pieces[colorEnemy]).length; j++) {
      piece = this.pieces[colorEnemy][Object.keys(this.pieces[colorEnemy])[j]];
      for (var k = 0; k < Object.keys(piece).length; k++) {
        pieceInst = piece[Object.keys(piece)[k]];
        if (pieceInst.name !== "King") {
          if (["Queen", "Tower"].includes(pieceInst.name)) {
            // check if king is in the same line or column than the queen or tower
            if (
              this.floorX(pieceInst.x) === this.floorX(posKingX) ||
              this.floorY(pieceInst.y) === this.floorY(posKingY)
            ) {
              // check if their are pieces between the piece and the king with isMoveAuthorize
              if (
                this.isMoveAuthorize(
                  pieceInst.x,
                  pieceInst.y,
                  posKingX,
                  posKingY
                )
              ) {
                return true;
              }
            }
          } else if (["Queen", "Bishop"].includes(pieceInst.name)) {
            // check if king is in the same diagolanes than the queen or bishop
            // console.log(
            //   "Diag queen : ",
            //   this.floorX(pieceInst.x),
            //   this.floorY(pieceInst.y),
            //   this.floorX(posKingX),
            //   this.floorY(posKingY)
            // );
            if (
              Math.abs(this.floorX(pieceInst.x) - this.floorX(posKingX)) ===
              Math.abs(this.floorY(pieceInst.y) - this.floorY(posKingY))
            ) {
              // console.log(
              //   "Diag queen bishop true",
              //   this.isMoveAuthorize(
              //     pieceInst.x,
              //     pieceInst.y,
              //     posKingX,
              //     posKingY
              //   )
              // );
              // check if their are pieces between the piece and the king with isMoveAutoorize
              if (
                this.isMoveAuthorize(
                  pieceInst.x,
                  pieceInst.y,
                  posKingX,
                  posKingY
                )
              ) {
                return true;
              }
            } else {
              // console.log("Diag queen bishop false");
            }
          } else if (pieceInst.name === "Pawn") {
            // check if the king is in the threaten pos of the pawn
            if (
              Math.abs(this.floorX(pieceInst.x) - this.floorX(posKingX)) ===
                1 &&
              Math.sign(4 - this.floorY(pieceInst.initialY)) *
                (this.floorY(pieceInst.y) - this.floorY(posKingY)) ===
                1
            ) {
              return true;
            }
          } else if (pieceInst.name === "Knight") {
            // check if the king is in the threaten pos of the knight
            if (
              Math.abs(this.floorX(pieceInst.x) - this.floorX(posKingX)) +
                Math.abs(this.floorY(pieceInst.y) - this.floorY(posKingY)) ===
                3 &&
              Math.abs(this.floorX(pieceInst.x) - this.floorX(posKingX)) !==
                0 &&
              Math.abs(this.floorY(pieceInst.y) - this.floorY(posKingY)) !== 0
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  canKingEscape(colorKingThreatened) {
    // check the cells around the King
    var posKingX = Object.values(this.pieces[colorKingThreatened]["King"])[0].x,
      posKingY = Object.values(this.pieces[colorKingThreatened]["King"])[0].y;

    // is an empty cell not threaten around the king ?
    // can the king eat a piece and not be threaten anymore
    return posKingX, posKingY;
  }

  isMat(colorKingThreatened) {
    var posKingX = Object.values(this.pieces[colorKingThreatened]["King"])[0].x,
      posKingY = Object.values(this.pieces[colorKingThreatened]["King"])[0].y;

    // check if the king can move in a safe cell or an other peace can stop the check
    return (
      this.isCheck(colorKingThreatened, posKingX, posKingY) &&
      !this.canKingEscape(colorKingThreatened)
    );
  }

  isMoveAuthorize(posBeginningX, posBeginningY, posEndX, posEndY) {
    // check every cell between beginning and end cells
    var idxBegX = this.floorX(posBeginningX),
      idxBegY = this.floorY(posBeginningY),
      idxEndX = this.floorX(posEndX),
      idxEndY = this.floorY(posEndY);
    if (idxEndX !== idxBegX) {
      if (idxEndY !== idxBegY) {
        // horizontal move and vertical move
        for (var i = 1; i <= Math.abs(idxBegX - idxEndX); i++) {
          if (
            // check the direction left right or top or bottom
            this.checkForCollisions(
              (idxBegX + Math.sign(idxEndX - idxBegX) * i) * this.widthCell,
              (idxBegY + Math.sign(idxEndY - idxBegY) * i) * this.heightCell
            ).filter(
              (collision) => collision.color === this.selectedPiece.color
            ).length !== 0
          ) {
            return false;
          }
        }
      } else {
        // horizontal move but no vertical move
        for (
          var i = Math.min(idxBegX, idxEndX) + 1;
          i < Math.max(idxBegX, idxEndX);
          i++
        ) {
          if (
            this.checkForCollisions(i * this.widthCell, posBeginningY)
              .length !== 0
          ) {
            return false;
          }
        }
      }
    } else {
      if (Math.abs(idxEndY - idxBegY) !== 0) {
        // no horizontal move but vertical move
        for (
          var j = Math.min(idxBegY, idxEndY) + 1;
          j < Math.max(idxBegY, idxEndY);
          j++
        ) {
          if (
            this.checkForCollisions(posBeginningX, j * this.heightCell)
              .length !== 0
          ) {
            return false;
          }
        }
      } else {
        // beginning and end are the same cell
        return true;
      }
    }
    return true;
  }

  getAuthorizedMoves() {
    var authorizedMoves = [];
    if (
      this.selectedPiece !== null &&
      this.selectedPiece.color == this.colorToPlay
    ) {
      for (var i = 0; i < this.floorX(this.widthBoard); i++) {
        for (var j = 0; j < this.floorY(this.heightBoard); j++) {
          if (
            (this.floorX(this.selectedPiece.x) !== this.widthCell * i ||
              this.floorY(this.selectedPiece.y) !== this.heightCell * j) &&
            // this.checkForCollisions(this.widthCell * i, this.heightCell * j)
            //   .length === 0 &&
            this.selectedPiece.isLegalMove(
              this.widthCell * i,
              this.heightCell * j,
              this
            )
          ) {
            authorizedMoves.push([i, j]);
          }
        }
      }
    }
    return authorizedMoves;
  }

  pawnPromotion(posY) {
    var piecesClass = {
      Queen: Queen,
      Bishop: Bishop,
      Knight: Knight,
      Tower: Tower,
    };

    let fposY = this.floorY(posY),
      iniY = this.floorY(this.selectedPiece.initialY);
    console.log("pawnPromotion : ", fposY, iniY);
    if ((iniY <= 2 && fposY === 7) || (iniY >= 6 && fposY === 0)) {
      // ask user to choose a piece to replace the pawn
      let promotedPieceType = "Queen";
      console.log(
        "promote",
        this.pieces[this.selectedPiece.color][promotedPieceType]
      );
      let nextIdx = Object.keys(
        this.pieces[this.selectedPiece.color][promotedPieceType]
      ).length;
      this.pieces[this.selectedPiece.color][promotedPieceType][nextIdx] =
        new piecesClass[promotedPieceType](
          this.piecesCoordinates[this.selectedPiece.color][
            promotedPieceType
          ].imageSx,
          this.piecesCoordinates[this.selectedPiece.color][
            promotedPieceType
          ].imageSy,
          this.selectedPiece.initialX,
          this.selectedPiece.initialY,
          this.selectedPiece.x,
          this.selectedPiece.y,
          this.widthCell,
          this.heightCell,
          this.selectedPiece.color
        );
      this.removePiece(this.selectedPiece);
      console.log(
        "promoted",
        this.pieces[this.selectedPiece.color][promotedPieceType]
      );
      return true;
    }
    return false;
  }
}
