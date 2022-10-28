if (process.env.NODE_ENV) {
    require('dotenv').config()
}

const config = {
    DATA_PATH: process.env.DATA_PATH || '../data/'
}

module.exports = config