// Importamos el tipo de dato IPersona y la clase BackendClient
import { IArticuloManufacturadoDetalles } from "../types/IArticuloManufacturadoDetalles";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class ArticuloManufacturadoDetalleService extends BackendClient<IArticuloManufacturadoDetalles> {}