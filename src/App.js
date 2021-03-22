import './App.css';
import React, { useEffect, useState, useCallback } from 'react';

function App() {
  const [canvas, setCanvas] = useState();
  const [canvasContext, setCanvasContext] = useState();
  const [mouseX, setMouseX] = useState(400);
  const [mouseY, setMouseY] = useState(400);

  //
  useEffect(() => {
    const canvas = document.getElementById('game-canvas');
    const context = canvas.getContext('2d');
    setCanvas(canvas);
    setCanvasContext(context);
  }, []);

  useEffect(() => {
    console.log(mouseX, mouseY);
  }, [mouseX, mouseY]);

  // const update = useCallback(() => {
  //   canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  //   canvasContext.beginPath();
  //   canvasContext.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
  //   canvasContext.fillStyle = '#FF6A6A';
  //   canvasContext.fill();

  //   requestAnimationFrame(update);
  // }, [mouseX, mouseY]);

  // Clears the canvas and redraws the circle with the new coordinates
  const update = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    canvasContext.beginPath();
    canvasContext.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
    canvasContext.fillStyle = '#FF6A6A';
    canvasContext.fill();

    requestAnimationFrame(update);
  };

  // Updates mouse position inside the canvas

  // const setMousePosition = useCallback(
  //   (e) => {
  //     let canvasPos = getPosition(canvas);
  //     setMouseX(e.clientX - canvasPos.x);
  //     setMouseY(e.clientY - canvasPos.y);
  //   },
  //   [mouseX, mouseY],
  // );

  const setMousePosition = (e) => {
    let canvasPos = getPosition(canvas);
    setMouseX(e.clientX - canvasPos.x);
    setMouseY(e.clientY - canvasPos.y);
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
    canvas.addEventListener('mousemove', (e) => {
      setMousePosition(e);
      update();
    });

    return () =>
      canvas.removeEventListener('mousemove', (e) => {
        setMousePosition(e);
        update();
      });
  }, [canvas, setMousePosition, update]);

  return (
    <div className="App">
      <canvas id="game-canvas" width="1000px" height="1000px"></canvas>
    </div>
  );
}

export default App;
