import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import { Container, Row, Col } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './HomeStyle.css';

export default function Home() {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="page"
    >
      <div>
        <div className="image-container">
          <img src='/images/orchid.jpg' className="img-fluid animated-image" alt="..." />
          <div className="overlay-texttitle">
            <div className='title mb-2'>
              Orchids Home <br />
            </div>

            <div className='text mb-2'>
              “And, unlike the orchids, she wasn’t even a pretty one.” <br />
              — Scott Westerfeld  —
            </div>

            <Link to={"/Collection"}>
              <MDBBtn outline className='mx-2 mt-4' color='dark'>
                Collections
              </MDBBtn>
            </Link>

            <Link to={"/Contact"}>
              <MDBBtn outline className='mx-3' color='dark'>
                Contact
              </MDBBtn>
            </Link>
          </div>
        </div>

        <Container className="mt-5">
          <Row className='mb-5'>
            <Col>
              <h4>About Us</h4>
              <hr style={{ backgroundColor: 'rgb(126, 34, 206)', height: '2px', border: 'none' }} />
              <p>
                Welcome to Orchids Home, where we celebrate the beauty and diversity of one of nature's most fascinating flowers. 
                Our mission is to provide orchid enthusiasts with a comprehensive resource for learning about and enjoying orchids.
              </p>
              <p>
                At Orchids Home, we offer a wide range of orchid species, from the most common to the rarest, each with its own unique 
                characteristics and charm. Whether you are a seasoned orchid grower or just starting out, our collection and resources 
                will help you grow and appreciate these beautiful plants.
              </p>
              <p>
                We believe that orchids are more than just plants; they are a source of inspiration and joy. Join us in exploring the 
                enchanting world of orchids and discover the perfect addition to your home or garden.
              </p>
            </Col>
          </Row>
        </Container>

        <MDBFooter className='videobg text-center text-white' style={{ backgroundImage: 'linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13))' }}>
          <MDBContainer className='p-4 mb-4'>
            <section className=''>
              <MDBRow className='d-flex justify-content-center'>
                <MDBCol lg='6'>
                  <div className='ratio ratio-16x9'>
                    <iframe width="914" height="514" src="https://www.youtube.com/embed/mHDoyH0tRYc" title="Orchid Care for Beginners - What to do after Phalaenopsis blooms fall? Cutting spike &amp; aftercare"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
                  </div>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBContainer>
        </MDBFooter>
      </div>
    </CSSTransition>
  );
}
