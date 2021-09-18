import { Sequelize } from 'sequelize'
const databasConfig = require('./config.json')
// // connect to postgresql 
const connectToDatabase = new Sequelize(databasConfig.postgres)
export default connectToDatabase
