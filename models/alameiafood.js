module.exports = (sequelize, DataTypes) => {
    const alameiaExtraFood = sequelize.define('alameiafood',{
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
    });
    return alameiaExtraFood
};