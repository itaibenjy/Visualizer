import "./Fractal.css"
import {useRef, useEffect, useCallback} from "react";
import {useThemeContext} from "../../hooks/useThemeContext";

/**
 * Renders a canvas element for the fractal tree visualization.
 * @param {Object} props - The component props.
 * @param {Object} props.canvasRef - The reference to the canvas element.
 * @param {Object} props.contextRef - The reference to the canvas context.
 * @param {Function} props.drawLine - The function to draw a line on the canvas.
 * @param {Function} props.clearCanvas - The function to clear the canvas.
 * @returns {JSX.Element} - The canvas element.
 */
export default function FractalCanvas({canvasRef, contextRef, drawLine, clearCanvas}) {
    const {theme} = useThemeContext();

    const canvasStyle = {
        backgroundColor: theme !== "dark" ? "#ffffff" : "#424242",
    }
  
    useEffect(() => {
      const canvas = canvasRef.current;
      // Set canvas size to match its CSS size.
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
  
      const context = canvas.getContext('2d');
      contextRef.current = context;
  
    }, [drawLine]);

    return (<>
        <canvas id="fractal" ref={canvasRef} className="fractal" style={canvasStyle}></canvas>
    </>
    )
}