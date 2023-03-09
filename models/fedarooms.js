module.exports = (sequelize, DataTypes) => {    
    const fedarooms = sequelize.define("fedarooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return fedarooms; 
}; 
