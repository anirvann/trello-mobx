const router = require('express').Router();
const listCtrl = require('./lists.controller');

/* 
    URL:    POST /lists/
    DESC:   API to add a list
*/
router.post('/', function(req, res) {
  try {
    listCtrl.addList(req.body, function(err, result) {
      if (err) {
        console.error('Error adding list :: ', err);
        res.status(400).send({
          error: 'Something fishy in the server, please try again!'
        });
        return;
      }
      res.status(201).send(result);
      return;
    });
  } catch (err) {
    console.error('Error adding list :: ', err);
    res.status(500).send({
      error: 'Something fishy in the server, please try again!'
    });
    return;
  }
});

/* 
    URL:    POST /lists/<listId>
    DESC:   API to update a list
*/
router.post('/:listId', function(req, res) {
  try {
    let listObj = req.body;
    listObj.listId = req.params.listId;
    
    listCtrl.updateListById(listObj, function(err, result) {
      if (err) {
        console.error('Error adding list :: ', err);
        res.status(400).send({
          error: 'Something fishy in the server, please try again!'
        });
        return;
      }
      res.status(201).send(result);
      return;
    });
  } catch (err) {
    console.error('Error adding list :: ', err);
    res.status(500).send({
      error: 'Something fishy in the server, please try again!'
    });
    return;
  }
});

/* 
    URL:    GET /lists/
    DESC:   API to fetch all lists
*/
router.get('/', function(req, res) {
  try {
    listCtrl.getLists(function(err, result) {
      if (err) {
        console.error('Error fetching lists :: ', err);
        res.status(400).send({
          error: 'Something fishy in the server, please try again!'
        });
        return;
      }
      res.status(201).send(result);
      return;
    });
  } catch (err) {
    console.error('Error fetching lists :: ', err);
    res.status(400).send({
      error: 'Something fishy in the server, please try again!'
    });
    return;
  }
});

/* 
    URL:    GET /lists/<listId>
    DESC:   API to fetch a list
*/
router.get('/:listId', function(req, res) {
  try {
    listCtrl.getListById(req.params.listId, function(err, result) {
      if (err) {
        console.error('Error fetching list :: ', err);
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
    console.error('Error fetching lists :: ', err);
    res
      .status(400)
      .send({
        error: 'Something fishy in the server, please try again!'
      });
    return;
  }
});

module.exports = router;
