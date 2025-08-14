import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialcat_numero_oficios = sequelize.define('ws_historialcat_numero_oficios' ,{ 
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
    id_cat_numero_oficios:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    descripcion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
}) 
