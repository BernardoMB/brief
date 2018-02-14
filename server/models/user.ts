const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  coordinates: { type: [Number], index: '2dsphere' },
  type: { type: String, default: 'Point' }
});

const UserSchema = new Schema({
  // dbo.CATUSUARIO
  legacy_id: String,
  // infomation about the prospect, nombre
  first_name: {
    type: String,
  },
  // apellido paterno
  last_name: {
    type: String,
  },
  // apellido materno
  m_last_name: {
    type: String,
  },
  // name of the user's company
  company_name: {
    type: String,
  },
  // email of the user's company
  email: {
    type: String,
  },
  // user's password
  password: {
    type: String
  },
  telephone_num: {
    type: String
  },
  cellphone_num: {
    type: String
  },
  // facebook's lead id
  facebook_lead_id: {
    type: String
  },
  // products the user offers
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }],
  // the user's coverage
  coverage: {
    // (national, by state)
    type: String,
    locations: [{
      country: {
        type: Schema.Types.ObjectId,
        ref: 'country',
      },
      state: {
        type: Schema.Types.ObjectId,
        ref: 'state',
      }
    }]
  },
  // geo-location
  location: PointSchema,
  // telemarketing pin, more info required
  pin: Number,
  // registration date
  registered_at: Date,
  // the offer that the user agreed on
  offer: {
    type: Schema.Types.ObjectId,
    ref: 'offer'
  }
});

const User = mongoose.model('user', UserSchema);

export default User;
