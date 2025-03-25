import { ENV } from "../utils/Constants";
import Axios from "axios";

export class Producto {
    baseApi = ENV.BASE_API;

    async createProducto(data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            await Axios.post(`${this.baseApi}${ENV.API_ROUTES.CREATEPRODUCTO}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Producto agregado correctamente");
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    }

    async getProducto() {
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.GETPRODUCTOS}`;
            const response = await Axios.get(url);
            return response.data;
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
        }
    }
}
