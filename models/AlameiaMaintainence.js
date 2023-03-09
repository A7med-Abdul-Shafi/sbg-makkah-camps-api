module.exports = (sequelize, DataTypes) => { 
    const alameiaMaintainence = sequelize.define("alameiaMaintainence", {
        emp_no: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: { 
            type: DataTypes.STRING,
            allowNull: false
        }, 
        room_no: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        nationality: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iqama_no: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        content: {
            type:DataTypes.STRING,   
            allowNull:false
        },
        housing: { 
            type:DataTypes.STRING,
            allowNull:false
        }, 
        status: {
            type: DataTypes.STRING,
            defaultValue:"تحت الإجراء"
        }
    });
    return alameiaMaintainence;

};
