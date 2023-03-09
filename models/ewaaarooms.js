module.exports = (sequelize, DataTypes) => {    
    const ewaaarooms = sequelize.define("ewaaarooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return ewaaarooms; 
}; 
