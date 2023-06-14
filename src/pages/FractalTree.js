
import { MDBBtn, MDBContainer, MDBRange, MDBTypography, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import FractalCanvas from "../components/FractalTree/FractalCanvas";
import {useFractal} from "../hooks/useFractal"

export default function FractalTree() {

    const {canvasProps, angle, setAngle} = useFractal()

    return (<MDBContainer className="p-1 mb-5 pageContainer">
    <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>Fractal Trees</MDBTypography>
        <MDBContainer  className="d-flex justify-content-center my-5">
            <FractalCanvas {...canvasProps}/>
        </MDBContainer>
            <MDBRange
                max={90}
                min={0}
                defaultValue={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                id='angleRange'
                label='Angle'
            />
    </MDBContainer>
    );
}