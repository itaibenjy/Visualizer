import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
import Markdown from './Markdown';
import Tabs from './Tabs';

export default function InfoModal({show, setShow, markdownFiles, title, titles}) {

  // read the markdown files from the markdownFiles array to markdown array
  async function getMarkdown() {
    let markdown = [];
    for (let i = 0; i < markdownFiles.length; i++) {
      const response = await fetch(markdownFiles[i]);
      const text = await response.text();
      markdown.push(text);
    }
    return markdown;
  }

  const [markdown, setMarkdown] = useState([]);

  useEffect(() => {
    getMarkdown().then((markdown) => setMarkdown(markdown));
  }, []);


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
              {markdown.length < 2 ?
              <Markdown markdown={markdown[0]} />
              :
                <Tabs titles={titles} contents={markdown.map(mark => <Markdown markdown={mark}/ >)} />
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