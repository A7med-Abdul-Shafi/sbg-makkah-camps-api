module.exports = (sequelize, DataTypes) => {
    const ewaaaExtraTrans = sequelize.define('ewaaatrans', {
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
    return ewaaaExtraTrans
}