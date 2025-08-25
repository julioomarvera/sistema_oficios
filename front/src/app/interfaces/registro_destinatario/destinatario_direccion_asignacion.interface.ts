export interface DestinatariosDireccionAsignacion {
    id_asignacion: number,
    id_usuario_quien_asigna: number,
    id_gestion_oficios: number,
    id_oficio: string,
    id_direccion_asignacion: number,
    id_area_asignacion: number,
    numero_empleado: number,
    text_direccion: string,
    text_area: string,
    nombre_completo: string,
    foto: string,
    fecha_asignacion: string,
    instrucciones: string,
    estatus_oficio: string,
    activo: string,
    asignaciones: Asignacion[];

}

export interface Asignacion  {
    id_oficio: number,
    id_asignacion: number,
    estatus_oficio: string,
    fecha_asignacion: string,
}