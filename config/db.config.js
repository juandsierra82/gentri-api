module.exports = {
    HOST: 'localhost',
    USER: process.env.user,
    PASSWORD: process.env.password,
    DB: 'gentri_api',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}