module.exports = (sequelize, DataTypes) => {    
    const matrafyrooms = sequelize.define("matrafyrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return matrafyrooms; 
}; 
