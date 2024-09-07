import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Event from '../app/models/Event';
import Subscription from '../app/models/Subscription';
 

const models = [User,Event,Subscription];

class Database {
  constructor(){
    this.init();
  }

  init (){

    // connecting the database to the models
    this.connection = new Sequelize(databaseConfig);
    
    models
    .map(model => model.init(this.connection)); // Inicializa os modelos

    models
    .map(model => model.associate && model.associate(this.connection.models));

  }

}

export default new Database();