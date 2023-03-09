module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define('customer', { 
        emp_no: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        profession: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: false
        },
        project: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iqama_no: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        passport_no: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        emp_photo: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        iqama_photo: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        mobile: {
            type: DataTypes.BIGINT,
            allowNull: true
        }
    });

    return customer; 
}