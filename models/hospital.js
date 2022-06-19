const { Schema, model } = require("mongoose");

const HospiatlSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario:{
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

//pasar el _id a uid
HospiatlSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", HospiatlSchema);
