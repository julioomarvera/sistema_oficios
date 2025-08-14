import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialcat_areas = sequelize.define('ws_historialcat_areas' ,{ 
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
    id_cat_areas:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    id_direccion:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    text_direccion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    descripcion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
}) 
