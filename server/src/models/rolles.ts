import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbrolles = sequelize.define('ws_rolles' ,{ 
   id_roll:{ 
     type:DataTypes.INTEGER, 
     primaryKey:true,        
     autoIncrement:true,     
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
   activo:{ 
     type:DataTypes.BOOLEAN, 
     allowNull: true, 
   },                         
}) 
