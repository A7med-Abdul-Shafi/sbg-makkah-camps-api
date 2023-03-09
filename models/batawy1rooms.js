module.exports = (sequelize, DataTypes) => {    
    const batawy1rooms = sequelize.define("batawy1rooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return batawy1rooms; 
}; 
