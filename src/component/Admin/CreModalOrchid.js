import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { TextField, FormControlLabel, Switch, Rating, Avatar } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function NewModal({ show, handleClose, createOrchid }) {
    const [imageUrl, setImageUrl] = useState();
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required.')
            .min(3, 'Name must be at least 3 characters.')
            .max(30, 'Name must be at most 30 characters.')
            .matches(/^[a-zA-Z0-9 ]*$/, 'Name must not contain special characters.')
            .trim(),
        rating: Yup.number()
            .min(0, 'Rating must be between 0 and 5.')
            .max(5, 'Rating must be between 0 and 5.')
            .required('Rating is required.'),
        isSpecial: Yup.boolean(),
        image: Yup.string()
            .url('Invalid URL.')
            .required('Image URL is required.')
            .trim(),
        color: Yup.string()
            .min(3, 'Color must be at least 3 characters.')
            .max(15, 'Color must be at most 15 characters.')
            .matches(/^[a-zA-Z\s]*$/, 'Color must not contain special characters and numbers.')
            .required('Color is required.')
            .trim(),
        origin: Yup.string()
            .min(3, 'Origin must be at least 3 characters.')
            .max(25, 'Origin must be at most 25 characters.')
            .matches(/^[a-zA-Z\s]*$/, 'Origin must not contain special characters and number.')
            .required('Origin is required.')
            .trim(),
        category: Yup.string()
            .min(3, 'Category must be at least 3 characters.')
            .max(25, 'Category must be at most 25 characters.')
            .matches(/^[a-zA-Z0-9 ]*$/, 'Category must not contain special characters.')
            .required('Category is required.')
            .trim(),
        description: Yup.string()
            .min(100, 'Description must be at least 100 characters.')
            .max(700, 'Description must be at most 700 characters.')
            .required('Description is required.')
            .trim(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            rating: 0,
            isSpecial: false,
            image: '',
            color: '',
            origin: '',
            category: '',
            description: '',
        },
        validationSchema,
        onSubmit: (values) => {
            createOrchid(values);
            handleClose();
            formik.resetForm();
        },
    });

    const handleImageChange = (event) => {
        formik.handleChange(event);
        setImageUrl(event.target.value);
    };


    return (
        <Modal size="lg" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Orchid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <InputGroup className="mb-4">
                                <TextField
                                    color="secondary"
                                    label="Name"
                                    variant="outlined"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    fullWidth
                                />
                            </InputGroup>

                            <InputGroup className="mb-4">
                                <TextField
                                    label="Image URL"
                                    variant="outlined"
                                    name="image"
                                    value={formik.values.image}
                                    onChange={handleImageChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.image && Boolean(formik.errors.image)}
                                    helperText={formik.touched.image && formik.errors.image}
                                    fullWidth
                                />
                            </InputGroup>

                            <InputGroup className="mb-4">
                            Rating: &nbsp;
                                <Rating
                                    name="rating"
                                    value={formik.values.rating}
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('rating', newValue);
                                    }}
                                    onBlur={formik.handleBlur}
                                    sx={{ marginRight: '50px' }} // Adding space between Rating and Switch
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="isSpecial"
                                            checked={formik.values.isSpecial}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            color="primary"
                                        />
                                    }
                                    label="Special"
                                />
                            </InputGroup>
                            
                                <div className="d-flex justify-content-center mt-4 mb-4">
                                <Avatar
                                    alt="Orchid Preview"
                                    src={imageUrl}
                                    sx={{ width: 200, height: 200 }}
                                />
                            </div>
                            
                        </Col>
                        <Col md={6}>
                            

                            <InputGroup className="mb-4">
                                <TextField
                                    label="Color"
                                    variant="outlined"
                                    name="color"
                                    value={formik.values.color}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.color && Boolean(formik.errors.color)}
                                    helperText={formik.touched.color && formik.errors.color}
                                    fullWidth
                                />
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <TextField
                                    label="Origin"
                                    variant="outlined"
                                    name="origin"
                                    value={formik.values.origin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.origin && Boolean(formik.errors.origin)}
                                    helperText={formik.touched.origin && formik.errors.origin}
                                    fullWidth
                                />
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <TextField
                                    label="Category"
                                    variant="outlined"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                    helperText={formik.touched.category && formik.errors.category}
                                    fullWidth
                                />
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


