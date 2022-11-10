const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Deck extends Model {}

Deck.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        deck_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deck_list: {
            type: DataTypes.JSON,
        },
    },
    {
        sequelize,
        modelName: "deck",
    }
);

module.exports = Deck;
