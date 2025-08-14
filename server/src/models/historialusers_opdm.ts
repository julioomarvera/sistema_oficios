import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialusers_opdm = sequelize.define('ws_historialusers_opdm' ,{ 
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
    id_users_opdm:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    id_roll:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    usuario:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    clave:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nombre:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    apepa:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    apema:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    genero:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    correo:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    telefono:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    fec_ingreso:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    imp:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    edit:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    elim:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    nuev:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    img:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    id_direccion:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
    },                      
    texto_direccion:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    id_area:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    texto_area:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    numero_empleado:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
     foto:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
}) 
