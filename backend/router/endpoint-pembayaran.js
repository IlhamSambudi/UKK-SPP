const express = require("express")
const models = require("../models/index")
const pembayaran = models.pembayaran
const app = express()

// const auth = require("../auth-admin")
// app.use(auth)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", async (req, res) => {
    let result = await pembayaran.findAll({
        include: [{ all: true, nested: true }]
    })
    res.json(result)
})
// const findOnePembayaran = async (param) => {
//      await pembayaran.findOne({
//         where:param,
//         include: [{ all: true, nested: true }]
//     })
// }
const findOnePembayaran = async (param) => {
    try {
        return await pembayaran.findOne({
            where: param, include: ['petugas', 'siswa', {
                model: models.siswa,
                as: "siswa",
                include: ["spp"]
            }]
        })
    } catch (err) {
        return error(err, 'findOnePembayaran', 500)
    }
}
app.post("/", async (req, res) => {

    try {


        const payload = req.body
        const exist = await findOnePembayaran({ nisn: payload.nisn, bulan_tahun: payload.bulan + " " + payload.tahun })
        if (exist) {
            return res.json({ message: 'SPP bulan ' + payload.bulan + ' ' + payload.tahun + ' sudah dibayar' })
        }

        let data = {
            id_petugas: req.body.id_petugas,
            nisn: req.body.nisn,
            tgl_bayar: req.body.tgl_bayar,
            id_spp: req.body.id_spp,
            bulan_tahun: req.body.bulan + " " + req.body.tahun,
            jumlah_bayar: req.body.jumlah_bayar
        }

        pembayaran.create(data)
            .then(result => {
                res.json({ message: "data inserted" })
            })
            .catch(error => {
                res.json({ message: error.message })
            })
    } catch (error) {
        return response(res, error, 'Failed insert data pembayaran', 500)
    }
})

app.put("/", async (req, res) => {
    let param = await { id_pembayaran: req.body.id_pembayaran }
    let data = await {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        bulan_tahun: req.body.bulan + " " + req.body.tahun,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.update(data, { where: param })
        .then(result => {
            res.json({ message: "data updated" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.delete("/:id_pembayaran", async (req, res) => {
    let param = { id_pembayaran: req.params.id_pembayaran }
    pembayaran.destroy({ where: param })
        .then(result => {
            res.json({ message: "data destroyed" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.get("/for-siswa/:nisn", async (req, res) => {
    let param = { nisn: req.params.nisn }
    let result = await pembayaran.findAll({
        where: param,
        include: ["petugas",
            "siswa",
            {
                model: models.siswa,
                as: "siswa",
                include: ["spp", "kelas"]
            }
        ]
    })
    res.json(result)
})

const response = (res, result, message, code) => {
    return res.status(code).json({
      data: result,
      message: message,
      code: code
    });
  }
  
  const error = (err, description, code = 500) => ({ err, code, data: null, message: description });
  
module.exports = app