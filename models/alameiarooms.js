module.exports = (sequelize, DataTypes) => {    
    const alameiarooms = sequelize.define("alameiarooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return alameiarooms; 
}; 
