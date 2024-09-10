import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    // storage: ':memory:',
});

// Export the database instance

export default sequelize

// Export the models so importing them in other files is a breeze

export { default as Character } from './Character'