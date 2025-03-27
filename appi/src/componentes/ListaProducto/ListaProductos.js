import React, { useState } from 'react';
import { Table, Button, Modal } from "react-bootstrap";
import { EditarProducto } from '../formulario';

export function ListProductos({ productos, onDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false)
  const [selecProdc, setselecProdc] = useState(null)


  const handleEdit = (producto) => {
    setselecProdc(producto);
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false);
    setselecProdc(null)
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Imagen</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={producto._id}>
              <td>{index + 1}</td>
              <td>{producto.nombre || "Sin nombre"}</td>
              <td>${producto.precio || "0.00"}</td>
              <td>{producto.cantidad || "0"}</td>
              <td>{producto.unidad || "N/A"}</td>
              <td>
                <div
                  style={{
                    border: "2px solid #007bff",
                    padding: "5px",
                    display: "inline-block",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                    width: "60px",
                    height: "60px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={producto.imageUrl || `http://localhost:4000/${producto.imagep}`}
                    alt={`Imagen de ${producto.nombre}`}
                    width="50"
                    height="50"
                    style={{
                      objectFit: "cover",
                      borderRadius: "3px",
                    }}
                  />
                </div>
              </td>
              <td>
                <Button variant="success" size="sm" onClick={() => handleEdit(producto)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => onDelete(producto._id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selecProdc && (
            <EditarProducto
              producto={selecProdc}
              onSubmit={(updatedData) => {
                onEdit(updatedData); // Llama a la función de edición pasada desde el componente padre
                handleClose(); // Cierra el modal después de actualizar
              }}
              onCancel={handleClose} // Cierra el modal si se cancela
              isEditing={true} // Indica que está en modo edición
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}