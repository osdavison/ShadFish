import React from "react";
import {
  Chessboard,
  COLOR,
  MOVE_INPUT_MODE,
  INPUT_EVENT_TYPE
} from "cm-chessboard";
import Chess from "chess.js";
import axios from "axios";

class App extends React.Component {
  chess = new Chess();
  chessboard = void 0;
  moves = [];

  componentDidMount() {
    this.chessboard = new Chessboard(
      document.getElementById("chessboard-container"),
      {
        position: "start", // set as fen, "start" or "empty"
        orientation: COLOR.white, // white on bottom
        style: {
          cssClass: "default",
          showCoordinates: true, // show ranks and files
          showBorder: false // display a border around the board
        },
        responsive: false, // resizes the board on window resize, if true
        animationDuration: 300, // pieces animation duration in milliseconds
        moveInputMode: MOVE_INPUT_MODE.dragMarker, // set to MOVE_INPUT_MODE.dragPiece or MOVE_INPUT_MODE.dragMarker for interactive movement
        sprite: {
          url: "./chessboard-sprite.svg",
          grid: 40 // the sprite is tiled with one piece every 40px
        }
      }
    );

    this.getMoves().then(moves => {
      this.moves = moves;
      this.applyMoves(moves);
    });

    setInterval(() => {
      this.getMoves().then(moves => {
        if (this.moves !== moves) {
          this.moves = moves;
          this.applyMoves(moves);
        }
      });
    }, 2000);

    this.chessboard.enableMoveInput(this.handleMoveInput, COLOR.white);
  }

  getMoves = () =>
    axios.get("/api/moves").then(response => {
      console.log(response.data);

      return response.data.moves.split(" ");
    });

  applyMoves = moves => {
    this.chess.reset();

    moves.forEach(move => {
      this.chess.move(move);
    });

    this.chessboard.setPosition(this.chess.fen());
  };

  handleMoveInput = event => {
    switch (event.type) {
      case INPUT_EVENT_TYPE.moveStart:
        console.log(`moveStart: ${event.square}`);
        if (this.chess.game_over()) {
          return false;
        }
        return true;
      case INPUT_EVENT_TYPE.moveDone:
        var moveResult = this.chess.move({
          from: event.squareFrom,
          to: event.squareTo
        });
        if (!moveResult) {
          return false;
        }

        this.moves.push(moveResult.san);

        axios.post("/api/moves", { moves: this.moves.join(" ") });

        return true;
      case INPUT_EVENT_TYPE.moveCanceled:
        console.log(`moveCanceled`);
    }
  };

  render() {
    try {
      return (
        <div className="App">
          <div
            id="chessboard-container"
            style={{ height: "400px", width: "400px" }}
          />
        </div>
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export default App;
