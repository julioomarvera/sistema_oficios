import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialrolles = sequelize.define('ws_historialrolles' ,{ 
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
   id_roll:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
   descripcion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
   crear:{ 
        type:DataTypes.BOOLEAN, 
        allowNull: true, 
    },                      
   ver:{ 
        type:DataTypes.BOOLEAN, 
        allowNull: true, 
    },                      
   editar:{ 
        type:DataTypes.BOOLEAN, 
        allowNull: true, 
    },                      
   eliminar:{ 
        type:DataTypes.BOOLEAN, 
        allowNull: true, 
    },                      
}) 
