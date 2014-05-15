var express = require('express');
var router = express.Router();
var Veto = require('../models/models').Veto;

// Huolehtii erroreista
function sendResponse(req, res, err, docs, msg) {
  if(err) {
    res.json({viesti: err});
  }
  else if(docs !== null) {
    res.json(docs);
  }
  else {
    res.json({viesti: msg});
  }
}

router.use(function(req, res, next) {
  console.log('Tapahtuma');
  next();
});

router.get('/', function(req, res) {

  var data = {
    nimi: 'Jack Bauer'
  };

  res.render('index.html', data);
});

router.route('/vedot')

  // Vetojen haku
  .get(function(req, res) {
    Veto.find({}, function(err, docs) {
      sendResponse(req, res, err, docs, 'Kaikki vedot');
    });
  })
  // Vedon tallennus
  .post(function(req, res) {
    var veto = new Veto({
      booker: req.body.booker,
      pelimuoto: req.body.pelimuoto,
      panos: req.body.panos,
      kerroin: req.body.kerroin,
      voitto: req.body.voitto,
      kommentti: req.body.kommentti,
      kohteet: req.body.kohteet
    });

    veto.save(function(err, docs) {
      sendResponse(req, res, err, docs, 'Veto tallennettu');
    });
  });

  router.route('/vedot/:id')
    // Yksittäisen vedon haku
    .get(function(req, res) {
      Veto.findById(req.params.id, function(err, docs) {
        sendResponse(req, res, err, docs);
      });
    })
    // Vedon muokkaus
    .put(function(req, res) {
      Veto.findById(req.params.id, function(err, docs) {
        if(err) {
          res.json({viesti: err});
        }
        else {
          docs.pvm = req.body.pvm;
          docs.booker = req.body.booker;
          docs.pelimuoto = req.body.pelimuoto;
          docs.panos = req.body.panos;
          docs.kerroin = req.body.kerroin;
          docs.voitto = req.body.voitto;
          docs.kohteet = req.body.kohteet;

          docs.save(function(err) {
            sendResponse(req, res, err, docs, 'Vetoa muokattu');
          });
        }
      });
    })
      // Vedon poisto
      .delete(function(req, res) {
        Veto.remove({_id: req.params.id}, function(err, docs) {
          sendResponse(req, res, err, docs, 'Veto poistettu');
        });
      });

module.exports = router;