const dotenv =require('dotenv').config();

module.exports = {
    production: {
        use_env_variable: 'DATABASE_URL_AWS',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
}