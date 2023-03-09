module.exports = (sequelize, DataTypes) => {
    const haramainExtraFood = sequelize.define('haramainfood', {
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
    return haramainExtraFood
}