import React from 'react'
import { useFormik } from 'formik'
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import { initialValues, validationSchema } from './Productos.form'

export function Productos() {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: (formValue) => {
            console.log(formValue);
        }
    })

    return (
        <div className="p-4">
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="13" controlId="validationCustom01">
                        <Form.Label>Nombre del producto</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Producto"
                            name="nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.nombre}
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
                    <Form.Group as={Col} md="3" controlId="validationCustomUsername">
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
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
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
                            name="imagen"
                            onChange={(event) => {
                                formik.setFieldValue("imagen", event.currentTarget.files[0]);
                            }}
                            isInvalid={!!formik.errors.imagen}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.imagen}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Enviar</Button>
            </Form>
        </div>
    )
}

export default Productos