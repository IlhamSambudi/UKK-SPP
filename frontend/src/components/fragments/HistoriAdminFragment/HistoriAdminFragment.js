
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Alert from '@material-ui/lab/Alert';
import {
  Grid, Typography, Snackbar,
  Modal, Backdrop, Fade, Button
} from "@material-ui/core"
import Pdf from "react-to-pdf";

// URL
import { base_url } from "../../../configs/config"
import axios from "axios"

// // ICON
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import DownloadIcon from '@mui/icons-material/Download';

import { useStyles } from '../css'
import { IconButton } from '@mui/material';

const ref = React.createRef();

const columns = [
  { id: 'id', label: 'Id', align: 'center' },
  { id: 'nama_siswa', label: 'Nama Siswa', align: 'left' },
  { id: 'nama_petugas', label: 'Nama Petugas', align: 'left' },
  { id: 'tgl_bayar', label: 'Tanggal Bayar', align: 'left' },
  { id: 'bulan', label: 'Bulan Tahun', align: 'left' },
  { id: 'jumlah', label: 'Jumlah Bayar', align: 'left' },
  { id: 'aksi', label: 'Aksi', align: 'left' },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // data from database
  const [data, setData] = React.useState([]) //histori


  // axios function
  React.useEffect(() => {
    getHistori()
  }, [])

  // Axios operation
  const getHistori = () => {
    let url = base_url + "/transaksi/"
    axios.get(url, headerConfig())
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const deleteData = (selected) => {
    if (window.confirm("Apakah anda yakin akan menghapus data " + selected.id_pembayaran + " ?")) {
      let url = base_url + "/transaksi/"  + selected.id_pembayaran
      axios.delete(url, headerConfig())
        .then(res => {
          setValues({ ...values, "message": res.data.message })
          setSnackAlert(true)
          getHistori()
        })
        .catch(err => console.log(err))
    }
  }

  // style
  const classes = useStyles()


  // data from local-storage
  // let user = JSON.parse(localStorage.getItem("user"))
  const [values, setValues] = React.useState({
    token: localStorage.getItem("token"),
    role: (localStorage.getItem("role")),
    petugas: {},
    siswa: {},
    nisn: "",
    spp: {},
    bulan_tahun: "",
    jumlah_bayar: 0,
    message: "",
    id_pembayaran: 0,
    tgl_bayar: "",
    kelas: ""
  });


  const headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${values.token}` }
    }
    return header
  }

  const [modalInfo, setModalInfo] = React.useState(false)
  const infoTriger = (item) => {
    setModalInfo(true)
    setValues({
      ...values,
      "id_pembayaran": item.id_pembayaran,
      "petugas": item.petugas,
      "siswa": item.siswa,
      "kelas": item.siswa.kelas,
      "spp": item.siswa.spp,
      "nisn": item.nisn,
      "tgl_bayar": item.tgl_bayar.split('T')[0],
      "jumlah_bayar": item.jumlah_bayar,
      "bulan_tahun": item.bulan_tahun,
    })

  }

  const handleModalClose = () => {
    setModalInfo(false)
  }


  // snackbarHandling
  const [snackAlert, setSnackAlert] = React.useState(false)
  const handleSnackClose = () => {
    setSnackAlert(false)
  }

  const formModalInfo = [
    { label: "ID Pembayaran", theValue: values.id_pembayaran },
    { label: "Nama Petugas", theValue: values.petugas.nama_petugas },
    { label: "Nama Siswa", theValue: values.siswa.nama },
    { label: "NISN", theValue: values.nisn },
    { label: "Kelas", theValue: values.kelas.nama_kelas },
    { label: "ID SPP", theValue: values.spp.id_spp },
    { label: "Tanggal Bayar", theValue: values.tgl_bayar.split('T')[0] },
    { label: "Bulan Tahun", theValue: values.bulan_tahun },
    // { label: "Tahun Dibayar", theValue: values.tahun},
    { label: "Jumlah Nominal", theValue: values.jumlah_bayar },
  ]

  if (values.role === "admin" || values.role === "petugas") {
    return (
      <>
        <h2 className="titlePage"></h2>
        <Paper sx={{ width: '95%', overflow: 'hidden' }} style={{ marginLeft: '2rem' }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ fontWeight: '600', color: '#fff', backgroundColor: '#CE1212', lineHeight: '16px' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(item => (
                    <TableRow hover>
                      <TableCell key="id" align="left" style={{ fontWeight: '500'}}>
                        {item.id_pembayaran}
                      </TableCell>
                      <TableCell key="nama_siswa" align="left" style={{ fontWeight: '500' }}>
                        {item.siswa.nama}
                      </TableCell>
                      <TableCell key="nama_petugas" align="left" style={{ fontWeight: '500' }}>
                        {item.petugas.nama_petugas}
                      </TableCell>
                      <TableCell key="tgl_bayar" align="left" style={{ fontWeight: '500' }}>
                        {item.tgl_bayar.split('T')[0]}
                      </TableCell>
                      <TableCell key="bulan_tahun" align="left" style={{ fontWeight: '500'}}>
                        {item.bulan_tahun}
                      </TableCell>
                      {/* <TableCell key="thn_dibayar" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins' }}>
                        {item.tahun}
                      </TableCell> */}
                      <TableCell key="jumlah" align="left" style={{ fontWeight: '500'}}>
                        Rp {item.jumlah_bayar}
                      </TableCell>
                      <TableCell key="aksi" align="left" style={{ fontWeight: '500'}}>
                        <IconButton color="info" onClick={() => infoTriger(item)}>
                          <InfoIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => deleteData(item)}>
                          <DeleteIcon />
                        </IconButton>

                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ alignContent: 'center' }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalInfo}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={modalInfo}>
            <div className={classes.paperHistori} ref={ref}>

              {/* body card start */}
              <Grid container justify="center" alignItems="center">
                <Typography variant="p" className={classes.titleModal}>Detail Pembayaran SPP</Typography>
                <Grid container className={classes.formContainer} justify="center">
                  {/* info start */}
                  {formModalInfo.map(item => (
                    <Grid container justify="flex-end" alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="p" className={classes.labelModal}>{item.label} </Typography>
                      </Grid>
                      <Grid container justify="center" xs={3}>:</Grid>
                      <Grid item xs={6}>
                        <Typography variant="p" className={classes.valueModal}>{item.theValue}</Typography>
                      </Grid>
                    </Grid>
                  ))}
                  <br />
                </Grid>
                <Pdf targetRef={ref} filename="struk-pembayaran.pdf">
                  {({ toPdf }) =>
                    <Button color="primary" variant="outlined" onClick={toPdf} startIcon={<DownloadIcon />}>
                      Download
                    </Button>
                  }
                </Pdf>
              </Grid>

            </div>
          </Fade>
        </Modal>
        <Snackbar
          open={snackAlert}
          autoHideDuration={6000}
          onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            {values.message}
          </Alert>
        </Snackbar>

      </>
    );
  }
}