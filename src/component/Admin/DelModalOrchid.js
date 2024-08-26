import React from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import { Avatar, Rating } from '@mui/material';

export default function DelModal({ show, handleClose, name, img, color, origin, category, rating, onDelete}) {


  return (
    <Modal size="md" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title> <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: 'red' }} /> &nbsp;Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      <Row>
        <h5 className='mb-4'> Are you sure want to delete <strong> {name} </strong> </h5>

      <Col md={6} >
      
        <div className="d-flex justify-content-center mt-4 mb-4">
                                <Avatar
                                    alt="Orchid Preview"
                                    src={img}
                                    sx={{ width: 150, height: 150, boxShadow: '1px 1px 20px rgb(197, 4, 4)' }}
                                />
                            </div>
                            </Col>

                            <Col md={6} className="mt-4 mb-4" >
                            <p> <strong>Color: </strong> &nbsp; {color} </p>
                            <p> <strong>Origin: </strong> &nbsp;{origin} </p>
                            <p> <strong>Category: </strong> &nbsp;{category} </p>
                            <Rating value={rating} precision={0.5} readOnly />
                            </Col>

          </Row>

          
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => {handleClose(); onDelete();}} >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>





  );

  
}

