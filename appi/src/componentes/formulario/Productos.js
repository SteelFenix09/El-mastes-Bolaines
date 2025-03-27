import React, { useState, useEffect } from 'react';
import { ListProductos } from '../ListaProducto';
import { Producto } from '../../api';
import { EditarProducto } from './EditarProducto';

const ctrProducto = new Producto();

export function Productos() {
    const [listaProductos, setListaProductos] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null); // Producto actual para editar o crear

    const obtenerProductos = async () => {
        try {
            const listaPro = await ctrProducto.getProducto();
            setListaProductos(listaPro);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    const handleCreate = async (formData) => {
        try {
            const response = await ctrProducto.createProducto(formData);
            setListaProductos((prev) => [...prev, response.datos]);
            setCurrentProduct(null); // Limpia el producto actual después de crear
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await ctrProducto.updateProducto(currentProduct._id, formData);
            obtenerProductos(); // Actualiza la lista de productos
            setCurrentProduct(null); // Limpia el producto actual después de editar
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <div className="p-4">
            {/* Siempre muestra el formulario para crear o editar */}
            <EditarProducto
                producto={currentProduct}
                onSubmit={currentProduct ? handleUpdate : handleCreate}
                onCancel={() => setCurrentProduct(null)} // Limpia el producto actual al cancelar
                isEditing={!!currentProduct} // Determina si está en modo edición
            />

            {/* Lista de productos */}
            <ListProductos
                productos={listaProductos}
                onDelete={async (id) => {
                    try {
                        await ctrProducto.deleteProducto(id);
                        setListaProductos((prev) => prev.filter((p) => p._id !== id));
                    } catch (error) {
                        console.error("Error al eliminar:", error);
                    }
                }}
                onEdit={setCurrentProduct} // Establece el producto actual para editar
            />
        </div>
    );
}