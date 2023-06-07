import React, { useState, useEffect } from 'react';
import './Grid.css';  // Import CSS file for the grid
import { MDBIcon } from 'mdb-react-ui-kit';

const Grid = ({grid, updateColor, cellSize, cols, rows, setIsMouseDown}) => {


    function getClass (node){
        if (node.isWall) return 'wall';
        if (node.isPath) return 'path';
        if (node.isCurrent) return 'current';
        if (node.isVisited) return 'visited';
        return '';
    }



    return (
        <div className='grid' style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gridTemplateRows: `repeat(${rows}, ${cellSize}px)` }}>
            {grid.map((rows, i) =>
                rows.map((col, j) => (
                    <div 
                        key={`${i}-${j}`}
                        className={`cell ${getClass(grid[i][j])}`}
                        onMouseDown={() => setIsMouseDown(true)}
                        onMouseUp={() => setIsMouseDown(false)}
                        onMouseOver={() => updateColor(i, j, "wall")}
                    >  
                        {grid[i][j].isStart && <MDBIcon fas icon="dungeon" />}
                        {grid[i][j].isEnd && <MDBIcon fas icon="flag-checkered" />}
                    </div>
                ))
            )}
        </div>
    );
};

export default Grid;
