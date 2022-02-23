module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "574033",
    DB: "dbgroupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      useUTC: true,
    },
    timezone: '+01:00',

  };