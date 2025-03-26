import React, { useState } from 'react';
import { Table, Button, Modal } from "react-bootstrap";
import { EditarProducto } from '../formulario';

export function ListProductos({ productos, onDelete, onEdit }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        onDelete(id);
      } catch (error) {
        console.error("Error al intentar eliminar el producto:", error);
      }
    }
  };

  const handleEditClick = (producto) => {
    setSelectedProduct(producto);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleUpdateProduct = async (id, formData) => {
    try {
      await onEdit(id, formData);
      handleCloseEditModal();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const baseImageUrl = "http://localhost:4000";

  return (
    <>
      <Table striped bordered hover>
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
          {Array.isArray(productos) && productos.length > 0 ? (
            productos.map((producto, index) => (
              <tr key={producto._id || index}>
                <td>{index + 1}</td>
                <td>{producto.nombre || "Sin nombre"}</td>
                <td>${producto.precio || "0.00"}</td>
                <td>{producto.cantidad || "0"}</td>
                <td>{producto.unidad || "N/A"}</td>
                <td>
                  <div style={{ border: "2px solid #007bff", padding: "5px", display: "inline-block", borderRadius: "5px", backgroundColor: "#f9f9f9", width: "60px", height: "60px", textAlign: "center" }}>
                    <img
                      src={producto.imageUrl || `${baseImageUrl}/${producto.imagep}`}
                      alt={`Imagen de ${producto.nombre}`}
                      width="50"
                      height="50"
                      style={{ objectFit: "cover", borderRadius: "3px" }}
                    />
                  </div>
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleEditClick(producto)}>
                    Editar
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(producto._id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto: {selectedProduct?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <EditarProducto 
              producto={selectedProduct} 
              onUpdate={handleUpdateProduct}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}