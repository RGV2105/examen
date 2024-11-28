import ejemplo from "./ejemplo.routes.js";
import digimons from "./digimon.routes.js";
import { Router } from "express";

    const indexRoutes = Router()

    indexRoutes.use('/ejemplo', ejemplo)

    indexRoutes.use('/digimons', digimons)

    export default indexRoutes
