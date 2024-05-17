export interface IArticuloInsumo {
    id: number,
    eliminado: boolean,
    denominacion: string,
    precioVenta: number,
    imagenes: ImagenArticulo
    unidadMedida: UnidadMedida,
    precioCompra: number,
    stockActual: number,
    stockMaximo: number,
    esParaElaborar: boolean
}

interface ImagenArticulo{
    id: number,
    eliminado: boolean,
    url: string
}

interface UnidadMedida{
    id: number,
    eliminado: boolean,
    denominacion: string
}