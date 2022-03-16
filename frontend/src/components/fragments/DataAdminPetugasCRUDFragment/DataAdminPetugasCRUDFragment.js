import React, { useState, useEffect } from 'react'
import {
    Card, Grid, Typography, Button, Modal, Backdrop, Fade, TextField, MenuItem, Snackbar
} from "@material-ui/core"
// URL
import { base_url, admin_image_url } from "../../../configs/config"
import axios from "axios"
// icon
import MailOutlineRounde from '@material-ui/icons/MailOutlineRounded';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import Fab from '@mui/material/Fab';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import { useStyles } from '../css'
export default function DataAdminPetugasCRUDFragment() {
    // data from database
    const [data, setData] = useState([])
    // use effect
    useEffect(() => {
        getAdmin()
    }, [])
    // axios operation
    const getAdmin = () => {
        let url = base_url + "/petugas"
        axios.get(url, headerConfig())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const saveData = (event) => {
        event.preventDefault()
        handleModalClose()
        let form = new FormData()
        form.append("username", values.username)
        form.append("password", values.password)
        form.append("nama_petugas", values.nama_petugas)
        form.append("level", values.level)
        form.append("id_petugas", values.id_petugas)
        if (values.image) {
            form.append("image", values.image)
        }
        let url = base_url + "/petugas"
        if (values.action === "add") {
            axios.post(url, form, headerConfig())
                .then(res => {
                    setValues({ ...values, "message": res.data.message })
                    setSnackAlert(true)
                    getAdmin()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.put(url, form, headerConfig())
                .then(res => {
                    setValues({ ...values, "message": res.data.message })
                    setSnackAlert(true)
                    getAdmin()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    const deleteData = (selected) => {
        if (window.confirm("Apakah anda yakin akan menghapus data " + selected.level
            + " " + selected.nama_petugas + " ?")) {
            let url = base_url + "/petugas/" + selected.id_petugas
            axios.delete(url, headerConfig())
                .then(res => {
                    setValues({ ...values, "message": res.data.message })
                    setSnackAlert(true)
                    getAdmin()
                })
                .catch(err => console.log(err))
        }
    }
    // This is const for call style in jsx
    const classes = useStyles()
    // prepare auth for fetch data
    const headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${values.token}` }
        }
        return header
    }
    // data local storage
    let user = JSON.parse(localStorage.getItem("user"))
    const [values, setValues] = useState({
        token: localStorage.getItem("token"),
        role: (localStorage.getItem("role")),
        name: user.nama_petugas,
        username: "",
        password: "",
        nama_petugas: "",
        level: "",
        image: "",
        id_petugas: 0,
        message: "",
        action: ""
    });
    // data handling local storage
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
    };
    // data for action
    // modal handling
    const arrayRole = ["admin", "petugas"]
    const [modalEdit, setModalEdit] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const editTriger = (item) => {
        setModalEdit(true)
        setValues({ ...values, "action": "edit" })
        setValues({
            ...values,
            ["username"]: item.username,
            ["nama_petugas"]: item.nama_petugas,
            ["level"]: item.level,
            ["image"]: item.image,
            ["id_petugas"]: item.id_petugas,
        });
    }
    const addTriger = () => {
        setModalAdd(true)
        setValues({ ...values, "action": "add" })
    }
    const handleModalClose = () => {
        setModalEdit(false)
        setModalAdd(false)
        setValues({
            ...values,
            ["username"]: "",
            ["nama_petugas"]: "",
            ["level"]: "",
            ["image"]: "",
            ["id_petugas"]: "",
            ["password"]: ""
        });
    }
    // snackbarHandling
    const [snackAlert, setSnackAlert] = useState(false)
    const handleSnackClose = () => {
        setSnackAlert(false)
    }
    if (values.role === "admin") {
        return (
            <>
                <div className="bgHome" >
                    <h1 className="homeTitle">Data Admin</h1>
                </div>
                <Grid container className={classes.bodyContainer} justify="center">
                    {/* Body start */}
                    <Container sx={{ py: 8 }} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {data.map(item => (
                                <Grid item key={data} xs={12} sm={6} md={4}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 2,
                                                margin: 4,
                                                objectFit: "cover",
                                                alignContent : "center",
                                                justify: "center"
                                            
                                            }}
                                            image={admin_image_url
                                                + "/" + item.image}

                                            alt="random"
                                           alignItems="center"
                                        />
                                        {/* <img className={classes.bodyImgAdmin} src={admin_image_url
                                            + "/" + item.image} /> */}
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.nama_petugas}
                                            </Typography>
                                            <Typography>
                                                {item.username}
                                            </Typography>
                                            <Typography>
                                                {item.level}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<EditIcon />}
                                                onClick={() => editTriger(item)}>Edit</Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => deleteData(item)}
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}>Delete</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                            <Grid container justify="flex-end" className={classes.footerContainer}>
                                <Fab variant="extended" color="primary" arialabel="add" className={classes.footerButton} onClick={() => addTriger()}>
                                    <AddCircleIcon /> Tambah Data
                                </Fab>
                            </Grid>

                        </Grid>
                    </Container>
                    {/* Body end */}
                </Grid>



                {/* modal edit start*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modalEdit}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={modalEdit}>
                        <div className={classes.paperAdmin}>
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h4">FORM ADMIN</Typography>
                                {/* body card start */}
                                <Grid container justify="center" className={classes.formContainer
                                }>
                                    <Grid container justify="center" lg={4} xs={12}>
                                        <img className={classes.bodyImgAdmin} src={admin_image_url +
                                            "/" + values.image} />
                                    </Grid>
                                    <Grid container justify="center" lg={7} xs={12} className={classes.formContainer}>
                                        {/* nama petugas */}
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <Typography variant="h6">Nama</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleChange("nama_petugas")}
                                                    value={values.nama_petugas}
                                                    className={classes.inputField}>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        {/* username */}
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <Typography variant="h6">Username</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleChange("username")}
                                                    value={values.username}
                                                    className={classes.inputField}>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        {/* pasword */}
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <Typography variant="h6">Password</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleChange("password")}
                                                    value={values.password}
                                                    className={classes.inputField}>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        {/* level */}
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>
                                                <Typography variant="h6">Role</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    select
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={handleChange("level")}
                                                    value={values.level}
                                                    className={classes.inputField}>
                                                    {arrayRole.map(item => (
                                                        <MenuItem key={item} value={item}>
                                                            {item}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* body card end */}
                                <Grid container justify="center">
                                    {/* button save */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={ev => saveData(ev)}
                                        className={classes.buttonSave}
                                        startIcon={<SaveIcon />}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
                {/* modal edit end */}
                {/* modal add start*/}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modalAdd}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={modalAdd}>
                        <div className={classes.paperAdmin}>
                            <Grid container justify="center" alignItems="center">
                                <Typography variant="h4">FORM TAMBAH ADMIN</Typography>
                                {/* body card start */}
                                <Grid container justify="center" className={classes.formContainer
                                }>
                                    {/* nama petugas */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Nama</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                onChange={handleChange("nama_petugas")}
                                                value={values.nama_petugas}
                                                className={classes.inputField}>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    {/* username */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Username</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                onChange={handleChange("username")}
                                                value={values.username}
                                                className={classes.inputField}>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    {/* pasword */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Password</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                onChange={handleChange("password")}
                                                value={values.password}
                                                className={classes.inputField}>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    {/* level */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Role</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                select
                                                variant="outlined"
                                                size="small"
                                                onChange={handleChange("level")}
                                                value={values.level}
                                                className={classes.inputField}>
                                                {arrayRole.map(item => (
                                                    <MenuItem key={item} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    {/* upload */}
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography variant="h6">Image</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <input
                                                required
                                                accept="image/*"
                                                className={classes.inputField}
                                                // className={classes.inputNone}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={event => setValues({
                                                    ...values, "image": event.
                                                        target.files[0]
                                                })}
                                            />
                                            {/* <label htmlFor="contained-button-file">
 <Button variant="contained" color
="primary" component="span" className={classes.inputField}>
 click to upload!
 </Button>
 </label> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* body card end */}
                            {/* button field */}
                            <Grid container justify="center">
                                {/* button save */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={ev => saveData(ev)}
                                    className={classes.buttonSave}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            </Grid>
                            {/* button field end */}
                        </div>
                    </Fade>
                </Modal>
                {/* modal add end */}
                {/* snackbar */}
                <Snackbar
                    open={snackAlert}
                    autoHideDuration={6000}
                    onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success">
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

