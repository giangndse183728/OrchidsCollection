import React from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { Formik, Form as FormikForm, Field } from 'formik';
import { CSSTransition } from 'react-transition-group';
import * as Yup from 'yup';
import axios from 'axios';

function Contact() {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required.')
      .min(3, 'Name must be at least 3 characters.')
      .max(30, 'Name must be at most 30 characters.')
      .matches(/^[a-zA-Z\s]*$/, 'Name must not contain special characters.')
      .trim(),
    email: Yup.string()
      .email('Invalid email.')
      .required('Email is required.')
      .trim(),
    message: Yup.string()
      .required('Message is required.')
      .trim(),
  });

  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Send form data to server using Axios
      const response = await axios.post('https://667152aae083e62ee43b0d81.mockapi.io/api/message', values);
      console.log('Form submission successful:', response.data);
      toast.success('Send successful !', {
        position: "bottom-right",
        theme: "colored",
      });

      // Reset form after successful submission
      resetForm();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <CSSTransition
    in={true}
    appear={true}
    timeout={500}
    classNames="page"
  >
    <Container>
      <Row className='mt-5 mb-4'>
        <Col md={6}>
          <div style={{ marginBottom: '20px' }}>
            <h4>Contact Us</h4>
            <hr style={{ backgroundColor: 'rgb(126, 34, 206)', height: '2px', border: 'none' }} />
            <p>If you have any questions, please feel free to reach out to us using the form below.</p>
            <p><strong>📧 Email:</strong> info@orchids.com</p>
            <p><strong>☎️ Phone:</strong> +1 234 567 890</p>
            <p><strong>📍 Address:</strong> 123 Orchid Lane, Flower City, FL 12345</p>
          </div>
        </Col>
        <Col md={6}>
          <div style={{ marginBottom: '20px' }}>
            <h4>Send Us a Message</h4>
            <hr style={{ backgroundColor: 'rgb(126, 34, 206)', height: '2px', border: 'none' }} />
            {/* Formik form wrapper */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, touched, errors }) => (
                <FormikForm noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mt-4">
                    <Field
                      as={TextField}
                      label="Your name"
                      id="name"
                      name="name"
                      type="text"
                      fullWidth
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mt-4">
                    <Field
                      as={TextField}
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      fullWidth
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Form.Group>
                  <Form.Group controlId="formMessage" className="mt-4">
                    <Field
                      as={TextField}
                      label="Message"
                      id="message"
                      name="message"
                      multiline
                      rows={4}
                      fullWidth
                      error={touched.message && !!errors.message}
                      helperText={touched.message && errors.message}
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit" className="mt-3" style={{ backgroundColor: 'rgb(126, 34, 206)', width: '100%' }}>
                    Send Message
                  </Button>
                </FormikForm>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
    </CSSTransition>
  );
}

export default Contact;
