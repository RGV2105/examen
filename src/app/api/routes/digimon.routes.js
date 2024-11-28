import { Router } from "express";
import { getAllDigimon, getIDDigimon, putDigimon, postDigimon, deleteDigimon } from "../controllers/digimon.controller.js";

const digimonR = Router();

digimonR.get('/', getAllDigimon); // Obtener todos los Digimon
digimonR.get('/:id', getIDDigimon); // Obtener un Digimon por ID
digimonR.post('/', postDigimon); // Crear un nuevo Digimon
digimonR.put('/:id', putDigimon); // Actualizar un Digimon por ID
digimonR.delete('/:id', deleteDigimon); // Eliminar un Digimon por ID

export default digimonR;
