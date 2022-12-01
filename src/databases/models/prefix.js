/*

GUILD_ID: varchar PK NOT NULL
PREFIX: varchar

*/

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('prefix', {
        guild_id: DataTypes.STRING,
        prefix: DataTypes.STRING
    }, {
        timestamps: false
    });
};