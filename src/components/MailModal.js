import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';


/**
 * Renders a modal component that displays the author's email address and a message about job opportunities.
 * @param {Object} props - The props object.
 * @param {boolean} props.basicModal - A boolean value that determines whether the modal is displayed or not.
 * @param {function} props.setBasicModal - A function that sets the value of basicModal.
 * @returns {JSX.Element} - A JSX element that represents the MailModal component.
 */
export default function MailModal({basicModal, setBasicModal}) {

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Email Me</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody> I'm on the lookout for new job opportunities that will allow me to grow and contribute.
                            If you're interested in my work and have an opening in your organization, I would be thrilled to connect with you. <br/> <div className='text-center mt-3'>itaibenjy@gmail.com</div></MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}