module.exports = (sequelize, DataTypes) => {
    const ewaaaExtraFood = sequelize.define('ewaaafood', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        project: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return ewaaaExtraFood
}