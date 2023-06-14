import {useRef, useCallback, useState, useEffect} from "react"
import { useThemeContext } from "./useThemeContext";

export function useFractal() {

    const {theme} = useThemeContext();

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [angle, setAngle] = useState(30)
    const [depth, setDepth] = useState(11)
    const [initialSize, setInitialSize] = useState(0.17)
    const [reducer , setReducer] = useState(0.78)
    const [isLeafs, setIsLeafs] = useState(false)
  


    // This function will be recreated whenever the canvas context changes.
    const drawLine = useCallback((x1Percent, y1Percent, x2Percent, y2Percent, lineWidth) => {
      if (contextRef.current) {
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
  
        const x1 = x1Percent * width;
        const y1 = y1Percent * height;
        const x2 = x2Percent * width;
        const y2 = y2Percent * height;
  
        const context = contextRef.current;
  
        context.beginPath(); // begin
  
        context.moveTo(x1, y1); 
        context.lineTo(x2, y2); 

        context.strokeStyle =  theme === "dark" ? "#332d2d" : "#fbfbfb"; // sets the color to fill
        context.lineWidth = lineWidth; // sets the line width
        context.stroke(); // applies the stroke
  
        context.closePath(); // end
      }
    }, [theme]);


    const drawLeaf = useCallback((xPercent, yPercent, size, angle) => {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const x = xPercent * width;
      const y = yPercent * height;

      const context = contextRef.current;
      context.save(); // save the current context state
      context.translate(x, y); // move the context to the center of the leaf
      context.rotate(angle * Math.PI / 180); // rotate the context by the angle
      context.beginPath();
      context.moveTo(0, 0);
      context.quadraticCurveTo(-size, -size, -size / 2, -size * 2);
      context.quadraticCurveTo(0, -size * 4, size / 2, -size * 2);
      context.quadraticCurveTo(size, -size, 0, 0);
      context.lineTo(0, -size * 3); // add a line in the middle of the leaf
      context.fillStyle = "green";
      context.fill();
      context.strokeStyle =  theme === "dark" ? "#332d2d" : "#fbfbfb"; // sets the color to fill
      context.lineWidth = size / 20;
      context.stroke();
      context.closePath();
      context.restore(); // restore the previous context state
    }, [theme]);

    useEffect(() => {
        clearCanvas()
        drawTree(0.5,1,-90,angle, initialSize, reducer, depth)
    }, [angle, theme, depth, initialSize, reducer, isLeafs])

    function drawTree(x1, y1, initialAngle, rotate, size, reducer, treeDepth, lineWidth = 5) {
        if (treeDepth === 0)  return;
        // make the x2 and y2 be between 0 and 1 for precetage representation
        const x2 = x1 + (Math.cos(initialAngle * Math.PI / 180) * size);
        const y2 = y1 + (Math.sin(initialAngle * Math.PI / 180) * size);
        drawLine(x1, y1, x2, y2, lineWidth);
        drawTree(x2, y2, initialAngle - rotate, rotate, size*reducer, reducer, treeDepth - 1, lineWidth*reducer);
        drawTree(x2, y2, initialAngle + rotate, rotate, size*reducer, reducer, treeDepth - 1, lineWidth*reducer);
        if (treeDepth === 1 && isLeafs) drawLeaf(x2, y2, size*500, initialAngle+90);
    }


    function clearCanvas() {
      const context = contextRef.current;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      context.clearRect(0, 0, width, height);
    }


    const canvasProps = {drawLine, canvasRef, contextRef, clearCanvas}
    const treeProps = {angle, setAngle, depth, setDepth, initialSize, setInitialSize, reducer, setReducer, isLeafs, setIsLeafs}


    return {canvasProps, treeProps}
}