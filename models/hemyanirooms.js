module.exports = (sequelize, DataTypes) => {    
    const hemyanirooms = sequelize.define("hemyanirooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return hemyanirooms; 
}; 
