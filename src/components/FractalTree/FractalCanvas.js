import "./Fractal.css"
import {useRef, useEffect, useCallback} from "react";
import {useThemeContext} from "../../hooks/useThemeContext";

export default function FractalCanvas({canvasRef, contextRef, drawLine, clearCanvas}) {
    const {theme} = useThemeContext();

    const canvasStyle = {
        backgroundColor: theme === "dark" ? "var(--mdb-light)" : "var(--mdb-dark)",
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