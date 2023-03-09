module.exports = (sequelize, DataTypes) => {    
    const elfatehrooms = sequelize.define("elfatehrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return elfatehrooms; 
}; 
