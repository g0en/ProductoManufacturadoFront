interface Pais {
    id: number;
    nombre: string;
}

export interface IData {
    id: number;
    nombre: string;
    pais: Pais;
  }