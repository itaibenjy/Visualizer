
import { MDBBtn, MDBContainer, MDBRange, MDBTypography, MDBIcon, MDBTooltip, MDBCheckbox } from "mdb-react-ui-kit";
import FractalCanvas from "../components/FractalTree/FractalCanvas";
import {useFractal} from "../hooks/useFractal"

export default function FractalTree() {

    const {canvasProps, treeProps} = useFractal()

    return (<MDBContainer className="p-1 mb-5 pageContainer">
        <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>Fractal Trees</MDBTypography>
        <MDBContainer id="Two-cards" className=" my-5">
            <MDBContainer  className="d-flex justify-content-center mb-4">
                <FractalCanvas {...canvasProps} className="mx-auto"/>
            </MDBContainer> 
            <MDBContainer  className="d-flex justify-content-center mb-4">
                <MDBContainer  className="card">
                    <MDBTypography tag='h6' style={{fontFamily: 'Monomania'}} className='display-6 text-center'>Tree Properties</MDBTypography>
                    <MDBContainer  className="my-3">
                        <MDBCheckbox label="Leaves" checked={treeProps.isLeafs} onChange={() => treeProps.setIsLeafs(!treeProps.isLeafs)}/>
                    </MDBContainer>
                    <MDBContainer  className="mb-5">
                        <MDBRange
                            max={180}
                            min={0}
                            defaultValue={treeProps.angle}
                            onChange={(e) => treeProps.setAngle(Number(e.target.value))}
                            id='angleRange'
                            label='Angle'
                        />
                    </MDBContainer>
                    <MDBContainer  className="my-5">
                        <MDBRange
                            max={12}
                            min={1}
                            defaultValue={treeProps.depth}
                            onChange={(e) => treeProps.setDepth(Number(e.target.value))}
                            id='branchRange'
                            label='Branches'
                        />
                    </MDBContainer>
                    <MDBContainer  className="my-5">
                        <MDBRange
                            max={100}
                            min={1}
                            defaultValue={treeProps.reducer*100}
                            onChange={(e) => treeProps.setReducer(Number(e.target.value)/100)}
                            id='reducerRange'
                            label='Branch Size Reducer (Percent)'
                        />
                    </MDBContainer>
                    <MDBContainer  className="my-5">
                        <MDBRange
                            max={100}
                            min={1}
                            defaultValue={treeProps.initialSize*100}
                            onChange={(e) => treeProps.setInitialSize(Number(e.target.value)/100)}
                            id='sizeRange'
                            label='Initial Branch Size (Percent of Canvas)'
                        />
                    </MDBContainer>
                </MDBContainer>
            </MDBContainer> 
        </MDBContainer>
    </MDBContainer>
    );
}