module.exports = (sequelize, DataTypes) => {
    const ewaabExtraFood = sequelize.define('ewaabfood', {
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
    return ewaabExtraFood
}