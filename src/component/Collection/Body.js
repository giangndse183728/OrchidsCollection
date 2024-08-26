import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Form  } from 'react-bootstrap';
import { fetchAllOrchid } from '../../services/ListOrchid';
import { Link } from 'react-router-dom';
import MyModal from '../Modal/Modal';
import { Rating} from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import './BodyStyle.css';

function Body() {
  const [orchids, setOrchids] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  useEffect(() => {
    const fetchAllOrchids = async () => {
      try {
        const response = await fetchAllOrchid();
        setOrchids(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllOrchids();
  }, []);

  const handleShowDetails = (orchid) => {
    setSelectedOrchid(orchid);
    setModalShow(true);
  };

  return (
    <CSSTransition in={true} appear={true} timeout={300} classNames="page">
      <Container>
      <Carousel>
      <Carousel.Item>
        <img
          src="https://static.vecteezy.com/system/resources/previews/027/099/580/non_2x/the-phalaenopsis-orchid-also-known-as-the-beautiful-pink-orchid-is-found-in-gardens-free-photo.jpg"
          className="carousel-image img-fluid mt-5 mb-5"
          alt="First slide"
        />
        <Carousel.Caption className="mb-4">
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://png.pngtree.com/thumb_back/fw800/background/20231225/pngtree-pair-of-blush-orchids-amidst-verdant-foliage-on-textured-gray-stone-image_13855315.png"
          className="carousel-image img-fluid mt-5 mb-5"
          alt="Second slide"
        />
        <Carousel.Caption className="mb-4">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://mrwallpaper.com/images/hd/stunning-baby-pink-orchids-blooming-nohr0yu9macbhtbt.jpg"
          className="carousel-image img-fluid mt-5 mb-5"
          alt="Third slide"
        />
        <Carousel.Caption className="mb-4">
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>



        <div className="titlee mt-5"> —- Collection -— </div>
        <Row xl={3} lg={2} md={1} sm={1} xs={1} className="gy-5 mt-3">
  {orchids.map((orchid, i) => (
    <Col key={orchid.id}>
      <Card style={{ width: '22rem', margin: 'auto' }} className="card text-center">
        <div className="image-wrapper mb-3">
          <div className="rating-indicator"><Rating value={orchid.rating} precision={0.5} readOnly /></div>
          <div className="bg-image hover-zoom">
            <Card.Img variant="top" src={orchid.image} onClick={() => handleShowDetails(orchid)} />
          </div>
        </div>
        <Card.Body>
          <Card.Title>{orchid.name}</Card.Title>
          {/* Conditionally render based on isSpecial value */}
          {orchid.isSpecial && (
             <div class="ribbon ribbon-top-right"><span>Special</span></div>
          )}
                <Form.Text muted>
                🌎 Origin: {orchid.origin}
      </Form.Text>
          <Link to={`Detail/${orchid.id}`}>
            <Button variant="dark" style={{ width: '100%', marginTop: '20px'}}>
              Details
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>


        <MyModal show={modalShow} onHide={() => setModalShow(false)} orchid={selectedOrchid} />
      </Container>
    </CSSTransition>
  );
}

export default Body;
