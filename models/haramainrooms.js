module.exports = (sequelize, DataTypes) => {
    const haramainrooms = sequelize.define("haramainrooms", {
        room: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
    return haramainrooms; 

}; 
