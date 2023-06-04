import { SortingBar } from './SortingBar';
import { MDBContainer } from "mdb-react-ui-kit"
import "./Sorting.css"

export default function SortingBoard({array, colors}) {

    return (
        <MDBContainer fluid style={{height: "100%"}}>
            <table className="sorting">
            <tbody>
                <tr>
                {/* map array to make a row of cells and each cell has a proportional hight to the array index value to indicate the size*/}
                {array.map((value, index) => {
                    return (
                    <SortingBar array={array} index={index} value={value} color={colors ? colors[index] : "dark"} />
                    )})}
                </tr>
            </tbody>
            </table>
        </MDBContainer>
    )

}


