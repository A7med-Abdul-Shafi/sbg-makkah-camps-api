module.exports = (sequelize, DataTypes) => {
    const ewaabExtraTrans = sequelize.define('ewaabtrans', {
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
    return ewaabExtraTrans
}