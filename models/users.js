module.exports = (sequelize, DataTypes)=> {
    const users = sequelize.define("users", { 
        emp_no: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        username: { 
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        email: { 
            type: DataTypes.STRING,  
            allowNull: false
        },
        house: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roles: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN, 
            defaultValue: true
        }
        
        
})
    return users;
}