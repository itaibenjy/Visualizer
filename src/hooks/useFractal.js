import {useRef, useCallback, useState, useEffect} from "react"
import { useThemeContext } from "./useThemeContext";

export function useFractal() {

    const {theme} = useThemeContext();

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [angle, setAngle] = useState(30)
  


    // This function will be recreated whenever the canvas context changes.
    const drawLine = useCallback((x1Percent, y1Percent, x2Percent, y2Percent) => {
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
        context.lineWidth = 5; // sets the line width
        context.stroke(); // applies the stroke
  
        context.closePath(); // end
      }
    }, []);

    useEffect(() => {
        clearCanvas()
        console.log(angle)
        drawTree(0.5,1,-90,angle,0.3,9)
    }, [angle])

    function drawTree(x1, y1, angle, rotate, size, depth) {
        if (depth === 0) return;
        // make the x2 and y2 be between 0 and 1 for precetage representation
        const x2 = x1 + (Math.cos(angle * Math.PI / 180) * size);
        const y2 = y1 + (Math.sin(angle * Math.PI / 180) * size);
        drawLine(x1, y1, x2, y2);
        drawTree(x2, y2, angle - rotate, rotate, size/1.5, depth - 1);
        drawTree(x2, y2, angle + rotate, rotate, size/1.5, depth - 1);
    }


    function clearCanvas() {
      const context = contextRef.current;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      context.clearRect(0, 0, width, height);
    }


    const canvasProps = {drawLine, canvasRef, contextRef, clearCanvas}


    return {canvasProps, angle, setAngle}
}