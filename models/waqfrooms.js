module.exports = (sequelize, DataTypes) => {    
    const waqfrooms = sequelize.define("waqfrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return waqfrooms; 
}; 
