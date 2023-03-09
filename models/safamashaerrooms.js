module.exports = (sequelize, DataTypes) => {    
    const safamashaerrooms = sequelize.define("safamashaerrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return safamashaerrooms; 
}; 
