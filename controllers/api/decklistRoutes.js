const router = require('express').Router();
const { Deck } = require('../../models');
const withAuth = require('../../utils/auth');

// get single deck
router.get('/:id', async (req, res) => {
    try {
      // Search the database for a deck with an id that matches params
      const deckData = await Deck.findByPk(req.params.id);
      // console.log(deckData)

      // serialize the data 
      const decklist = deckData.get({ plain: true });
      res.render('decklist', decklist);
    } catch (err) {
        res.status(500).json(err);
      }
  });

// add card to deck
router.post('/', withAuth, async (req, res) => {
    try {
      const newCard = await Deck.create({
        deck_list: req.body.deck_list,
        user_id: req.session.id,
      },
      {
        where: {
            id: req.params.id,
        },
      });
      res.status(200).json(newCard);
    } catch (err) {
      res.status(400).json(err);
      }

  });

// delete card from deck
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // TODO: pull card object out of deck.decklist array
      const cardData = await Deck.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.id,
        },
      });

      res.status(200).json(cardData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;