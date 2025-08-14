import { cat_destinatarioTable } from "../registro_destinatario/cat_destinatario/cat_destinatario-table.interface";

export interface gestion_oficiosTable{
  visual?: { label: string; icon: string; color: string; };
  id_gestion_oficios :number | any,  
  estatus      : number|any,  
  descripcion  : string|any,  
  activo       : number|any,  
  id_usuario   : number|any,  
  id_rol       : number|any,  
  destinatarios?: cat_destinatarioTable[];
  progresoDestinatarios?: number|any, 
  fecha_hora   : string|any,
  numero_oficio : string|any,
  caso_cop : string|any,
  asunto : string|any,
  contenido : string|any,
  archivo_oficio : string,
}
