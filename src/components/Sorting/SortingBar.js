import React from "react";

/**
 * Renders a single bar in the sorting visualisation.
 * @param {Array} array - The array being sorted.
 * @param {number} index - The index of the current bar being rendered.
 * @param {number} value - The value of the current bar being rendered.
 * @param {string} color - The color of the current bar being rendered.
 * @returns {JSX.Element} - A table cell containing a single bar in the sorting visualisation.
 */
export function SortingBar({array, index, value, color}) {
  return (<td className="sorting" key={index} style={{ width: `${100 / array.length}%`}}>
            <div className="sorting" key={index} style={{height: `${value / 10}%`, backgroundColor: `var(--mdb-${color})`}}></div>
            {array.length < 11 && <p>{value}</p>}
         </td>)
}
  