// Importamos el tipo de dato IPersona y la clase BackendClient
import { IArticulo } from "../types/IArticulo";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class ArticuloService extends BackendClient<IArticulo> {}