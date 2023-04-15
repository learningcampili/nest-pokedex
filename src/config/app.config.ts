

export const EnvConfiguration =() =>({

    enviroment: process.env.NODE_ENV || 'dev',
    mongoDbUri: process.env.MONGODB_URI,
    port : +process.env.PORT || 3003,
    defaultLimit : +process.env.DEFAULT_LIMIT || 20

})