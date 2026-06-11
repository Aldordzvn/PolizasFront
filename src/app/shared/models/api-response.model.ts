export interface ApiResponse<T>{
    exito: boolean;
    mensaje: string;
    datos: T,
    timeStamp: string;
}