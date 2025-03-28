const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class User extends Model{
    public id! : number;
    public name! : string;
    public email! : string;
    public password! : string;
};

User.init(
    {
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true
    }
);

export default User;
