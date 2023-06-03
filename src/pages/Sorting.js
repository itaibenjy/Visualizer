import SortingBoard from "../components/Sorting/SortingBoard"
import { MDBContainer, MDBRange, MDBTooltip, MDBBtn, MDBIcon} from "mdb-react-ui-kit"
import { useSort } from '../hooks/useSort';

export default function Sorting() {

    const {array, changeSize, size, colors, bubbleSort, speed, changeSpeed, isVisualizing} = useSort();


    return (
        <div>
            <h1>Sorting</h1>
            <MDBContainer  className="d-flex justify-content-center">
                <MDBTooltip title='Array Size' tag='span'>
                    <MDBRange min='5' max='100' value={size} disabled={isVisualizing} onChange={changeSize} id='customRange' label=''/>
                </MDBTooltip>
            </MDBContainer>
            <MDBContainer  className="d-flex justify-content-center">
                <MDBBtn color="danger" className="mx-2"> Swaping </MDBBtn>
                <MDBBtn color="warning" > Compering </MDBBtn>
            </MDBContainer>
            <SortingBoard array={array} colors={colors}/>
            <MDBContainer  className="d-flex justify-content-center">
                <MDBTooltip title='Speed Control' tag='span'>
                    <MDBRange min='0' max='200' value={speed} onChange={changeSpeed} id='customRange' label=''/>
                </MDBTooltip>
                <MDBTooltip title='Start Visualizing' tag='span' placement="bottom">
                    <MDBBtn floating color="success" disabled={isVisualizing} onClick={bubbleSort}><MDBIcon fas size="lg" icon="play" /></MDBBtn>
                </MDBTooltip>
            </MDBContainer>
        </div>
    )

}
