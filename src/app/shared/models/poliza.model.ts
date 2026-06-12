export interface Poliza{
    idPoliza: number;
    idEmpleado: number;
    nombreEmpleado: string;
    sku: string;
    nombreArticulo: string;
    cantidadFaltante: number;
    fechaCreacion: string;
}

export interface CrearPolizaRequest{
    idEmpleado: number;
    sku: string;
    cantidadFaltante: number;
}

export interface ActualizarPolizaRequest{
    idEmpleado: number;
    sku: string;
    cantidadFaltante: number
}