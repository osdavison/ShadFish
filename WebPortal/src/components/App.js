import React from "react";
import { Chessboard, COLOR, MOVE_INPUT_MODE } from "cm-chessboard";
import Chess from "chess.js";
import axios from "axios";

class App extends React.Component {
  componentDidMount() {
    var chessboardProps = {
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
    };

    var chessboard = new Chessboard(
      document.getElementById("chessboard-container"),
      chessboardProps
    );
    var chess = new Chess();

    setInterval(() => {
      chess.reset();

      axios.get("/api/moves").then(
        response => {
          var moves = response.data.moves.split(" ");

          moves.forEach(move => {
            chess.move(move);
          });

          chessboard.setPosition(chess.fen());
        },
        () => {
          console.error("Could not get moves");
        }
      );
    }, 2000);
  }

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
