module.exports = (sequelize, DataTypes) => {    
    const morgan2bathaarooms = sequelize.define("morgan2bathaarooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return morgan2bathaarooms; 
}; 
