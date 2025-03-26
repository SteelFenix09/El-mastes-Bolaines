import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { initialValues, validationSchema } from './Productos.form';
import { EditarProducto } from './EditarProducto';
import { ListProductos } from '../ListaProducto';
import { Producto } from '../../api';

const ctrProducto = new Producto();

export function Productos() {
    const [listaProductos, setListaProductos] = React.useState([]);
    const [productoSelec, setProductoSelec] = React.useState(null); // Estado para el producto seleccionado

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formValue, { resetForm }) => {
            try {
                const response = await ctrProducto.createProducto(formValue);
                const newProducto = response.datos; // Producto creado
                setListaProductos((prevProductos) => [...prevProductos, newProducto]);
                resetForm(); // Limpia el formulario después de un envío exitoso
            } catch (error) {
                console.error("Error al agregar el producto:", error);
            }
        },
    });

    const obtenerProductos = async () => {
        try {
            const listaPro = await ctrProducto.getProducto();
            setListaProductos(listaPro);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    const handleEdit = (producto) => {
        setProductoSelec(producto); // Establece el producto seleccionado
    };

    const handleUpdate = async (id, updateData) => {
        try {
            await ctrProducto.updateProducto(id, updateData); // Llama a la API para actualizar el producto
            obtenerProductos(); // Actualiza la lista de productos
            setProductoSelec(null); // Cierra el formulario de edición
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    useEffect(() => {
        obtenerProductos(); // Carga los productos al montar el componente
    }, []);

    return (
        <div className="p-4">
            {productoSelec ? (
                // Renderiza el formulario de edición si hay un producto seleccionado
                <EditarProducto
                    producto={productoSelec}
                    onUpdate={handleUpdate}
                />
            ) : (
                <>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
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
                        <Button type="submit">Enviar</Button>
                    </Form>

                    <div className="mt-4">
                        <h4>Lista de Productos</h4>
                        <ListProductos
                            productos={listaProductos}
                            onDelete={async (id) => {
                                try {
                                    await ctrProducto.deleteProducto(id); // Llama a la API para eliminar el producto
                                    setListaProductos((prevProductos) =>
                                        prevProductos.filter((producto) => producto._id !== id)
                                    );
                                } catch (error) {
                                    console.error("Error al eliminar el producto:", error);
                                }
                            }}
                            onEdit={handleEdit} // Pasa la función de edición
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default Productos;