import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialusers = sequelize.define('ws_historialusers' ,{ 
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
    id_users:{ 
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
        type:DataTypes.STRING, 
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
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    edit:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    elim:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    nuev:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    img:{ 
        type:DataTypes.STRING, 
        allowNull: true, 
    },                      
    id_direccion:{ 
        type:DataTypes.STRING, 
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
