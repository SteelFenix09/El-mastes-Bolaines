import { ENV } from "../utils/Constants";
import Axios from "axios";

export class Producto {
    baseApi = ENV.BASE_API;

    async createProducto(data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]); // Incluye "imagep" automáticamente
            });

            const response = await Axios.post(
                `${this.baseApi}${ENV.API_ROUTES.CREATEPRODUCTO}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            console.log("Producto agregado correctamente");
            return response.data; // Devuelve los datos del producto creado
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            throw error; // Lanza el error para manejarlo en el frontend
        }
    }

    async getProducto() {
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.GETPRODUCTOS}`;
            const response = await Axios.get(url);
            return response.data; // Asegúrate de que los datos incluyan la URL de la imagen
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            return [];
        }
    }

    async deleteProducto(id) {
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.DELETEPRODUCTO}/${id}`;
            await Axios.delete(url);
            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw error; // Lanza el error para manejarlo en el frontend
        }
    }
}
