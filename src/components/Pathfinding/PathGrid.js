import React, { useRef } from 'react';
import './Grid.css';  // Import CSS file for the grid
import { MDBIcon } from 'mdb-react-ui-kit';

/**
 * PathBoard component that renders a grid of cells for pathfinding visualization.
 * @param {Array} grid - 2D array of nodes representing the grid.
 * @param {Function} updateColor - Function to update the color of a cell.
 * @param {number} cellSize - Size of each cell in pixels.
 * @param {number} cols - Number of columns in the grid.
 * @param {number} rows - Number of rows in the grid.
 * @param {Function} setIsMouseDown - Function to set whether the mouse button is pressed.
 * @param {boolean} isMouseDown - Whether the mouse button is pressed.
 * @param {Function} setSetType - Function to set the type of the current cell.
 * @param {Function} realTimeUpdate - Function to update the grid in real time.
 * @returns {JSX.Element} - PathBoard component JSX element.
 */
export default function PathBoard({ grid, updateColor, cellSize, cols, rows, setIsMouseDown, isMouseDown, setSetType, realTimeUpdate }) {
  const gridRef = useRef(null);

  /**
   * Returns the CSS class for a given node.
   * @param {Object} node - Node object representing a cell in the grid.
   * @returns {string} - CSS class for the node.
   */
  function getClass(node) {
    if (node.isWall) return 'wall';
    if (node.isPath) return 'path';
    if (node.isCurrent) return 'current';
    if (node.isVisited) return 'visited';
    return '';
  }

  /**
   * Sets the type of the current cell and updates the grid.
   * @param {Object} node - Node object representing a cell in the grid.
   * @returns {Promise<void>} - Promise that resolves when the type is set and the grid is updated.
   */
  async function getType(node) {
    if (node.isStart) {
      await setSetType("start");
    } else if (node.isEnd) {
      await setSetType("end");
    } else if (node.isWall) {
      grid[node.row][node.col].isWall = false;
      await realTimeUpdate()
      await setSetType("unwall");
    } else {
      grid[node.row][node.col].isWall = true;
      await realTimeUpdate()
      await setSetType("wall");
    }

    await setIsMouseDown(true);
  }

  /**
   * Updates the color of a cell if the mouse button is pressed.
   * @param {Object} node - Node object representing a cell in the grid.
   * @returns {void}
   */
  function update(node) {
    if (isMouseDown) {
      updateColor(node.row, node.col);
    }
  }

  /**
   * Returns the row and column of a touch event on the grid.
   * @param {TouchEvent} e - Touch event object.
   * @returns {Object} - Object containing the row and column of the touch event.
   */
  function getTouchPos(e) {
    const touch = e.touches[0];
    const gridRect = gridRef.current.getBoundingClientRect();
    const x = touch.clientX - gridRect.left;
    const y = touch.clientY - gridRect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    return { row, col };
  }

  return (
    <div ref={gridRef} className='grid' style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gridTemplateRows: `repeat(${rows}, ${cellSize}px)` }}>
      {grid.map((rows, i) =>
        rows.map((col, j) => (
          <div
            key={`${i}-${j}`}
            className={`cell ${getClass(grid[i][j])}`}
            onMouseDown={() => getType(grid[i][j])}
            onMouseUp={() => { setIsMouseDown(false); setSetType("wall") }}
            onMouseOver={() => update(grid[i][j])}
            onTouchStart={(e) => {
              if (grid[i][j].isStart) setSetType("start");
              else if (grid[i][j].isEnd) setSetType("end");
              else if (grid[i][j].isWall) setSetType("unwall");
              else setSetType("wall");
            }}
            onTouchMove={(e) => {
              const { row, col } = getTouchPos(e);
              if(row === i && col === j) return;
              updateColor(row, col, true);
            }}
            onDrag={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          >
            {grid[i][j].isStart && <MDBIcon fas icon="dungeon" />}
            {grid[i][j].isEnd && <MDBIcon fas icon="flag-checkered" />}
          </div>
        ))
      )}
    </div>
  );
};
