import React from 'react';
import { Table, Button } from "react-bootstrap";

export function ListProductos({ productos, onDelete }) {
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        onDelete(id); // Llama a la función pasada desde el componente padre
      } catch (error) {
        console.error("Error al intentar eliminar el producto:", error);
      }
    }
  };

  return (
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
          productos.map((producto, index) => {
            // Validar que el producto sea un objeto válido
            if (!producto || typeof producto !== "object") {
              return null; // Ignorar elementos inválidos
            }

            return (
              <tr key={producto._id || index}>
                <td>{index + 1}</td>
                <td>{producto.nombre || "Sin nombre"}</td>
                <td>${producto.precio || "0.00"}</td>
                <td>{producto.cantidad || "0"}</td>
                <td>{producto.unidad || "N/A"}</td>
                <td>
                  <div
                    style={{
                      border: "1px solid #ddd",
                      padding: "5px",
                      display: "inline-block",
                      borderRadius: "5px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <img
                     // src={producto.imagen || "https://via.placeholder.com/50"}
                      alt="Imagen del producto"
                      width="50"
                      height="50"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </td>
                <td>
                  <Button variant="success">Editar</Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(producto._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No hay productos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}