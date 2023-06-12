import { useEffect, useState} from "react";
import PathBoard from "../components/Pathfinding/PathGrid";
import { MDBContainer, MDBRange, MDBTooltip, MDBBtn, MDBIcon, MDBTypography} from "mdb-react-ui-kit"
import { usePath } from '../hooks/usePath';
import Select from "../components/Select";
import $ from 'jquery';


export default function Pathfinding() {

    const {speed, changeSpeed, startVisualizing, isVisualizing, Algorithms,  grid, updateColor, cellSize, cols, rows, setIsMouseDown, isMouseDown, clearAll, clearVisited, mazeGen, setSetType, selected, setSelected, realTimeUpdate} = usePath()
    const [hidden, setHidden] = useState(false);

    function  changeCard() {
        $("#pathCard").fadeOut(500, () => {
            setHidden(!hidden);
            $("#pathCard").fadeIn(500);
        });
    }

    function animateChange(fn){
        $("#all").fadeOut(500, () => {
            fn();
            $("#all").fadeIn(500);
        });
    }

    return (<div className="pathfinding pageContainer" id="all">
        <PathBoard {...{grid, updateColor, cellSize, cols, rows, setIsMouseDown, isMouseDown, setSetType, realTimeUpdate}}  id="pathGrid"/>
        <MDBContainer id="pathCard" className={`mb-5 mx-auto myCard semi-transparent ${hidden ? "d-flex justify-content-center align-items-center" : ""}` }>
            {!hidden  &&
            <MDBContainer  className="d-flex justify-content-center mb-3">
                <MDBTypography className="display-1" tag='h1' id="title">Pathfinding</MDBTypography>
            </MDBContainer>
            }
            <MDBContainer  className="d-flex justify-content-center my-3" >
                <Select disabled={isVisualizing} children={Algorithms.map((value) => value.name)} selected={Algorithms[selected].name} setSelected={setSelected}/>
            </MDBContainer>
            {!hidden  &&
            <MDBContainer  className="d-flex justify-content-center my-3" id="info">
                <MDBBtn size="sm" color="secondary" className="me-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Unvisited</MDBTypography>
                <MDBBtn size="sm" color="info" className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Visited</MDBTypography>
                <MDBBtn size="sm" style={{ backgroundColor: '#6f42c1' }} className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Current Nodes</MDBTypography>
                <MDBBtn size="sm" style={{ backgroundColor: '#20c997' }} className="mx-2"></MDBBtn> <MDBTypography className="my-1" tag='h6'>Path Selected</MDBTypography>
                        
            </MDBContainer>
            }
            <MDBContainer  className="d-flex justify-content-center">
                <MDBTypography variant='h6' className="mx-2">Speed</MDBTypography>
                <MDBRange min='0' max='500' value={speed} onChange={changeSpeed} id='customRange' label=''/>
            </MDBContainer>
            <MDBContainer  className="d-flex justify-content-center mt-2 pb-2 mx-2">
                <MDBTooltip title='Generate Maze (Random DFS)' tag='span' placement="bottom">
                    <MDBBtn floating color="dark" className="mx-1"  disabled={isVisualizing} onClick={mazeGen}><MDBIcon fas size="lg" icon="random" /></MDBBtn>
                </MDBTooltip>
                <MDBTooltip title='Clear Visited' tag='span' placement="bottom">
                    <MDBBtn floating color="warning" className="mx-1"  disabled={isVisualizing} onClick={() => animateChange(clearVisited)}><MDBIcon fas size="lg" icon="eraser" /></MDBBtn>
                </MDBTooltip>
                <MDBTooltip title='Start Visualizing' tag='span' placement="bottom">
                    <MDBBtn floating color="success" className="mx-1"  disabled={isVisualizing} onClick={startVisualizing}><MDBIcon fas size="lg" icon="play" /></MDBBtn>
                </MDBTooltip>
                <MDBTooltip title='Clear Board' tag='span' placement="bottom">
                    <MDBBtn floating color="danger" className="mx-1"  disabled={isVisualizing} onClick={() => animateChange(clearAll)}><MDBIcon fas size="lg" icon="trash-alt" /></MDBBtn>
                </MDBTooltip>
            </MDBContainer>
            <MDBContainer className={`d-flex justify-content-end ${hidden ? "" :"position-absolute top-0 end-0 mt-2"}`} style={{maxWidth: "fit-content"}}>
                <MDBBtn tag='a' color='none' onClick={changeCard}><MDBIcon fas size="lg" icon={`${hidden ? "caret-down" : "caret-up"}`}/></MDBBtn>
            </MDBContainer>
        </MDBContainer>
        </div>
    )

}
