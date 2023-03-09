module.exports = (sequelize, DataTypes) => {
    const alameiaExtraTrans = sequelize.define('alameiatrans', {
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
    return alameiaExtraTrans
}