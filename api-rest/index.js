'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Cuenta = require('./Modelos/cuentas')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/cuenta',(req, res)=>{

  Cuenta.find({}, (err, cuentas)=>{
    if(err) return res.status(500).send({message: 'Error el realizar la petición: ${err}'})
    if(!cuentas) return res.status(404).send({message: 'No existen cuentas'})

    res.send(200, { cuentas })
})
})

app.get('/api/cuenta/:cuentaId',(req, res)=>{
let cuentaId = req.params.cuentaId
Cuenta.findById(cuentaId, (err, cuenta)=>{
  if(err) return res.status(500).send({message: 'Error el realizar la petición: ${err}'})
  if(!cuenta) return res.status(404).send({message: 'La cuenta no existe'})

  res.status(200).send({cuenta})
})
})

app.post('/api/cuenta',(req, res)=>{
console.log('POST /api/cuenta')
console.log(req.body)

let cuenta = new Cuenta()
cuenta.usuario = req.body.usuario
cuenta.contraseña = req.body.contraseña
cuenta.nombre = req.body.nombre
cuenta.save((err, cuentaStored) =>{
  if(err) res.status(500).send({message: 'Error al salvar la base de datos ${err}'})
  res.status(200).send({cuenta: cuentaStored})
})
})

app.put('/api/cuenta/:cuentaId',(req, res)=>{
  let cuentaId = req.params.cuentaId
  let update = req.body

  Cuenta.findByIdAndUpdate(cuentaId,update,(err, cuentaUpdate)=>{
    if(err) res.status(500).send({message: 'Error al actualizar el producto ${err}'})

    res.status(200).send({cuenta: cuentaUpdate})
  })
})
app.delete('/api/cuenta/:cuentaId',(req, res)=>{
  let cuentaId = req.params.cuentaId

  Cuenta.findById(cuentaId, (err, cuenta) =>{
    if(err) res.status(500).send({message: 'Error al borrar cuenta: ${err}'})

    cuenta.remove(err=>{
      if(err)res.status(500).send({message: 'Error al borrar cuenta: ${err}'})
    res.status(200).send({message: 'El producto ha sido eliminado'})
    })
  })
})

mongoose.connect('mongodb://localhost:27017/tarea', (err, res) =>{
  if(err){
    return console.log('Error al conectar a la base de datos: ${err}')
  }
  console.log('Conexion a la base de datos establecida')

  app.listen(port, () => {
    console.log(`API REST corriendo http://localhost:${port}`)
  })
})
