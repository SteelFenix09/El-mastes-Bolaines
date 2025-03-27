import React from 'react';
import { useFormik } from 'formik';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { initialValues, validationSchema } from './Productos.form';

export function EditarProducto({ producto, onSubmit, onCancel, isEditing }) {
    const formik = useFormik({
        initialValues: producto || initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await onSubmit(values);
            } finally {
                setSubmitting(false);
            }
        },
        enableReinitialize: true,
    });

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.nombre}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Precio"
                        name="precio"
                        value={formik.values.precio}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.precio}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.precio}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Cantidad</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Cantidad"
                            name="cantidad"
                            value={formik.values.cantidad}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.cantidad}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.cantidad}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Unidad</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Unidad"
                        name="unidad"
                        value={formik.values.unidad}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.unidad}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.unidad}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        name="imagep"
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (file) {
                                formik.setFieldValue("imagep", file);
                            }
                        }}
                        isInvalid={!!formik.errors.imagep}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.imagep}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={formik.isSubmitting}>
                    {isEditing ? 'Actualizar' : 'Crear'}
                </Button>
            </div>
        </Form>
    );
}