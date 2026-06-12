export interface Inventario{
    sku: string;
    nombre: string;
    cantidad: number;
    creadoEn: string;
}

export interface CrearInventarioRequest{
    sku: string;
    nombre: string;
    cantidad: number;
}

export interface ActualizarInventarioRequest{
    nombre: string;
    cantidad: number;
}