// Importamos el tipo de dato IPersona y la clase BackendClient
import { IArticuloManufacturado } from "../types/IArticuloManufacturado";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class ArticuloManufacturadoService extends BackendClient<IArticuloManufacturado> {}