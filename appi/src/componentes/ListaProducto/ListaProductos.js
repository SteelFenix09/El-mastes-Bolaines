import React from 'react';
import { Table, Button } from "react-bootstrap";

export function ListProductos({ productos, onDelete,onEdit }) {
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        onDelete(id); // Llama a la función pasada desde el componente padre
      } catch (error) {
        console.error("Error al intentar eliminar el producto:", error);
      }
    }
  };

  // Base URL para las imágenes (ajusta según tu configuración)
  const baseImageUrl = "http://localhost:4000";

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
                      border: "2px solid #007bff", // Recuadro azul alrededor de la imagen
                      padding: "5px",
                      display: "inline-block",
                      borderRadius: "5px",
                      backgroundColor: "#f9f9f9",
                      width: "60px", // Ajusta el ancho del contenedor
                      height: "60px", // Ajusta la altura del contenedor
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={producto.imageUrl || `${baseImageUrl}/${producto.imagep}`} // Construye la URL de la imagen
                      alt={`Imagen de ${producto.nombre}`}
                      width="50"
                      height="50"
                      style={{
                        objectFit: "cover",
                        borderRadius: "3px", // Bordes redondeados para la imagen
                      }}
                    />
                  </div>
                </td>
                <td>
                  <Button variant="success"
                  onClick={()=> onEdit(producto)}
                  >Editar</Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(producto._id)} // Llama a la función handleDelete con el ID del producto
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