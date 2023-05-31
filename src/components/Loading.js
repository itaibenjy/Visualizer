import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody, MDBSpinner } from 'mdb-react-ui-kit';

function Loading() {
    return (
        <MDBModal tabIndex="-1" staticBackdrop show>
            <MDBModalDialog centered className="modal-dialog-centered d-flex align-items-center justify-content-center">
                <MDBSpinner className='me-2' color="primary" style={{ width: '5rem', height: '5rem'}}>
                <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default Loading;
