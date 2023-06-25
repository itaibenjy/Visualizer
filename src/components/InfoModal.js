import React, { useState, useEffect } from 'react';
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
  MDBSpinner
} from 'mdb-react-ui-kit';
import Markdown from './Markdown';
import Tabs from './Tabs';

export default function InfoModal({show, setShow, markdownFiles, title, titles}) {

  const [markdown, setMarkdown] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getMarkdown() {
    let markdown = [];
    for (let i = 0; i < markdownFiles.length; i++) {
      const response = await fetch(markdownFiles[i]);
      const text = await response.text();
      markdown.push(text);
    }
    return markdown;
  }

  useEffect(() => {
    getMarkdown().then(markdown => {
      setMarkdown(markdown);
      setIsLoading(false);
    });
  }, [markdownFiles]);


  return (
    <>
      <MDBModal show={show} tabIndex='-1' setShow={setShow}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setShow(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {isLoading && <MDBContainer className='d-flex justify-content-center'> <MDBSpinner style={{ width: '5rem', height: '5rem' }} text='primary' /> </MDBContainer>}
              {!isLoading &&
               (markdown.length < 2 ?
              <Markdown markdown={markdown[0]} />
              :
                <Tabs titles={titles} contents={markdown.map(mark => <Markdown markdown={mark}/ >)} />
              )
              }
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setShow(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}