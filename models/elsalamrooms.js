module.exports = (sequelize, DataTypes) => {    
    const elsalamrooms = sequelize.define("elsalamrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return elsalamrooms; 
}; 
