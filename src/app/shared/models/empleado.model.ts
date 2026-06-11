export interface Empleado{
    idEmpleado: number;
    nombre: string;
    apellido: string;
    puesto: string;
    creadoEn: string;
}

export interface CrearEmpleadoRequest{
    nombre: string;
    apellido: string;
    puesto: string;
}

export interface ActualizarEmpleadoRequest{
    nombre: string;
    apellido: string;
}