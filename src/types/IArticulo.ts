export interface IArticulo{
    denominacion: string,
    precioVenta: number,
    imagenArticulo: ImagenArticulo
}

interface ImagenArticulo{
    id: number,
    url: string
}