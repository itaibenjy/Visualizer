import React, { useRef } from 'react';
import './Grid.css';  // Import CSS file for the grid
import { MDBIcon } from 'mdb-react-ui-kit';

export default function PathBoard({ grid, updateColor, cellSize, cols, rows, setIsMouseDown, isMouseDown, setSetType, realTimeUpdate }) {
  const gridRef = useRef(null);

  function getClass(node) {
    if (node.isWall) return 'wall';
    if (node.isPath) return 'path';
    if (node.isCurrent) return 'current';
    if (node.isVisited) return 'visited';
    return '';
  }

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

  function update(node) {
    if (isMouseDown) {
      updateColor(node.row, node.col);
    }
  }

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
