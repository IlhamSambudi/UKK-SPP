const express = require("express")
const models = require("../models/index")
const kelas = models.kelas
const app = express()

const auth = require("../auth-admin")
app.use(auth)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", async(req,res)=>{
    let result = await kelas.findAll()
    res.json(result)
})

//CREATE
app.post("/", async(req,res)=>{
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }

    kelas.create(data)
    .then(result => {
        res.json({message: "data inserted"})
    })
    .catch(error => {
        res.json({message:error.message})
    })
})

//UPDATE
app.put("/", async(req,res)=>{
    let param = await {id_kelas:req.body.id_kelas}
    let data = await {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }

    kelas.update(data, {where:param})
    .then(result => {
        res.json({message: "data updated"})
    })
    .catch(error =>{
        res.json({message: error.message})
    })
})

//DELETE
app.delete("/:id_kelas", async(req,res)=>{
    let param = {id_kelas:req.params.id_kelas}
    kelas.destroy({where:param})
    .then(result=>{
        res.json({message: "data destroyed"})
    })
    .catch(error=>{
        res.json({message: error.message})
    })
})

module.exports = app