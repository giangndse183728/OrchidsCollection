import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faGoogle, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import './FooterStyle.css';

export default function Foot() {
  return (
    <div className="sticky-bottom">
    <MDBFooter className=' footer text-center '>
      <MDBContainer className=' p-4 pb-0'>
        <section className='mb-3'>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#3b5998' }}
            href='#!'
            role='button'
          >
            <FontAwesomeIcon icon={faFacebookF} style={{width:15, height:40}} />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#55acee' }}
            href='#!'
            role='button'
          >
            <FontAwesomeIcon icon={faTwitter} style={{width:18, height:40}}/>
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#dd4b39' }}
            href='#!'
            role='button'
          >
            <FontAwesomeIcon icon={faGoogle} style={{width:18, height:40}} />
          </MDBBtn>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='#!'
            role='button'
          >
            <FontAwesomeIcon icon={faInstagram} style={{width:20, height:40}}/>
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='#!'
            role='button'
          >
            <FontAwesomeIcon icon={faGithub} style={{width:20, height:40}}/>
          </MDBBtn>
        </section>
      </MDBContainer>


<div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} >
        © 2024 Copyright: Orchid.com
      </div>
    


    </MDBFooter>
    </div>
  );
  
}