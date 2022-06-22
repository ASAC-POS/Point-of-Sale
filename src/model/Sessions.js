const sessions = (sequelize, DataTypes) =>
  sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
    },
    data: {
      type: DataTypes.STRING,
    },
  });

module.exports = { sessions };
