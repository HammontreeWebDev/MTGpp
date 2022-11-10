const User = require("./User");
const Deck = require("./Deck");

User.hasMany(Deck, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Deck.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User, Deck };
