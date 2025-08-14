import { Sequelize } from 'sequelize'; 

const sequelize = new Sequelize('oficios', 'root', '',{ 
   host:'localhost',
   dialect:'mysql',
});

export default sequelize
