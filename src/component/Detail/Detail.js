import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Row, Col, Form, Placeholder } from 'react-bootstrap';
import { fetchOrchidById } from '../../services/ListOrchid';
import './DetailStyle.css';

export default function Detail() {
  const [orchid, setOrchid] = useState(null);
  const [orchidNotFound, setOrchidNotFound] = useState(false); // State to track if the orchid is not found
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        const response = await fetchOrchidById(id);
        if (response.data) {
          setOrchid(response.data);
        } else {
          setOrchidNotFound(true); // Set orchidNotFound to true if no data is returned
        }
      } catch (error) {
        console.log(error);
        setOrchidNotFound(true); // Set orchidNotFound to true if an error occurs
      }
    };

    fetchOrchid();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (orchidNotFound) {
      navigate('/error'); // Redirect to an error page if the orchid is not found
    }
  }, [orchidNotFound, navigate]);

  if (!orchid && !orchidNotFound) {
    return (
      <Container>
        <Row className='mt-5 mb-4'>
          <Col md={5}>
            <Placeholder style={{ width: '100%', height: '100%' }} />
          </Col>
          <Col md={3}>
            <Row>
              <div style={{ marginBottom: '20px' }}>
                <h4>Details</h4>
                <hr
                  style={{
                    backgroundColor: 'rgb(126, 34, 206)',
                    height: '2px',
                    border: 'none',
                  }}
                />
                <p><strong>🌺 Name:</strong> <Placeholder style={{ width: '100%' }} /></p>
                <p><strong>⭐ Rating:</strong> <Placeholder style={{ width: '100%' }} /></p>
                <p><strong>🌈 Color:</strong>
                  <Placeholder style={{ width: '100%' }} />
                </p>
                <p><strong>🌎 Origin:</strong> <Placeholder style={{ width: '100%' }} /></p>
                <p><strong>📚 Category:</strong> <Placeholder style={{ width: '100%' }} /></p>
                <Form>
                  <Form.Group controlId="formSpecialSwitch" className="d-flex align-items-center">
                    <Form.Label><strong>Special: &nbsp; </strong></Form.Label>
                    <Placeholder style={{ width: '100%' }} />
                  </Form.Group>
                </Form>
              </div>
            </Row>
          </Col>
          <Col md={4}>
            <div style={{ marginBottom: '20px' }}>
              <h4>🔥 Description</h4>
              <hr
                style={{
                  backgroundColor: 'rgb(126, 34, 206)',
                  height: '2px',
                  border: 'none',
                }}
              />
              <p><Placeholder style={{ width: '100%', height: '200%' }} /></p>
            </div>
            <div className="title mt-5 ms-5"> <Placeholder style={{ width: '100%' }} /> </div>
          </Col>
        </Row>
      </Container>
    )
  }

  if (orchidNotFound) {
    return (
      <Container>
        <Row className='mt-5 mb-4'>
          <Col>
            <h2>Orchid Not Found</h2>
            <p>The orchid you are looking for does not exist or has been deleted.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className='mt-5 mb-4'>
        <Col md={5}>
          <img
            src={orchid.image}
            alt={orchid.name}
            style={{
              width: '100%',
              boxShadow: '1px 1px 20px rgb(126, 34, 206)',
              borderRadius: '8px',
            }}
          />
        </Col>
        <Col md={3}>
          <Row>
            <div style={{ marginBottom: '20px' }}>
              <h4>Details</h4>
              <hr
                style={{
                  backgroundColor: 'rgb(126, 34, 206)',
                  height: '2px',
                  border: 'none',
                }}
              />
              <p><strong>🌺 Name:</strong> {orchid.name}</p>
              <p><strong>⭐ Rating:</strong> {orchid.rating}</p>
              <p><strong>🌈 Color:</strong>
                <span
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: orchid.color,
                    borderRadius: '40%',
                    marginLeft: '10px',
                    verticalAlign: 'middle',
                  }}
                ></span> {orchid.color}
              </p>
              <p><strong>🌎 Origin:</strong> {orchid.origin}</p>
              <p><strong>📚 Category:</strong> {orchid.category}</p>
              <Form>
                <Form.Group controlId="formSpecialSwitch" className="d-flex align-items-center">
                  <Form.Label><strong>Special: &nbsp; </strong></Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={orchid.isSpecial ? 'Yes' : 'No'}
                    checked={orchid.isSpecial}
                    readOnly
                  />
                </Form.Group>
              </Form>
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <div style={{ marginBottom: '20px' }}>
            <h4>🔥 Description</h4>
            <hr
              style={{
                backgroundColor: 'rgb(126, 34, 206)',
                height: '2px',
                border: 'none',
              }}
            />
            <p>{orchid.description}</p>
          </div>
          <div className="title mt-5 ms-5"> —- {orchid.name} -— </div>
        </Col>
      </Row>
    </Container>
  );
}
