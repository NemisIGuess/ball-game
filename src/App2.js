import './App.css';
import React, { useEffect } from 'react';

// function App() {
//   useEffect(() => {
//     const myCanvas = document.getElementById('followMouse');
//     myCanvas.height =
//       window.innerHeight ||
//       document.documentElement.clientHeight ||
//       document.body.clientHeight; //height of the canvas
//     myCanvas.width =
//       window.innerWidth ||
//       document.documentElement.clientWidth ||
//       document.body.clientWidth; //width of the canvas
//     const followMs = myCanvas.getContext('2d'); //returns a drawing context on the canvas

//     //Get Position | Canvas
//     let myCanvasPos = getPosition(myCanvas);
//     let cursorX = 0; //Horizontal Position of Cursor
//     let cursorY = 0; //Vertical Position of Cursor

//     //addEventListener() works by adding a function or an object that implements EventListener to the list of event listeners for the specified event type on the EventTarget on which it's called
//     myCanvas.addEventListener('mousemove', setMousePosition, false);

//     //Set Mouse Position
//     function setMousePosition(e) {
//       //clientX provides the horizontal coordinate
//       cursorX = e.clientX - myCanvasPos.x;
//       //clientX provides the vertical coordinate
//       cursorY = e.clientY - myCanvasPos.y;
//       //sets all pixels in the rectangle defined by starting point (x, y) and size (width, height) to transparent black, erasing any previously drawn content
//       followMs.clearRect(0, 0, myCanvas.width, myCanvas.height);
//       //starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
//       followMs.beginPath();
//       //adds an arc to the path which is centered at (x, y) position with radius r starting at startAngle and ending at endAngle going in the given direction by anticlockwise (defaulting to clockwise)
//       followMs.arc(cursorX, cursorY, 20, 0, 2 * Math.PI, true);
//       //specifies the color or style to use inside shapes
//       followMs.fillStyle = 'rgb(0,255,255)';
//       //fills the current or given path with the current fill style using the non-zero or even-odd winding rule
//       followMs.fill();
//     }

//     function update() {
//       followMs.clearRect(0, 0, myCanvas.width, myCanvas.height);

//       followMs.beginPath();
//       followMs.arc(cursorX, cursorY, 20, 0, 2 * Math.PI, true);
//       followMs.fillStyle = 'rgb(0,255,255)';
//       followMs.fill();
//       //tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint

//       requestAnimationFrame(update);
//     }
//     update();

//     // deal with the page getting resized or scrolled
//     window.addEventListener('scroll', updatePosition, false);
//     window.addEventListener('resize', updatePosition, false);

//     function updatePosition() {
//       myCanvasPos = getPosition(myCanvas);
//     }

//     // Helper function to get an element's exact position
//     function getPosition(el) {
//       let xPos = 0;
//       let yPos = 0;

//       while (el) {
//         if (el.tagName === 'BODY') {
//           //deal with browser quirks with body/window/document and page scroll
//           const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
//           const yScroll = el.scrollTop || document.documentElement.scrollTop;

//           xPos += el.offsetLeft - xScroll + el.clientLeft;
//           yPos += el.offsetTop - yScroll + el.clientTop;
//         } else {
//           // for all other non-BODY elements
//           xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
//           yPos += el.offsetTop - el.scrollTop + el.clientTop;
//         }

//         el = el.offsetParent;
//       }
//       return {
//         x: xPos,
//         y: yPos,
//       };
//     }
//   });

//   return (
//     <div className="App">
//       <canvas id="followMouse"></canvas>
//     </div>
//   );
// }

// export default App;
