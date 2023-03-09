module.exports = (sequelize, DataTypes) => {    
    const nefeayrooms = sequelize.define("nefeayrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return nefeayrooms; 
}; 
