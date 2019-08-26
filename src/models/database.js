import 'dotenv/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.KBOS_POSTGRESQL_DATABASE,
  process.env.KBOS_POSTGRESQL_USERNAME,
  process.env.KBOS_POSTGRESQL_PASSWORD,
  {
    host: process.env.KBOS_POSTGRESQL_HOST,   
    dialect: 'postgres',
    operatorsAliaes: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
  });

const models = {

  EgiticiNiteligi: sequelize.import('./egitim/egiticiNiteligi.model'),
  HizmetBirim: sequelize.import('./egitim/hizmetBirim.model'),
  KursTanim: sequelize.import('./egitim/kursTanim.model'),
  KursTuru: sequelize.import('./egitim/kursTuru.model'),
  
  KurumOrganizasyon: sequelize.import('./genel/kurumOrganizasyon.model')

};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
