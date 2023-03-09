module.exports = (sequelize, DataTypes) => {    
    const sawady1rooms = sequelize.define("sawady1rooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });   
    return sawady1rooms; 
}; 
