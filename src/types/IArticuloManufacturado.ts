export interface IArticuloManufacturado{
    id:number,
    denominacion: string,
    precioVenta: number,
    imagenes: ImagenArticulo[]
    //unidadMedida: UnidadMedida
    descripcion: string
    tiempoEstimadoMinutos: number
    preparacion: string
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalles[]
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

interface ArticuloManufacturadoDetalles{
    id: number
    eliminado: boolean
    cantidad: number,
    articuloInsumo: ArticuloInsumo
}

interface ArticuloInsumo{
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