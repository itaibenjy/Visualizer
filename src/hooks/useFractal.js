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
    const [leafType, setLeafType] = useState("no")
    const [favorSide, setFavorSide] = useState(0.5)
    
    const strokeStyle = theme !== "dark" ? "#332d2d" : "#fbfbfb";


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

        context.strokeStyle =  strokeStyle // sets the color to fill
        context.lineWidth = lineWidth; // sets the line width
        context.stroke(); // applies the stroke
  
        context.closePath(); // end
      }
    }, [theme]);

    const drawRegularLeaf = (context, size, strokeStyle) => {
        context.beginPath();
        context.moveTo(0, 0);
        context.bezierCurveTo(-size, -size, -size / 2, -size * 2, 0, -size * 3);
        context.bezierCurveTo(size / 2, -size * 2, size, -size, 0, 0);
        const gradient = context.createLinearGradient(0, -size * 2, 0, 0);
        gradient.addColorStop(0, "#00b300");
        gradient.addColorStop(1, "#004d00");
        context.fillStyle = gradient;
        context.strokeStyle = strokeStyle;
        context.lineWidth = size / 20;
        context.stroke();
        context.fill();
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -size * 3);
        context.stroke();
        context.closePath();
    }

    const drawMapleLeaf = (context, size, strokeStyle) => {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(-size , 0 );
      context.lineTo(-size*0.8 , -size*0.2 );
      context.lineTo(-size*1.5 , -size*0.5 );
      context.lineTo(-size*1.3, -size*0.6 );
      context.lineTo(-size*1.45, -size*0.9 );
      context.lineTo(-size*1.2, -size*0.8 );
      context.lineTo(-size*1.3, -size*1.1);
      context.lineTo(-size*0.6, -size);
      context.lineTo(-size*0.8, -size*1.5);
      context.lineTo(-size*0.6, -size*1.4);
      context.lineTo(0 , -size*2.5 );
      context.lineTo(size*0.6, -size*1.4);
      context.lineTo(size*0.8, -size*1.5);
      context.lineTo(size*0.6, -size);
      context.lineTo(size*1.3, -size*1.1);
      context.lineTo(size*1.2, -size*0.8 );
      context.lineTo(size*1.45, -size*0.9 );
      context.lineTo(size*1.3, -size*0.6 );
      context.lineTo(size*1.5 , -size*0.5 );
      context.lineTo(size*0.8 , -size*0.2 );
      context.lineTo(size, 0 );
      context.closePath();

      const gradient = context.createLinearGradient(0, -size * 2, 0, 0);
      gradient.addColorStop(0, "#ff6600");
      gradient.addColorStop(1, "#b30000");
      context.fillStyle = gradient;
      context.strokeStyle = strokeStyle;
      context.lineWidth = size / 20;
      context.stroke();
      context.fill();
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, -size * 2.5);
      context.stroke();
    }

    const drawCherryBlossomLeaf = (context, size, strokeStyle) => {
        context.beginPath();
        // Petal 1
        context.moveTo(0, -size);
        context.bezierCurveTo(-size*2, size, -size * 2, -size*3, 0, -size);
        // Petal 2
        context.moveTo(0, -size);
        context.bezierCurveTo(size*2, size, size * 2, -size*3, 0, -size);
        // Petal 3
        context.moveTo(0, -size);
        context.bezierCurveTo(-size*2, -size*3, size*2, -size*3, 0, -size);
        // Petal 4
        context.moveTo(0, -size);
        context.bezierCurveTo(-size*2, size, size*2, size, 0, -size);
        context.closePath();

        const gradient = context.createLinearGradient(0, -size, 0, size);
        gradient.addColorStop(0, "#ffccff");
        gradient.addColorStop(1, "#ff66cc");
        context.fillStyle = gradient;
        context.strokeStyle = strokeStyle;
        context.lineWidth = size / 20;
        context.stroke();
        context.fill();
    }



    const drawLeaf = useCallback((xPercent, yPercent, size, angle, leafType) => {
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;

        const x = xPercent * width;
        const y = yPercent * height;

        const context = contextRef.current;
        context.save();
        context.translate(x, y);
        context.rotate(angle * Math.PI / 180);

        switch(leafType) {
            case "regular":
                drawRegularLeaf(context, size, strokeStyle);
                break;
            case "maple":
                drawMapleLeaf(context, size, strokeStyle);
                break;
            case "cherryBlossom":
                drawCherryBlossomLeaf(context, size, strokeStyle);
                break;
        }

        context.restore();
    }, [theme, leafType]);

    useEffect(() => {
        clearCanvas()
        drawTree(0.5,1,-90,angle, initialSize, reducer, depth)
    }, [angle, theme, depth, initialSize, reducer, leafType, favorSide])

    function drawTree(x1, y1, initialAngle, rotate, size, reducer, treeDepth, lineWidth = 5) {
        if (treeDepth === 0)  return;
        // make the x2 and y2 be between 0 and 1 for precetage representation
        const x2 = x1 + (Math.cos(initialAngle * Math.PI / 180) * size);
        const y2 = y1 + (Math.sin(initialAngle * Math.PI / 180) * size);
        drawLine(x1, y1, x2, y2, lineWidth);
        drawTree(x2, y2, initialAngle - rotate, rotate, size*reducer*(1-favorSide)*2, reducer, treeDepth - 1, lineWidth*reducer);
        drawTree(x2, y2, initialAngle + rotate, rotate, size*reducer*favorSide*2, reducer, treeDepth - 1, lineWidth*reducer);
        if (treeDepth === 1 && leafType !== "no") drawLeaf(x2, y2, size*500, initialAngle+90, leafType);
    }


    function clearCanvas() {
      const context = contextRef.current;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      context.clearRect(0, 0, width, height);
    }

    function downloadCanvas() {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'My Fractal Tree.png';
      link.href = canvas.toDataURL()
      link.click();
    }


    const canvasProps = {drawLine, canvasRef, contextRef, clearCanvas}
    const treeProps = {angle, setAngle, depth, setDepth, initialSize, setInitialSize, reducer, setReducer, leafType, setLeafType, favorSide, setFavorSide}


    return {canvasProps, treeProps, downloadCanvas}
}