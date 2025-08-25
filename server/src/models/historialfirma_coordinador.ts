import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialfirma_coordinador = sequelize.define('ws_historialfirma_coordinador' ,{ 
    historial_id:{ 
        type:DataTypes.INTEGER, 
        primaryKey:true,       
        autoIncrement:true,     
    },               
    id_usuario:{ 
        type:DataTypes.INTEGER, 
        allowNull: false, 
    },               
    accion:{ 
        type:DataTypes.STRING, 
        allowNull: false, 
    },               
    id_firma_coordinador:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    id_gestion_oficio:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    id_oficios:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    id_direccion_coordinador:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    text_direccion_coordinador:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    id_area_coordinador:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    text_area_coordinador:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    id_direccion_peticion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    text_direccion_peticion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    id_area_peticion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    area_text_peticion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    numero_empleado_coordinador:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nombre_empleado_coordinador:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    foto_empleado_coordinador:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    numero_empleado_peticion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nombre_empleado_peticion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    foto_empleado_peticion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    numero_empleado_secretaria:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nombre_secretaria:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    foto_secretario:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    numero_empleado_tecnico:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nombre_tecnico:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    foto_tecnico:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    numero_oficio:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    numero_contestacion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    archivo_oficio:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    archivo_sello:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    archivo_evidencia:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    archivo_contestacion_pdf:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    archivo_contestacion_digital:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    asunto:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    descripcion_contestacion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    visto:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    fecha_contestacion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    fecha_terminacion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    tiempo_efectivo_contestacion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    otro:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
}) 
