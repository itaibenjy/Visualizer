import { useState } from 'react';
import { MDBBtn, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import InfoModal from './InfoModal';

export default function InfoButton({ markdownFiles, title, titles }) {
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
      <div style={{ position: 'fixed', top: '70px', right: '10px' }}>
        <MDBTooltip title="Information" tag="span" placement="left">
          <MDBBtn
            floating
            color="info"
            className="mx-1"
            onClick={handleButtonClick}
          >
            <MDBIcon fas size="lg" icon="info-circle" />
          </MDBBtn>
        </MDBTooltip>
      </div>
    </>
  );
}
