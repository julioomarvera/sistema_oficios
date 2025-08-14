import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialoficios = sequelize.define('ws_historialoficios' ,{ 
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
    id_oficios:{ 
        type:DataTypes.INTEGER, 
        allowNull: true, 
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
        type:DataTypes.STRING, 
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
}) 
