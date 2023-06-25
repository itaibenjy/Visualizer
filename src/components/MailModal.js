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
  MDBContainer,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
  MDBSpinner,
  MDBIcon,
} from 'mdb-react-ui-kit';
import emailjs from '@emailjs/browser';
import { set } from 'date-fns';


/**
 * Renders a modal component that displays the author's email address and a message about job opportunities.
 * @param {Object} props - The props object.
 * @param {boolean} props.basicModal - A boolean value that determines whether the modal is displayed or not.
 * @param {function} props.setBasicModal - A function that sets the value of basicModal.
 * @returns {JSX.Element} - A JSX element that represents the MailModal component.
 */
export default function MailModal({basicModal, setBasicModal}) {
  // basic email modal
  const toggleShow = () => setBasicModal(!basicModal);
  const [details, setDetails] = useState({first: '', last: '', email: '', message: ''})
  const [loading, setLoading] = useState(false)

  // feedback modal
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({title: '', body: '', color: ''})

  function onValueChange(event) {
    const {name, value} = event.target
    setDetails({...details, [name]: value})
  }

  /**
   * Sends an email using the details provided in the form.
   * @param {Object} event - The event object.
   * @returns {void}
   */
  function sendEmail(event) {
    setLoading(true)
    event.persist();  // Add this line
    event.preventDefault();
    const form = event.target;
    
    // stop if the form is not valid
    if (form.checkValidity() === false) {
        event.stopPropagation();
        setLoading(false)
        return
    }

    emailjs.sendForm('service_0mfnxee', 'template_105pkpw', form, 'uZ76t2Tz2fvYIGrSu')
      .then((result) => {
          setFeedback({title:'Email has been sent!', body: 'Thank you for your interest. I will get back to you as soon as possible.', color: 'success'})
        setBasicModal(false)
        setTimeout(() => {
        setFeedbackModal(true)
        setDetails({first: '', last: '', email: '', message: ''})
        setLoading(false)
        form.reset()
      }, 400);
      }, (error) => {
          setFeedback({title:'Email has not been sent!', body: 'Please try again later.', color: 'danger'})
        setBasicModal(false)
        setTimeout(() => {
        setFeedbackModal(true)
        }, 400);
        setLoading(false)
      });
  }

  return (
    <>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBValidation onSubmit={sendEmail}>
            <MDBModalHeader>
              <MDBModalTitle>Email Me</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' type='reset' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody> 
              <MDBContainer >
                I'm on the lookout for new job opportunities that will allow me to grow and contribute.
                If you're interested in my work and have an opening in your organization, I would be thrilled to connect with you.
              </MDBContainer>
              <MDBContainer className='row m-0 px-2 mt-2'>
                <MDBValidationItem className='col-6 my-2' type="text" invalid feedback='Provide a first name.'>
                  <MDBInput  label='First Name' id='form1' type='text' name='first' value={details.first} onChange={onValueChange} required/>
                </MDBValidationItem>
                <MDBValidationItem className='col-6 my-2'type="text" invalid feedback='Provide a last name.'>
                  <MDBInput  label='Last Name' id='form2' type='text' name='last' value={details.last} onChange={onValueChange} required/>
                </MDBValidationItem>
                <MDBValidationItem className='col-12 my-2' type="email" invalid feedback='Please provide a valid email address.'>
                  <MDBInput  label='Email' id='form3' type='email' name='email' value={details.email} onChange={onValueChange} required/>
                </MDBValidationItem>
                <MDBValidationItem className='col-12 my-2' type='text' invalid feedback='Please provide a valid message.'>
                  <MDBTextArea  label='Message' id='form4' rows={4} name='message' value={details.message} onChange={onValueChange} required/>
                </MDBValidationItem>
              </MDBContainer>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type='reset' color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn type='submit' color='primary' disabled={loading}>
                {loading ?
                <>
                  <MDBSpinner size="sm" role="status" tag="span" className='me-2' />
                  Sending...
                </>
                  :
                  <>
                   Send
                   <MDBIcon fas icon='paper-plane' className='ms-2' />
                  </>
                }
              </MDBBtn>
            </MDBModalFooter>
            </MDBValidation>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>



      {/* success or fail Modal */}
       <MDBModal show={feedbackModal} setShow={setFeedbackModal} tabIndex='-1' >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{feedback.title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setFeedbackModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{feedback.body}</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color={feedback.color} onClick={() => setFeedbackModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      
    </>
  );
}