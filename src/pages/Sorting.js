import { useState} from "react";
import SortingBoard from "../components/Sorting/SortingBoard"
import { MDBContainer, MDBRange, MDBTooltip, MDBBtn, MDBIcon, MDBTypography} from "mdb-react-ui-kit"
import { useSort } from '../hooks/useSort';
import Select from "../components/Select";

export default function Sorting() {

    const {array, changeSize, size, colors, bubbleSort, mergeSort, insertionSort, selectionSort, speed, changeSpeed, isVisualizing, randomizeArray} = useSort();
    const Algorithms = {
        "Bubble Sort": bubbleSort,
        "Merge Sort": mergeSort,
        "Insertion Sort": insertionSort,
        "Selection Sort": selectionSort
    }
    const [selected, setSelected] = useState("Bubble Sort");

    return (
        <MDBContainer className="mb-5">
            <MDBTypography className="display-1" tag='h1'>Sorting</MDBTypography>
            <MDBContainer  className="d-flex justify-content-center my-3">
                <Select disabled={isVisualizing} children={Object.keys(Algorithms).flat()} selected={selected} setSelected={setSelected}/>
            </MDBContainer>
            <MDBContainer  className="d-flex justify-content-center my-3">
                <MDBBtn size="sm" color="danger" className="me-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Swaping</MDBTypography>
                <MDBBtn size="sm" color="warning" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Compering</MDBTypography>
                <MDBBtn size="sm" color="info" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Unsorted</MDBTypography>
                <MDBBtn size="sm" color="success" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Sorted</MDBTypography>
            </MDBContainer>
            <MDBContainer  className="d-flex justify-content-center mt-3">
                <MDBTypography variant='h6' className="mx-2">Array Size</MDBTypography>
                <MDBRange  min='5' max='100' value={size} disabled={isVisualizing} onChange={changeSize} id='customRange'/>
            </MDBContainer>
            <SortingBoard array={array} colors={colors} className="mx-1" />
            <MDBContainer  className="d-flex justify-content-center">
                <MDBTypography variant='h6' className="mx-2">Sorting Speed</MDBTypography>
                <MDBRange min='0' max='500' value={speed} onChange={changeSpeed} id='customRange' label=''/>
            </MDBContainer>
            <MDBContainer  className="d-flex justify-content-center mt-2 mb-4 pb-2">
                <MDBTooltip title='Generate New Board' tag='span' placement="bottom">
                    <MDBBtn floating color="danger" className="mx-1" disabled={isVisualizing} onClick={randomizeArray}><MDBIcon fas size="lg" icon="random" /></MDBBtn>
                </MDBTooltip>
                <MDBTooltip title='Start Visualizing' tag='span' placement="bottom">
                    <MDBBtn floating color="success" className="mx-1"  disabled={isVisualizing} onClick={Algorithms[selected]}><MDBIcon fas size="lg" icon="play" /></MDBBtn>
                </MDBTooltip>
            </MDBContainer>
        </MDBContainer>
    )

}
