module.exports = (sequelize, DataTypes) => {
    const saqaf = sequelize.define("saqaf", {
        emp_no: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        class: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: false
        },
        project: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iqama_no: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        passport_no: {
            type: DataTypes.STRING,
            allowNull: true
        },
        in_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        emp_photo: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        iqama_photo: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        in_reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        out_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        case1: {
            type: DataTypes.INTEGER,
            get() {
                const outDate = new Date(this.getDataValue('out_date'));
                const date = new Date();
                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                const diffIntimeOutNotNull = outDate.getTime() - firstDay;
                const diffInDays = diffIntimeOutNotNull / (1000 * 3600 * 24)
                return Math.ceil(diffInDays);
            },
            set(value) {
                throw new Error('sumDays` value!');
            }
        },
        case2: {
            type: DataTypes.INTEGER,
            get() {
                const outDate = new Date(this.getDataValue('out_date'));
                const inDate = new Date(this.getDataValue('in_date'));
                const diffIntimeOutNotNull = outDate.getTime() - inDate.getTime();
                const diffInDays = diffIntimeOutNotNull / (1000 * 3600 * 24)
                return Math.ceil(diffInDays);
            },
            set(value) {
                throw new Error('sumDays` value!');
            }
        },
        case3: {
            type: DataTypes.INTEGER,
            get() {
                const inDate = new Date(this.getDataValue('in_date'));
                const date = new Date();
                const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                const diffIntimeOutNotNull = lastDay - inDate.getTime();
                const diffInDays = diffIntimeOutNotNull / (1000 * 3600 * 24) + 1
                return Math.ceil(diffInDays);
            },
            set(value) {
                throw new Error('sumDays` value!');
            }
        },
        out_reason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        coupon: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'نعم'
        },
        mobile: {
            type: DataTypes.INTEGER,
            allowNull: true
            },
        housing: {
            type: DataTypes.STRING,
            defaultValue: 'عمارة السقاف'
        },
    });
    return saqaf;

};
