import mongoose from "mongoose";

// Definición del esquema para Digimon
const DigimonSchema = new mongoose.Schema({
    nombre: {
        type: String, // El nombre del Digimon
        required: true // Obligatorio
    },
    nivel: {
        type: String, // Nivel del Digimon (Ej: Rookie, Champion, Ultimate, etc.)
        required: true // Obligatorio
    },
    tipo: {
        type: String, // Tipo del Digimon (Ej: Dragon, Beast, etc.)
        required: true // Obligatorio
    },
    atributo: {
        type: String, // Atributo del Digimon (Ej: Data, Vaccine, Virus)
        required: true // Obligatorio
    },
    ataquesEspeciales: {
        type: [String], // Lista de ataques especiales del Digimon
        required: true // Obligatorio
    },
    descripcion: {
        type: String, // Descripción o historia del Digimon
        required: true // Obligatorio
    }
}); 

// Creación del modelo con el esquema definido
const Digimon = mongoose.model('Digimon', DigimonSchema);

export default Digimon;
