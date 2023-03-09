module.exports = (sequelize, DataTypes) => {    
    const paradiserooms = sequelize.define("paradiserooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return paradiserooms; 
}; 
