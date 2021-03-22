import "./game-viewport.scss";
import React, { useEffect, useState, useContext } from "react";
import CommandsServiceContext from "../../services/commands-service.provider";
function GameViewport() {
  const commandsService = useContext(CommandsServiceContext);
  const [canvas, setCanvas] = useState();
  const [canvasContext, setCanvasContext] = useState();
  const [player1, setPlayer1] = useState({
    name: "nemis",
    color: "rgb(223, 128, 128)",
    x: 0,
    y: 0,
  });
  // const [player1Color, setPlayer1Color] = useState('rgb(223, 128, 128)');
  // const [mouseX, setMouseX] = useState(400);
  // const [mouseY, setMouseY] = useState(400);
  const [enemyMovement, setEnemyMovement] = useState([
    { name: "paquito", color: "rgb(199, 201, 98)", x: 150, y: 0 },
    { name: "periquito", color: "rgb(139, 201, 98)", x: 350, y: 0 },
    { name: "juanito", color: "rgb(98, 201, 201)", x: 650, y: 0 },
    { name: "pedrito", color: "rgb(219, 114, 179)", x: 850, y: 0 },
  ]);

  //
  useEffect(() => {
    const canvas = document.getElementById("game-canvas");
    const context = canvas.getContext("2d");
    setCanvas(canvas);
    setCanvasContext(context);
    // dataMockUp();
  }, []);

  useEffect(() => {
    if (!commandsService.onActions) return;
    commandsService?.onActions((playerActions) => {
      console.log(playerActions);
      setEnemyMovement(
        Object.keys(playerActions).map((playerId, index) => ({
          name: playerId,
          x: playerActions[playerId]?.position?.x,
          y: playerActions[playerId]?.position?.y,
          color: getColor(index),
        }))
      );
    });
  }, [commandsService]);

  const getColor = (index) => {
    let colors = [
      "rgb(200, 200, 100)",
      "rgb(100, 200, 100)",
      "rgb(0, 200, 100)",
      "rgb(200, 100, 100)",
      "rgb(200, 0, 100)",
      "rgb(200, 200, 0)",
    ];
    return colors[index];
  };
  const dataMockUp = () => {
    setTimeout(() => {
      if (enemyMovement[0].y > 1000) {
        setEnemyMovement([...enemyMovement, (enemyMovement[0].y = 0)]);
        setEnemyMovement([...enemyMovement, (enemyMovement[1].y = 0)]);
        setEnemyMovement([...enemyMovement, (enemyMovement[2].y = 0)]);
      }
      setEnemyMovement([...enemyMovement, (enemyMovement[0].y += 5)]);
      setEnemyMovement([...enemyMovement, (enemyMovement[1].y += 5)]);
      setEnemyMovement([...enemyMovement, (enemyMovement[2].y += 5)]);
      dataMockUp();
    }, 17);
  };

  useEffect(() => {
    if (canvasContext === null || canvasContext === undefined) {
      return;
    }
    draw();
  }, [player1, enemyMovement]);

  // Clears the canvas and redraws the circle with the new coordinates
  const draw = () => {
    if (canvasContext) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      drawPlayer(player1);
      enemyMovement.forEach((enemy) => {
        drawPlayer(enemy);
      });
    }
  };

  const drawPlayer = (player) => {
    canvasContext.beginPath();
    canvasContext.arc(player.x, player.y, 30, 0, 2 * Math.PI);
    canvasContext.fillStyle = player.color;
    canvasContext.fill();
  };

  // Updates mouse position inside the canvas

  const setMousePosition = (e) => {
    let canvasPos = getPosition(canvas);
    setPlayer1({
      ...player1,
      x: (player1.x = e.clientX - canvasPos.x),
      y: (player1.y = e.clientY - canvasPos.y),
    });
    commandsService.notifyMovement({
      x: e.clientX - canvasPos.x,
      y: e.clientY - canvasPos.y,
    });
  };

  // Helper function to get the exact position of the mouse.
  const getPosition = (element) => {
    let xPosition = 0;
    let yPosition = 0;

    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;

    return {
      x: xPosition,
      y: yPosition,
    };
  };

  useEffect(() => {
    if (canvas === null || canvas === undefined) {
      return;
    }
    canvas.addEventListener("mousemove", (e) => {
      setMousePosition(e);
    });

    return () =>
      canvas.removeEventListener("mousemove", (e) => {
        setMousePosition(e);
      });
  }, [canvas]);

  return (
    <div className="game-viewport">
      <canvas id="game-canvas" width="1000px" height="1000px"></canvas>
    </div>
  );
}

export default GameViewport;
