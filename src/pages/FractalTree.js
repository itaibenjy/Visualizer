
import { MDBBtn, MDBContainer, MDBRange, MDBTypography, MDBRadio } from "mdb-react-ui-kit";
import FractalCanvas from "../components/FractalTree/FractalCanvas";
import {useFractal} from "../hooks/useFractal"
import {useState} from "react"

export default function FractalTree() {

    const {canvasProps, treeProps, downloadCanvas} = useFractal()
    const [leafDisabled, setLeafDisabled] = useState(false)

    function changeType(e) {
        treeProps.setLeafType(e.target.value)
    }


    function changeDepth(e) {
        treeProps.setDepth(e.target.value)
        if (e.target.value > 13){
            treeProps.setLeafType("no")
            setLeafDisabled(true)
        }
        else {
            setLeafDisabled(false)
        }

    }

    return (<MDBContainer className="p-1 mb-5 pageContainer">
        <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>Fractal Trees</MDBTypography>
        <MDBContainer id="Two-cards" className=" my-5">
            <MDBContainer  className="d-flex justify-content-center mb-4">
                <FractalCanvas {...canvasProps} className="mx-auto"/>
            </MDBContainer> 
            <MDBContainer  className="d-flex justify-content-center mb-4">
                <MDBContainer  className="card">
                    <MDBTypography tag='h6' style={{fontFamily: 'Monomania'}} className='display-6 text-center'>Tree Properties</MDBTypography>
                    <MDBContainer  className="mb-4">
                        <MDBRange
                            max={180}
                            min={0}
                            defaultValue={treeProps.angle}
                            onChange={(e) => treeProps.setAngle(Number(e.target.value))}
                            id='angleRange'
                            label='Angle'
                        />
                    </MDBContainer>
                    <MDBContainer  className="my-4">
                        <MDBRange
                            max={18}
                            min={1}
                            defaultValue={treeProps.depth}
                            onChange={changeDepth}
                            id='branchRange'
                            label='Branches'
                        />
                    </MDBContainer>
                    <MDBContainer  className="my-4">
                        <MDBRange
                            max={100}
                            min={1}
                            defaultValue={treeProps.reducer*100}
                            onChange={(e) => treeProps.setReducer(Number(e.target.value)/100)}
                            id='reducerRange'
                            label='Branch Size Reducer (Percent)'
                        />
                    </MDBContainer>
                    <MDBContainer  className="my-4">
                        <MDBRange
                            max={100}
                            min={1}
                            defaultValue={treeProps.initialSize*100}
                            onChange={(e) => treeProps.setInitialSize(Number(e.target.value)/100)}
                            id='sizeRange'
                            label='Initial Branch Size (Percent of Canvas)'
                        />
                    </MDBContainer>
                    <MDBContainer  className="d-flex justify-content-start mb-2 mt-4" id="radioCon">
                        <MDBRadio name='inlineRadioLeaf' id='inlineRadio1' value='no' label='No Leafs' inline checked={treeProps.leafType === "no"} onChange={changeType} disabled={leafDisabled}/>
                        <MDBRadio name='inlineRadioLeaf' id='inlineRadio2' value='regular' label='Regular' inline checked={treeProps.leafType === "regular"} onChange={changeType} disabled={leafDisabled}/>
                        <MDBRadio name='inlineRadioLeaf' id='inlineRadio3' value='maple' label='Maple' inline checked={treeProps.leafType === "maple"} onChange={changeType} disabled={leafDisabled}/>
                        <MDBRadio name='inlineRadioLeaf' id='inlineRadio4' value='cherryBlossom' label='Blossom' inline checked={treeProps.leafType === "cherryBlossom"} onChange={changeType} disabled={leafDisabled}/>
                    </MDBContainer> 
                </MDBContainer>
            </MDBContainer> 
        </MDBContainer>
        <MDBContainer  className="d-flex justify-content-center mb-4">
            <MDBBtn onClick={downloadCanvas} className="mx-auto">Download Image</MDBBtn>
        </MDBContainer> 
    </MDBContainer>
    );
}