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
    const [isWind, setIsWind] = useState(false)
    const [wind, setWind] = useState(0)
    
    const strokeStyle = theme !== "dark" ? "#332d2d" : "#fbfbfb";

    // animate wind 
    useEffect(() => {
        if (isWind) {
            const interval = setInterval(() => {
                setWind(prevWind => prevWind + Math.random() * 1-0.5)
            }, 50);
            return () => clearInterval(interval);
        }
        else {
            setWind(0)
        }
    }, [isWind]);

  // rerender canvas when theme changes
  useEffect(() => {
      clearCanvas()
      drawTree(0.5,1,-90,angle, initialSize, reducer, depth)
  }, [angle, theme, depth, initialSize, reducer, leafType, favorSide, wind, isWind])

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

      /**
       * Draws a regular leaf shape on the canvas context.
       * @param {CanvasRenderingContext2D} context - The canvas context to draw on.
       * @param {number} size - The size of the leaf.
       * @param {string} strokeStyle - The color of the leaf's stroke.
       */
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

      // create a gradient fill for the leaf
      const gradient = context.createLinearGradient(0, -size * 2, 0, 0);
      gradient.addColorStop(0, "#ff6600");
      gradient.addColorStop(1, "#b30000");
      context.fillStyle = gradient;

      // set the stroke color and width
      context.strokeStyle = strokeStyle;
      context.lineWidth = size / 20;

      // draw the stroke and fill of the leaf
      context.stroke();
      context.fill();

      // draw the stem of the leaf
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, -size * 2.5);
      context.stroke();
    }

    /**
     * Draws a cherry blossom leaf shape on the canvas context.
     * @param {CanvasRenderingContext2D} context - The canvas context to draw on.
     * @param {number} size - The size of the leaf.
     * @param {string} strokeStyle - The color of the leaf's stroke.
     */
    const drawCherryBlossomLeaf = (context, size, strokeStyle) => {
      // draw the leaf shape using bezier curves
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

      // create a gradient fill for the leaf
      const gradient = context.createLinearGradient(0, -size, 0, size);
      gradient.addColorStop(0, "#ffccff");
      gradient.addColorStop(1, "#ff66cc");
      context.fillStyle = gradient;

      // set the stroke color and width
      context.strokeStyle = strokeStyle;
      context.lineWidth = size / 20;

      // draw the stroke and fill of the leaf
      context.stroke();
      context.fill();
    }

    /**
     * Draws a leaf on the canvas context.
     * @param {number} xPercent - The x-coordinate of the leaf's position as a percentage of the canvas width.
     * @param {number} yPercent - The y-coordinate of the leaf's position as a percentage of the canvas height.
     * @param {number} size - The size of the leaf.
     * @param {number} angle - The angle of rotation for the leaf.
     * @param {string} leafType - The type of leaf to draw.
     */
    const drawLeaf = useCallback((xPercent, yPercent, size, angle, leafType) => {
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const x = xPercent * width;
      const y = yPercent * height;

      // adjust the angle of the leaf based on wind direction and strength
      if (isWind){
        if(angle < 0) angle = 360 + angle;
        if(wind > 0) {
          angle = 90 + (Math.random() * 70 - 35)
        }
        if(wind < 0) {
          angle = 270 + (Math.random() * 70 - 35)
        }
      }

      const context = contextRef.current;
      context.save();
      context.translate(x, y);
      context.rotate(angle * Math.PI / 180);

      // draw the appropriate type of leaf
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
    }, [theme, leafType, isWind, wind]);

    /**
     * Draws a fractal tree on the canvas context.
     * @param {number} x1 - The x-coordinate of the starting point of the tree branch.
     * @param {number} y1 - The y-coordinate of the starting point of the tree branch.
     * @param {number} initialAngle - The initial angle of the tree branch.
     * @param {number} rotate - The angle of rotation for each subsequent branch.
     * @param {number} size - The size of the tree branch.
     * @param {number} reducer - The amount to reduce the size of each subsequent branch.
     * @param {number} treeDepth - The depth of the fractal tree.
     * @param {number} lineWidth - The width of the tree branch stroke.
     */
    function drawTree(x1, y1, initialAngle, rotate, size, reducer, treeDepth, lineWidth = 5) {
      if (treeDepth === 0)  return;
      // make the x2 and y2 be between 0 and 1 for precetage representation
      let x2 = x1 + (Math.cos(initialAngle * Math.PI / 180) * size);
      let y2 = y1 + (Math.sin(initialAngle * Math.PI / 180) * size);

      // adjust the position of the branch based on wind direction and strength
      if(isWind){
        x2 = x1 + (Math.cos((initialAngle + wind) * Math.PI / 180) * size);
        y2 = y1 + (Math.sin((initialAngle + wind) * Math.PI / 180) * size);
      }
      drawLine(x1, y1, x2, y2, lineWidth);
      drawTree(x2, y2, initialAngle - rotate, rotate, size*reducer*(1-favorSide)*2, reducer, treeDepth - 1, lineWidth*reducer);
      drawTree(x2, y2, initialAngle + rotate, rotate, size*reducer*favorSide*2, reducer, treeDepth - 1, lineWidth*reducer);
      if (treeDepth === 1 && leafType !== "no") drawLeaf(x2, y2, size*500, initialAngle+90, leafType);
    }

    /**
     * Clears the canvas context.
     */
    function clearCanvas() {
      const context = contextRef.current;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      context.clearRect(0, 0, width, height);
    }

    /**
     * Downloads the canvas as a PNG image.
     */
    function downloadCanvas() {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'My Fractal Tree.png';
      link.href = canvas.toDataURL()
      link.click();
    }

    // set up props for the canvas and tree components
    const canvasProps = {drawLine, canvasRef, contextRef, clearCanvas}
    const treeProps = {angle, setAngle, depth, setDepth, initialSize, setInitialSize, reducer, setReducer, leafType, setLeafType, favorSide, setFavorSide, isWind, setIsWind, wind, setWind}

    // return the canvas and tree props and the downloadCanvas function
    return {canvasProps, treeProps, downloadCanvas}
}
