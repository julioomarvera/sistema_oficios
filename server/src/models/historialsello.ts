import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialsello = sequelize.define('ws_historialsello' ,{ 
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
    id_sello:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    id_gestion_oficios:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    id_direccion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    text_direccion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    id_area:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    text_area:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    numero_oficio:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    fecha_creacion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nombre_documento_oficio:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nombre_documento_sello_digital:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nombre_documento_sello:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
}) 
