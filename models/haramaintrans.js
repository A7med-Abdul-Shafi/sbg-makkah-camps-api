module.exports = (sequelize, DataTypes) => {
    const haramainExtraTrans = sequelize.define('haramaintrans', {
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
    return haramainExtraTrans
}