// Importamos el tipo de dato IPersona y la clase BackendClient
import { IArticuloInsumo } from "../types/IArticuloInsumo";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class ArticuloInsumoService extends BackendClient<IArticuloInsumo> {}