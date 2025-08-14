import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const  dboficios = sequelize.define('ws_oficios' ,{ 
   id_usuario:{ 
     type:DataTypes.INTEGER, 
   },      
   id_oficios:{ 
     type:DataTypes.INTEGER, 
     primaryKey:true,        
     autoIncrement:true,     
   },                      
   oficio:{ 
     type:DataTypes.INTEGER, 
     allowNull: true, 
   },                      
   text_oficio:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   tipo_oficio:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   text_tipo:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },    
   folio:{
     type:DataTypes.STRING, 
     allowNull: true, 
   },
   numero_oficio:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   fecha_hora:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   caso_cop:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   asunto:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   contenido:{ 
     type:DataTypes.STRING(3000), 
     allowNull: true, 
   },                      
   archivo_oficio:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   otro:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   id_estatusgestion_oficios:{ 
     type:DataTypes.INTEGER, 
   },      
   activo:{ 
     type:DataTypes.TINYINT, 
   },      
}) 
