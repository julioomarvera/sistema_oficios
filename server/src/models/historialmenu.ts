import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialmenu = sequelize.define('ws_historialmenu' ,{ 
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
   id_menu:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
   id_roll:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
   titulo:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
   direccion_url:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
}) 
