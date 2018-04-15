const router = require('express').Router();
const cardCtrl = require('./cards.controller');

/* 
    URL:    POST /cards/
    DESC:   API to add a card
*/
router.post('/', function(req, res) {
  try {
    cardCtrl.addCard(req.body, function(err, result) {
      if (err) {
        console.error('Error adding card :: ', err);
        res.status(400).send({
          error: 'Something fishy in the server, please try again!'
        });
        return;
      }
      res.status(201).send(result);
      return;
    });
  } catch (err) {
    console.error('Error adding card :: ', err);
    res.status(500).send({
      error: 'Something fishy in the server, please try again!'
    });
    return;
  }
});

/* 
    URL:    POST /cards/<cardId>
    DESC:   API to update a card
*/
router.post('/:cardId', function(req, res) {
  try {
    let cardObj = req.body;
    cardObj.cardId = req.params.cardId;
    
    cardCtrl.updateCardById(cardObj, function(err, result) {
      if (err) {
        console.error('Error updating card :: ', err);
        res.status(400).send({
          error: 'Something fishy in the server, please try again!'
        });
        return;
      }
      res.status(201).send(result);
      return;
    });
  } catch (err) {
    console.error('Error in operation :: ', err);
    res.status(500).send({
      error: 'Something fishy in the server, please try again!'
    });
    return;
  }
});

/* 
    URL:    GET /cards/
    DESC:   API to fetch all cards
*/
router.get('/', function(req, res) {
  try {
    cardCtrl.getCards(function(err, result) {
      if (err) {
        console.error('Error fetching Cards :: ', err);
        res.status(400).send({
          error: 'Something fishy in the server, please try again!'
        });
        return;
      }
      res.status(201).send(result);
      return;
    });
  } catch (err) {
    console.error('Error fetching Cards :: ', err);
    res.status(400).send({
      error: 'Something fishy in the server, please try again!'
    });
    return;
  }
});

/* 
    URL:    GET /cards/<cardId>
    DESC:   API to fetch a card
*/
router.get('/:cardId', function(req, res) {
  try {
    cardCtrl.getCardById(req.params.cardId, function(err, result) {
      if (err) {
        console.error('Error fetching card :: ', err);
        res
          .status(400)
          .send({
            error: 'Something fishy in the server, please try again!'
          });
        return;
      }
      res.status(201).send(result);
      return;
    });
  } catch (err) {
    console.error('Error fetching cards :: ', err);
    res
      .status(400)
      .send({
        error: 'Something fishy in the server, please try again!'
      });
    return;
  }
});

module.exports = router;
