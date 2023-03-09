module.exports = (sequelize, DataTypes) => {    
    const rahmaneyarooms = sequelize.define("rahmaneyarooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return rahmaneyarooms; 
}; 
