module.exports = (sequelize, DataTypes) => {    
    const batawy2rooms = sequelize.define("batawy2rooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return batawy2rooms; 
}; 
