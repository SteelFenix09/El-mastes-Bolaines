const Producto = require('../models/producto.models');
const imagen = require("../utils/img");
const fs = require('fs');
const path = require('path');

async function createProducto(req, res) {
    try {
        const productos = new Producto(req.body);

        // Manejo de la imagen
        if (req.files?.imagep) {
            const filePath = imagen.getFilePath(req.files.imagep); // Obtiene la ruta completa
            const fileName = path.basename(filePath); // Extrae solo el nombre del archivo
            productos.imagep = fileName; // Guarda solo el nombre del archivo
        }

        const datos = await productos.save();
        res.status(201).send({
            msg: "Producto creado correctamente",
            datos,
            imageId: productos.imagep, // Devuelve el nombre del archivo
            imageUrl: `http://localhost:4000/${productos.imagep}`, // Construye la URL completa
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).send({ msg: "Error al guardar los datos", error: error.message });
    }
}

async function getProducto(req, res) {
    try {
        const buscarProducto = await Producto.find();
        res.status(200).send(buscarProducto);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send({ msg: "Error al buscar los datos", error: error.message });
    }
}

async function delProducto(req, res) {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }

        // Eliminar la imagen asociada si existe
        if (producto.imagep) {
            const imagePath = path.join(__dirname, '..', 'uploads', producto.imagep);
            try {
                await fs.promises.unlink(imagePath);
            } catch (err) {
                console.error("Error al eliminar la imagen:", err);
                return res.status(500).send({ msg: "Error al eliminar la imagen" });
            }
        }

        await Producto.findByIdAndDelete(id);
        res.status(200).send({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send({ msg: "No se ha podido eliminar la información", error: error.message });
    }
}

async function updateProducto(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        if (req.files?.imagep) {
            const filePath = imagen.getFilePath(req.files.imagep); 
            const fileName = path.basename(filePath); 
            updateData.imagep = fileName;

            const producto = await Producto.findById(id);
            if (producto?.imagep) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', producto.imagep);
                if (fs.existsSync(oldImagePath)) {
                    await fs.promises.unlink(oldImagePath); 
                }
            }
        }

        // Actualiza el producto en la base de datos
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Devuelve el producto actualizado
        );

        if (!productoActualizado) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }

        res.status(200).send({ msg: "Producto actualizado correctamente", producto: productoActualizado });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send({ msg: "Error al actualizar el producto", error: error.message });
    }
}

module.exports = {
    createProducto,
    getProducto,
    delProducto,
    updateProducto
};