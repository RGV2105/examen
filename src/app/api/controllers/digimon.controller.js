import mongoose from "mongoose";
import Digimon from "../models/digimon.models.js";

export const getAllDigimon = async (req, res) => {
    console.log('Mostrar todos los Digimon');
    try {
        const digimons = await Digimon.find({}, { __v: 0 });
        if (digimons.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron Digimon'
            });
        }

        return res.status(200).json({
            digimons
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al mostrar los Digimon'
        });
    }
};

export const getIDDigimon = async (req, res) => {
    console.log('Mostrar el Digimon por ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const digimon = await Digimon.findById(id);
        if (!digimon) {
            return res.status(404).json({
                msg: 'Digimon no encontrado'
            });
        }

        return res.status(200).json({
            digimon
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener el Digimon'
        });
    }
};

export const postDigimon = async (req, res) => {
    console.log('Agregando Digimon');
    const body = req.body;
    const digimon = new Digimon(body);

    try {
        const validacion = digimon.validateSync();
        if (validacion) {
            const mensajesError = Object.values(validacion.errors).map(err => err.message);
            return res.status(404).json({
                mensajesError
            });
        }
        await digimon.save();
        return res.status(200).json({
            digimon
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al agregar el Digimon'
        });
    }
};

export const putDigimon = async (req, res) => {
    console.log('Actualizando Digimon');
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const digimon = await Digimon.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!digimon) {
            return res.status(404).json({
                msg: 'Digimon no encontrado'
            });
        }

        return res.status(200).json({
            msg: 'Digimon actualizado',
            digimon
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar el Digimon'
        });
    }
};

export const deleteDigimon = async (req, res) => {
    console.log('Eliminando Digimon');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const digimon = await Digimon.findByIdAndDelete(id);

        if (!digimon) {
            return res.status(404).json({
                msg: 'Digimon no encontrado'
            });
        }

        return res.status(200).json({
            msg: 'Digimon eliminado'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar el Digimon'
        });
    }
};
