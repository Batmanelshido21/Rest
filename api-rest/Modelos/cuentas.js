'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CuentaSchema = Schema({
  usuario: String,
  contraseña: String,
  nombre: String
})

module.exports = mongoose.model('Cuenta',CuentaSchema)
