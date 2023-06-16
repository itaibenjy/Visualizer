import { SortingBar } from './SortingBar';
import { MDBContainer } from "mdb-react-ui-kit"
import "./Sorting.css"

/**
 * A component that displays a table of sorting bars, where each bar has a proportional height to the value in the array at the corresponding index.
 * @param {Array} array - The array of values to be displayed as sorting bars.
 * @param {Array} colors - An optional array of colors to be used for each sorting bar.
 * @returns {JSX.Element} - A table element containing the sorting bars.
 */
export default function SortingBoard({array, colors}) {

    return (
        <MDBContainer fluid style={{height: "100%"}}>
            <table className="sorting">
            <tbody>
                <tr>
                {/* map array to make a row of cells and each cell has a proportional hight to the array index value to indicate the size*/}
                {array.map((value, index) => {
                    return (
                    <SortingBar key={index} array={array} index={index} value={value} color={colors ? colors[index] : "dark"} />
                    )})}
                </tr>
            </tbody>
            </table>
        </MDBContainer>
    )

}
