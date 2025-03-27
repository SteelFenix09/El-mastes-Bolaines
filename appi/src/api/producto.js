import { ENV } from "../utils/Constants";
import Axios from "axios";

export class Producto {
    baseApi = ENV.BASE_API;

    // Crear un nuevo producto
    async createProducto(data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]); // Incluye todos los campos, incluyendo "imagep"
            });

            const response = await Axios.post(
                `${this.baseApi}${ENV.API_ROUTES.CREATEPRODUCTO}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            //console.log("Producto creado correctamente:", response.data);
            return response.data; // Devuelve los datos del producto creado
        } catch (error) {
            console.error("Error al crear el producto:", error.message);
            throw new Error("No se pudo crear el producto. Intenta nuevamente.");
        }
    }

    // Obtener todos los productos
    async getProducto() {
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.GETPRODUCTOS}`;
            const response = await Axios.get(url);
            //console.log("Productos obtenidos correctamente:", response.data);
            return response.data; // Devuelve la lista de productos
        } catch (error) {
            console.error("Error al obtener los productos:", error.message);
            throw new Error("No se pudieron obtener los productos. Intenta nuevamente.");
        }
    }

    // Eliminar un producto por ID
    async deleteProducto(id) {
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.DELETEPRODUCTO}/${id}`;
            await Axios.delete(url);
            //console.log(`Producto con ID ${id} eliminado correctamente.`);
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${id}:`, error.message);
            throw new Error("No se pudo eliminar el producto. Intenta nuevamente.");
        }
    }

    // Actualizar un producto por ID
    async updateProducto(id, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]); // Incluye todos los campos, incluyendo "imagep"
            });
            const response = await Axios.patch(
                `${this.baseApi}${ENV.API_ROUTES.UPDATEPRODUCTO}/${id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            //console.log(`Producto con ID ${id} actualizado correctamente:`, response.data);
            return response.data; // Devuelve los datos del producto actualizado
        } catch (error) {
            console.error(`Error al actualizar el producto con ID ${id}:`, error.message);
            throw new Error("No se pudo actualizar el producto. Intenta nuevamente.");
        }
    }
}
