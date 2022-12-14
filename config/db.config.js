module.exports = {
    HOST: 'localhost',
    USER: 'jsierra',
    PASSWORD: 'jsierra',
    DB: 'gentri_api',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}