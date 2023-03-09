module.exports = (sequelize, DataTypes) => {    
    const sawady2rooms = sequelize.define("sawady2rooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return sawady2rooms; 
}; 
