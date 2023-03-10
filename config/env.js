const env = {
    database: 'main_db',
    username: 'root',
    password: null,
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;