import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

function MyModal(props) {
  const { orchid, ...modalProps } = props;

  return (
    <Modal
    
      {...modalProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {orchid ? (<p> {orchid.name} </p>) : (<p>No player details available.</p>)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {orchid ? (
          <>
            <Container>
              
                
                  <img src={orchid.image} alt={orchid.name} style={{ width: '100%', boxShadow: '1px 1px 20px rgb(126, 34, 206)' }} />
               
                
            </Container>
          </>

        ) : (
          <p>No orchid details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
