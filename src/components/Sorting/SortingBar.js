import React from "react";

export function SortingBar({array, index, value, color}) {
  return (<td className="sorting" key={index} style={{ width: `${100 / array.length}%`}}>
            <div className="sorting" key={index} style={{height: `${value / 10}%`, backgroundColor: `var(--mdb-${color})`}}></div>
            {array.length < 30 && <p>{value}</p>}
         </td>)
}
  