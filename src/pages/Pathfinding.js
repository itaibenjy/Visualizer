import { useState} from "react";
import PathBoard from "../components/Pathfinding/PathGrid";
import { MDBContainer, MDBRange, MDBTooltip, MDBBtn, MDBIcon, MDBTypography} from "mdb-react-ui-kit"
import { usePath } from '../hooks/usePath';
import Select from "../components/Select";

export default function Pathfinding() {

    const {speed, changeSpeed, excecuteAlgorithm, isVisualizing, Algorithms,  grid, updateColor, cellSize, cols, rows, setIsMouseDown, clearAll, clearVisited, mazeGen} = usePath()

    const [selected, setSelected] = useState(0);

    return (<div className="pathfinding">
        <PathBoard {...{grid, updateColor, cellSize, cols, rows, setIsMouseDown}}/>
        <MDBContainer className="mb-5">
            <MDBTypography className="display-1" tag='h1'>Pathfinding</MDBTypography>
            <MDBContainer  className="d-flex justify-content-center my-3">
                <Select disabled={isVisualizing} children={Algorithms.map((value) => value.name)} selected={Algorithms[selected].name} setSelected={setSelected}/>
            </MDBContainer>
            <MDBContainer  className="d-flex justify-content-center my-3">
                <MDBBtn size="sm" color="secondary" className="me-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Unvisited</MDBTypography>
                <MDBBtn size="sm" color="info" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Visited</MDBTypography>
                <MDBBtn size="sm" color="warning" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Current Nodes</MDBTypography>
                <MDBBtn size="sm" color="success" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Path Selected</MDBTypography>
            </MDBContainer>
            <MDBContainer  className="d-flex justify-content-center">
                <MDBTypography variant='h6' className="mx-2">Speed</MDBTypography>
                <MDBRange min='0' max='500' value={speed} onChange={changeSpeed} id='customRange' label=''/>
            </MDBContainer>
            <MDBContainer  className="d-flex justify-content-center mt-2 mb-4 pb-2">
                <MDBTooltip title='Generate Maze' tag='span' placement="bottom">
                    <MDBBtn floating color="dark" className="mx-1"  disabled={isVisualizing} onClick={mazeGen}><MDBIcon fas size="lg" icon="random" /></MDBBtn>
                </MDBTooltip>
                <MDBTooltip title='Clear Visited' tag='span' placement="bottom">
                    <MDBBtn floating color="warning" className="mx-1"  disabled={isVisualizing} onClick={clearVisited}><MDBIcon fas size="lg" icon="eraser" /></MDBBtn>
                </MDBTooltip>
                <MDBTooltip title='Start Visualizing' tag='span' placement="bottom">
                    <MDBBtn floating color="success" className="mx-1"  disabled={isVisualizing} onClick={() => excecuteAlgorithm(Algorithms[selected])}><MDBIcon fas size="lg" icon="play" /></MDBBtn>
                </MDBTooltip>
                <MDBTooltip title='Clear Board' tag='span' placement="bottom">
                    <MDBBtn floating color="danger" className="mx-1"  disabled={isVisualizing} onClick={clearAll}><MDBIcon fas size="lg" icon="trash-alt" /></MDBBtn>
                </MDBTooltip>
            </MDBContainer>
        </MDBContainer>
        </div>
    )

}
