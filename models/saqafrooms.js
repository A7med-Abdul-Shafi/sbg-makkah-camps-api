module.exports = (sequelize, DataTypes) => {    
    const saqafrooms = sequelize.define("saqafrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return saqafrooms; 
}; 
