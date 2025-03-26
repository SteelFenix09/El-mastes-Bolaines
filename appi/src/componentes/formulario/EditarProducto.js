import React from 'react';
import { useFormik } from 'formik';
import { Form, Row, Col, Button } from 'react-bootstrap';

export function EditarProducto({ producto, onUpdate }) {
    const formik = useFormik({
        initialValues: {
            nombre: producto.nombre || '',
            precio: producto.precio || '',
            cantidad: producto.cantidad || '',
            unidad: producto.unidad || '',
            imagep: null, 
        },
        onSubmit: async (formValue) => {
            try {
                const formData = new FormData();
                formData.append('nombre', formValue.nombre);
                formData.append('precio', formValue.precio);
                formData.append('cantidad', formValue.cantidad);
                formData.append('unidad', formValue.unidad);
                if(formValue.imagep){
                    formData.append('imagep',formValue.imagep)
                }
                await onUpdate(producto._id, formData); // Llama a la función de actualización
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
            }
        },
    });

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        name="precio"
                        value={formik.values.precio}
                        onChange={formik.handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                        type="number"
                        name="cantidad"
                        value={formik.values.cantidad}
                        onChange={formik.handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Unidad</Form.Label>
                    <Form.Control
                        type="text"
                        name="unidad"
                        value={formik.values.unidad}
                        onChange={formik.handleChange}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Imagen del producto</Form.Label>
                    <Form.Control
                        type="file"
                        name="imagep"
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if(file){
                                formik.setFieldValue("imagep",file)
                            }
                        }}
                    />
                    <small className='text-muted'>
                        {producto.imagep && "Imagen actual: " + producto.imagep}
                    </small>
                </Form.Group>
            </Row>
            <Button type="submit">Actualizar</Button>
        </Form>
    );
}