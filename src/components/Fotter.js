import React, {useState} from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
  MDBTooltip
} from 'mdb-react-ui-kit';
import MailModal from './MailModal';

export default function App() {

    const [basicModal, setBasicModal] = useState(false);


    return (<>
        <MailModal basicModal={basicModal} setBasicModal={setBasicModal} />
        <MDBFooter className='text-center fotter' style={{ position: 'fixed', bottom: 0, width: '100%' }}>
            <MDBContainer className='p-2'>
                    <MDBTooltip title='Email' tag='a' placement='top'>
                    <MDBBtn
                        floating
                        className='mx-2'
                        style={{ backgroundColor: '#dd4b39' }}
                        role='button'
                        onClick={() => setBasicModal(true)}
                    >
                        <MDBIcon fab icon='google' />
                    </MDBBtn>
                    </MDBTooltip>
                    <MDBTooltip title='Linkedin' tag='span' placement='top'>
                    <MDBBtn
                        floating
                        className='mx-2'
                        style={{ backgroundColor: '#0082ca' }}
                        href='https://www.linkedin.com/in/itai-benjamin-66696b250'
                        role='button'
                    >
                        <MDBIcon fab icon='linkedin-in' />
                    </MDBBtn>
                    </MDBTooltip>

                    <MDBTooltip title='GitHub' tag='span' placement='top'>
                    <MDBBtn
                        floating
                        className='mx-2'
                        style={{ backgroundColor: '#333333' }}
                        href='https://github.com/itaibenjy'
                        role='button'
                    >
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                    </MDBTooltip>
            </MDBContainer>

        </MDBFooter>
  </> );
}