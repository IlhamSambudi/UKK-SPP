const express = require("express")
const models = require("../models/index")
const pembayaran = models.pembayaran
const app = express()

const auth = require("../auth-admin")
app.use(auth)

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", async(req,res)=>{
    let result = await pembayaran.findAll({
        include : ["siswa", "petugas"]
    })
    res.json(result)
})

app.post("/", async(req,res)=>{
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        id_spp:req.body.id_spp,
        bulan_tahun: req.body.bulan_tahun,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.create(data)
    .then(result => {
        res.json({message: "data inserted"})
    })
    .catch(error => {
        res.json({message:error.message})
    })
})

app.put("/", async(req,res)=>{
    let param = await {id_pembayaran:req.body.id_pembayaran}
    let data = await {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        bulan_tahun: req.body.bulan_tahun,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.update(data, {where:param})
    .then(result => {
        res.json({message: "data updated"})
    })
    .catch(error =>{
        res.json({message: error.message})
    })
})

app.delete("/:id_pembayaran", async(req,res)=>{
    let param = {id_pembayaran:req.params.id_pembayaran}
    pembayaran.destroy({where:param})
    .then(result=>{
        res.json({message: "data destroyed"})
    })
    .catch(error=>{
        res.json({message: error.message})
    })
})

module.exports = app