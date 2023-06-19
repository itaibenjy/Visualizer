import { useState } from 'react';
import { MDBBtn, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import InfoModal from './InfoModal';

export default function HelpButton({ markdownFiles, title, titles }) {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderModal = () => {
    if (showModal) {
      return (
        <InfoModal
          title={title}
          titles={titles}
          markdownFiles={markdownFiles}
          show={showModal}
          setShow={setShowModal}
          closeModal={closeModal}
        />
      );
    }
  };

  return (
    <>
      {renderModal()}
      <div style={{ position: 'fixed', top: '110px', right: '10px' }}>
        <MDBTooltip title="How To Use" tag="span" placement="left">
          <MDBBtn
            floating
            color="warning"
            className="mx-1"
            onClick={handleButtonClick}
          >
            <MDBIcon fas size="lg" icon="question-circle" />
          </MDBBtn>
        </MDBTooltip>
      </div>
    </>
  );
}
