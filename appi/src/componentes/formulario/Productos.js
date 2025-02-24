import React, { useState } from 'react'
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap'

export function Productos() {
    const Datos = {
        nombre: "",
        apellidos: "",
        curp: ""
    }
    const [valores, setValores] = useState(Datos)
    const [validated, setValidated] = useState(false)

    const onChange = (e) => {
        const { name, value } = e.target
        setValores({ ...valores, [name]: value })
    }

    const enviarDatos = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            console.log(valores)
        }
        setValidated(true)
    }

    return (
        <Form noValidate validated={validated} onSubmit={enviarDatos}>
            <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        value={valores.nombre}
                        onChange={onChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Precio"
                        name="apellidos"
                        value={valores.apellidos}
                        onChange={onChange}
                    />
                    <Form.Control.Feedback>Cantidad</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Cantidad</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="Cantidad"
                            aria-describedby="inputGroupPrepend"
                            name="curp"
                            value={valores.curp}
                            onChange={onChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" placeholder="" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                />
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    )
}

export default Productos