module.exports = (sequelize, DataTypes) => {    
    const ewaabrooms = sequelize.define("ewaabrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return ewaabrooms; 
}; 
