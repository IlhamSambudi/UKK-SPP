
import React, { useState, useEffect } from 'react'
import {
    Grid, Paper, Table, TableCell, TableContainer,
    TableHead, TableRow, TableBody, Typography, Modal, Backdrop, Fade, Button
} from "@material-ui/core"
import { IconButton } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@material-ui/icons/Info';

import { useStyles } from '../css'

// URL
import { base_url } from "../../../configs/config"
import axios from "axios"
import Pdf from "react-to-pdf";
const ref = React.createRef();

// ICON

export default function Histori() {

    // data from database
    const [data, setData] = useState([])


    // axios function
    useEffect(() => {
        getHistori()
    }, [])

    // Axios operation
    const getHistori = () => {
        let url = base_url + "/transaksi/for-siswa/" + user.nisn
        axios.get(url, headerConfig())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    // style
    const classes = useStyles()


    // data from local-storage
    let user = JSON.parse(localStorage.getItem("user"))
    const [values, setValues] = React.useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        petugas: {},
        siswa: {},
        nisn: "",
        spp: {},
        bulan_tahun: "",

        jumlah_bayar: 0,
        id_pembayaran: 0,
        tgl_bayar: "",
        kelas: "",
        message: "",
    });


    const headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${values.token}` }
        }
        return header
    }

    const [modalInfo, setModalInfo] = useState(false)
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
            "tgl_bayar": item.tgl_bayar,
            "jumlah_bayar": item.jumlah_bayar,
            "bulan_tahun": item.bulan_tahun,
        })

    }

    const handleModalClose = () => {
        setModalInfo(false)
    }


    const formModalInfo = [
        { label: "ID Pembayaran", theValue: values.id_pembayaran },
        { label: "Nama Petugas", theValue: values.petugas.nama_petugas },
        { label: "Nama Siswa", theValue: values.siswa.nama },
        { label: "NISN", theValue: values.nisn },
        { label: "Kelas", theValue: values.kelas.nama_kelas },
        { label: "ID SPP", theValue: values.spp.id_spp },
        { label: "Taggal Bayar", theValue: values.tgl_bayar.split('T')[0] },
        { label: "Bulan Tahun", theValue: values.bulan_tahun },
        { label: "Jumlah Nominal", theValue: values.jumlah_bayar },
    ]

    const columns = [
        { id: 'id', label: 'Id', align: 'center' },
        { id: 'nama_siswa', label: 'Nama Siswa', align: 'left' },
        { id: 'nama_petugas', label: 'Nama Petugas', align: 'left' },
        { id: 'tgl_bayar', label: 'Tanggal Bayar', align: 'left' },
        { id: 'bulan_tahun', label: 'Bulan Tahun', align: 'left' },
        { id: 'jumlah', label: 'Jumlah Bayar', align: 'left' },
        { id: 'aksi', label: 'Aksi', align: 'left' },
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (values.role === "siswa") {
        return (
            <>
                <h2 className="titlePage"></h2>
                <Paper sx={{ width: '95%', overflow: 'hidden' }} style={{ marginLeft: '2rem', marginRight: '2rem' }}>
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
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(item => (
                                        <TableRow hover>
                                            <TableCell key="id" align="left" style={{ fontWeight: '500' }}>
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
                                            <TableCell key="bulan_tahun" align="left" style={{ fontWeight: '500' }}>
                                                {item.bulan_tahun}
                                            </TableCell>
                                            {/* <TableCell key="thn_dibayar" align="left" style={{ fontWeight: '500', fontFamily: 'Poppins', textAlign: 'center' }}>
                        {item.tahun_dibayar}
                      </TableCell> */}
                                            <TableCell key="jumlah" align="left" style={{ fontWeight: '500' }}>
                                                Rp {item.jumlah_bayar}
                                            </TableCell>
                                            <TableCell key="aksi" align="left" style={{ fontWeight: '500' }}>
                                                {/* button info */}
                                                <IconButton color="info" onClick={() => infoTriger(item)}>
                                                    <InfoIcon />
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
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="p" className={classes.titleModal}>Detail pembayaran</Typography>
                                <Grid container className={classes.formContainer} justify="center">
                                    {formModalInfo.map(item => (
                                        <Grid container justify="center">
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
            </>
        )
    } else {
        window.location = "/"
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        window.location = "/"
    }


}