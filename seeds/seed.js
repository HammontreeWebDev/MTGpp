const sequelize = require("../config/connection");
const { User, Deck } = require("../models");
const userData = require("./userData.json");
const decklistData = require("./decklistData.json");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData);
    await Deck.bulkCreate(decklistData);
    process.exit(0);
}

seedAll();