var mongoose = require('mongoose');

var Kohteet = mongoose.Schema({
  ottelu: String
});

var VetoSchema = mongoose.Schema({
  pvm: {type: Date, default: Date.now},
  booker: String,
  pelimuoto: String,
  panos: Number,
  kerroin: Number,
  voitto: Number,
  kommentti: String,
  kohteet: [Kohteet]
}, {collection: 'vedot'});

var Veto = mongoose.model('Veto', VetoSchema);

exports.Veto = Veto;