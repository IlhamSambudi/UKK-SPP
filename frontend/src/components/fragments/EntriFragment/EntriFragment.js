import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography, Button, TextField, MenuItem, Snackbar } from "@material-ui/core"
import { base_url } from '../../../configs/config';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

// icon
import SaveIcon from '@material-ui/icons/Save';
export default function EntriFragment() {
    // data from database
    const [siswa, setSiswa] = useState()
    // axios function
    // const getSiswa = (prop) => (event) => {
    //     let url = base_url + "/siswa/" + prop + " / " + event.target.value
    //     axios.get(url, headerConfig())
    //         .then(res => {
    //             setSiswa(res.data)
    //             setValues({ ...values, "nisn": res.data.nisn })
    //             setValues({ ...values, "nama_siswa": res.data.nama })
    //             setValues({ ...values, "id_spp": res.data.id_spp })
    //             setValues({ ...values, "jumlah_bayar": res.data.spp.nominal })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    // useEffect(() => {
    //     getSiswa()
    // }, [])
    const postPembayaran = (event) => {
        event.preventDefault()
        let loadData = {
            id_petugas: values.id_petugas,
            nisn: values.nisn,
            tgl_bayar: new Date().toISOString().split('T')[0],
            bulan: values.bulan,
            tahun: values.tahun,
            id_spp: values.id_spp,
            jumlah_bayar: values.jumlah_bayar
        }
        let url = "http://localhost:8000/pembayaran/spp/transaksi/"
        axios.post(url, loadData, headerConfig())
            .then(res => {
                setSnackAlert(true)
                setValues({ ...values, "message": res.data.message })
            })
            .catch(err => {
                console.log(err)
            })    }
    // style
    const useStyles = makeStyles({
        mainContainer: {
            minWidth: "100vw",
            minHeight: "94vh",
            marginTop: "-10rem"
        },
        cardContainer: {
            minWidth: "50vw",
            minHeight: "70vh",
            maxWidth: "70vw",
            padding: "2vh"
        },
        inputField: {
            minWidth: "100%",
            margin: "5px"
        },
        formContainer: {
            margin: "2vh"
        },
        button: {
            margin: "2vh",
            backgroundColor: "#0275d8",
            '&:hover': {
                backgroundColor: "#292b2c",
            },
            minWidth: "100px",
            minHeight: "2vh",
            fontSize: "18px"
        }
    })
    const classes = useStyles()

    // data from local storage and user input
    let user = JSON.parse(localStorage.getItem("user"))
    const [values, setValues] = React.useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        nama_petugas: user.nama_petugas,
        id_petugas: user.id_petugas,
        nama_siswa: null,
        nisn: null,
        id_spp: null,
        bulan : null,
        tahun: null,
        jumlah_bayar: null,
        date: "",
        message: ""
    });

    // const [date, setDate] = React.useState()

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
    };

    // const handleDate = (event) => {
    //     // setDate(event.target.value)
    //     // event.preventDefault()
    //     console.log(event.target.value)
    // }



    // header config for database access
    const headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${values.token}` }
        }
        return header
    }
    // bulan and tahun picker
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober", "November", "Desember"]
    const tahun = ["2019", "2020", "2021", "2022", "2023"]

    // snackbar handling
    const [snackAlert, setSnackAlert] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackAlert(false);
    };
    if (values.role === "admin" || values.role === "petugas") {
        return (

            <>
                <div className="bgHome" >
                    <h1 className="homeTitle">Pembayaran SPP</h1>
                </div>
                <Grid container className={classes.mainContainer} justify="center" alignI
                    tems="center">
                    <Grid item>
                        <Card className={classes.cardContainer} elevation={10}>
                            <Grid container justify="center">
                                <Grid container className={classes.formContainer}>
                                    {/* Petugas */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h7">Petugas</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField aria-disabled
                                                variant="outlined"
                                                size="small"
                                                value={values.nama_petugas}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>
                                    {/* NISN */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h7">NISN</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                value={values.nisn}
                                                onChange={handleChange("nisn")}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>
                                    {/* NAMA SISWA */}
                                    {/* <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h7">Nama Siswa</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                size="small"
                                                value={values.nama_siswa}
                                                onChange={handleChange("nama")}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid> */}
                                    {/* Tanggal Bayar */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h7">Tanggal Bayar</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField aria-disabled
                                                variant="outlined"
                                                size="small"
                                                value={new Date().toISOString().split('T')[0]}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>
                                    {/* Bulan DIbayar */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h7">Bulan Dibayar</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    views={['year', 'month']}
                                                    minDate={new Date('2019-03-01')}
                                                    maxDate={new Date('2026-06-01')}
                                                    value={date}
                                                    // onChange= {(ev)=>{setValues({...values, ["date"]:ev.target.value})}}
                                                    onChange={(ev)=>handleDate(ev)}

                                                    renderInput={(params) => <TextField {...params}
                                                        variant="outlined"
                                                        className={classes.inputField}
                                                    />}
                                                />
                                            </LocalizationProvider> */}
                                            <TextField select
                                                variant="outlined"
                                                size="small"
                                                value={values.bulan_tahun}
                                                onChange={handleChange("bulan")}
                                                className={classes.inputField}>
                                                {bulan.map(item => (<MenuItem key={item} value={item}> {item}
                                                </MenuItem>))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h7">Tahun Dibayar</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField select
                                                variant="outlined"
                                                size="small"
                                                value={values.bulan_tahun}
                                                onChange={handleChange("tahun")}
                                                className={classes.inputField}>
                                                {tahun.map(item => (<MenuItem key={item} value={item}> {item}
                                                </MenuItem>))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    {/* ID SPP */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h7">ID SPP</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                value={values.id_spp}
                                                onChange={handleChange("id_spp")}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>
                                    {/* Jumlah Bayar */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h7">Jumlah Bayar</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                value={values.jumlah_bayar}
                                                onChange={handleChange("jumlah_bayar")}
                                                className={classes.inputField} />
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="flex-end" >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={ev => postPembayaran(ev)}
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar
                    open={snackAlert}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {values.message}
                    </Alert>
                </Snackbar>
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