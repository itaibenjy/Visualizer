import { useState} from "react";
import PathBoard from "../components/Pathfinding/PathGrid";
import { MDBContainer, MDBRange, MDBTooltip, MDBBtn, MDBIcon, MDBTypography} from "mdb-react-ui-kit"
import { usePath } from '../hooks/usePath';
import Select from "../components/Select";
import InfoButton from "../components/InfoButton";
import HelpButton from "../components/HelpButton";
import $ from 'jquery';

// Import markdown files
// info
import AStar from "../data/info/Astar.md"
import BFS from "../data/info/BFS.md"
import DFS from "../data/info/DFS.md"
import Swarm from "../data/info/Swarm.md"
// help
import Basics from "../data/help/PathfindingBasic.md"
import Controls from "../data/help/PathfindingControls.md"
import RealTime from "../data/help/PathfindingRealTime.md"


/**
 * Pathfinding page component
 * @returns {JSX.Element} Pathfinding page JSX element
 */
export default function Pathfinding() {

    // Get grid, action, and algorithm props from usePath hook
    const {gridProps, actionProps, algorithmProps} = usePath()

    // State for hiding/showing pathCard
    const [hidden, setHidden] = useState(false);

    /**
     * Fade out pathCard, toggle hidden state, and fade in pathCard
     */
    function  changeCard() {
        $("#pathCard").fadeOut(300, () => {
            setHidden(!hidden);
            $("#pathCard").fadeIn(300);
        });
    }

    /**
     * Fade out all elements, execute function, and fade in all elements
     * @param {function} fn Function to execute after fade out
     */
    function animateChange(fn){
        $("#all").fadeOut(300, () => {
            fn();
            $("#all").fadeIn(300);
        });
    }

    // Return Pathfinding page JSX element
    return (<>
        <div className="pathfinding pageContainer" id="all">
            <PathBoard {...gridProps}  id="pathGrid"/>
            <MDBContainer id="pathCard" className={`mb-5 mx-auto myCard semi-transparent ${hidden ? "d-flex justify-content-center align-items-center" : ""}` }>
                {!hidden  &&
                <MDBContainer  className="d-flex justify-content-center mb-3">
                    <MDBTypography className="display-1" tag='h1' id="title">Pathfinding</MDBTypography>
                </MDBContainer>
                }
                <MDBContainer  className="d-flex justify-content-center my-3" >
                    <Select className="mx-1" disabled={actionProps.isVisualizing} children={algorithmProps.Algorithms.map((value) => value.name)} selected={algorithmProps.Algorithms[algorithmProps.selected].name} setSelected={algorithmProps.setSelected}/>
                    {algorithmProps.selected === 3 &&
                    <div className="ms-1">
                     <Select disabled={algorithmProps.isVisualizing} color="secondary" children={[1,2,3,4,5,6,7,8,9,10,11,12]} selected={algorithmProps.agentsSelected+1 + " Agents"} setSelected={algorithmProps.setAgentsSelected}/>
                    </div>
                    }
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
                    <MDBRange min='0' max='500' value={actionProps.speed} onChange={actionProps.changeSpeed} id='customRange' label=''/>
                </MDBContainer>
                <MDBContainer  className="d-flex justify-content-center mt-2 pb-2 mx-2" >
                    <MDBTooltip title='Generate Maze (Random DFS)' tag='span' placement="bottom">
                        <MDBBtn floating color="dark" className="mx-1"  disabled={actionProps.isVisualizing} onClick={actionProps.mazeGen}><MDBIcon fas size="lg" icon="random" /></MDBBtn>
                    </MDBTooltip>
                    <MDBTooltip title='Clear Visited' tag='span' placement="bottom">
                        <MDBBtn floating color="warning" className="mx-1"  disabled={actionProps.isVisualizing} onClick={() => animateChange(actionProps.clearVisited)}><MDBIcon fas size="lg" icon="eraser" /></MDBBtn>
                    </MDBTooltip>
                    <MDBTooltip title='Start Visualizing' tag='span' placement="bottom">
                        <MDBBtn floating color="success" className="mx-1"  disabled={actionProps.isVisualizing} onClick={actionProps.startVisualizing}><MDBIcon fas size="lg" icon="play" /></MDBBtn>
                    </MDBTooltip>
                    <MDBTooltip title='Clear Board' tag='span' placement="bottom">
                        <MDBBtn floating color="danger" className="mx-1"  disabled={actionProps.isVisualizing} onClick={() => animateChange(actionProps.clearAll)}><MDBIcon fas size="lg" icon="trash-alt" /></MDBBtn>
                    </MDBTooltip>
                </MDBContainer>
                <MDBContainer className={`d-flex justify-content-end ${hidden ? "" :"position-absolute top-0 end-0 mt-2"}`} style={{maxWidth: "fit-content"}}>
                    <MDBBtn tag='a' color='none' onClick={changeCard}><MDBIcon fas size="lg" icon={`${hidden ? "caret-down" : "caret-up"}`}/></MDBBtn>
                </MDBContainer>
            </MDBContainer>
        </div>
            {/* Info button */}
            <InfoButton 
             title="Pathfinding Information"
             markdownFiles={[AStar, BFS, DFS, Swarm]}
             titles={["A* Search", "Breadth First Search", "Depth First Search", "Swarm Search"]}
             />
            {/* Help button */}
            <HelpButton 
             title="How To use Pathfinding Visualizer"
             markdownFiles={[Basics, Controls, RealTime]}
             titles={["The Basics", "Controls", "Real Time"]}
             />
    </>)

}
