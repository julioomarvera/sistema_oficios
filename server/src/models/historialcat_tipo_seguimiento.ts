import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialcat_tipo_seguimiento = sequelize.define('ws_historialcat_tipo_seguimiento' ,{ 
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
    id_cat_tipo_seguimiento:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    descripcion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
}) 
