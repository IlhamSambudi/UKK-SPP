const express = require("express")
const app = express()
const cors = require("cors");
app.use(cors());
const kelas = require("./router/endpoint-kelas")
const petugas = require("./router/endpoint-petugas")
const spp = require("./router/endpoint-spp")
const siswa = require("./router/endpoint-siswa")
const pembayaran = require("./router/endpoint-pembayaran")
app.use("/pembayaran/spp/kelas", kelas)
app.use("/pembayaran/spp/petugas", petugas)
app.use("/pembayaran/spp/spp", spp)
app.use("/pembayaran/spp/siswa", siswa)
app.use("/pembayaran/spp/transaksi", pembayaran)

app.use(express.static(__dirname))
app.listen(8000, ()=> {
    console.log("Server run on port 8000")
})