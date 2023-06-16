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
 * A modal dialog component that displays a title, content, and buttons.
 * @param {string} title - The title of the modal dialog.
 * @param {string} content - The content to be displayed in the modal dialog.
 * @param {string} btnLabel - The label for the button displayed in the modal dialog.
 * @param {string} btnColor - The color of the button displayed in the modal dialog.
 * @param {function} handleClick - The function to be called when the button is clicked.
 * @param {boolean} showModel - A boolean value indicating whether the modal dialog should be displayed or not.
 * @param {function} setShowModal - A function to set the state of the modal dialog.
 * @param {function} toggleShow - A function to toggle the state of the modal dialog.
 * @returns {JSX.Element} - A modal dialog component.
 */
export default function ModalDialog({title, content, btnLabel, btnColor, handleClick, showModel, setShowModal, toggleShow}) {

  return (
    <>
      <MDBModal show={showModel} setShow={setShowModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{content}</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color={btnColor} onClick={handleClick}>{btnLabel}</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}