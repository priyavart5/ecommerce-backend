import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class User extends Model{}

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
