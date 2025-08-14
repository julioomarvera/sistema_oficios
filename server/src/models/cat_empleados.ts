import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbcat_empleados = sequelize.define('ws_cat_empleados' ,{ 
   id_usuario:{ 
     type:DataTypes.INTEGER, 
   },      
   id_cat_empleados:{ 
     type:DataTypes.INTEGER, 
     primaryKey:true,        
     autoIncrement:true,     
   },                          
   nombre_completo:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   numero_empleado:{ 
     type:DataTypes.INTEGER, 
     allowNull: true, 
   },                      
   cargo:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   direccion:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   direccion_texto:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   subdireccion:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   area:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   area_texto:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   nombreJefe:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   cargoJefe:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   correo_institucional:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   telefono_opdm:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   url:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   codigo_qr:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   foto:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   id_estatuscatalogo_empleados:{ 
     type:DataTypes.INTEGER, 
   },      
   activo:{ 
     type:DataTypes.TINYINT, 
   },      
}) 
