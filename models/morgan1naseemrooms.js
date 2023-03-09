module.exports = (sequelize, DataTypes) => {    
    const morgan1naseemrooms = sequelize.define("morgan1naseemrooms", {   
        room: {  
            type: DataTypes.STRING, 
            allowNull: false  
        },
        capacity: {   
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });  
    return morgan1naseemrooms; 
}; 
