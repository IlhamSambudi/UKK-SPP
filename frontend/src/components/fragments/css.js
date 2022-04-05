import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    // home start
    headerContainerHome: {
        minHeight: "100vh",

    },
    profileContainer: {
        minHeight: "70vh",
        background: "#7CFF6B",
        marginTop: "5vh",
        marginBottom: "5vh"
    },
    headerImg: {
        maxWidth: "90%",
    },
    profileImg: {
        maxWidth: "40vh",
        maxHeight: "40vh",
        margin: "10%",
    },
    profileCard: {
        minWidth: "55vw",
        minHeight: "50vh"
    },
    texth1: {
        fontSize: 50,
    },

    // login
    cardLogin: {
        minWidth: 320,
        minHeight: 350,
    },
    containerLogin: {
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #0A8270 20%, #7CFF6B 90%)',
    },
    buttonLogin: {
        background: '#0A8270',
        color: '#ffff',
        borderRadius: '30px',
        minWidth: 100
    },
    // header
    headerContainer: {
        minHeight: "50vh",
    },
    bodyContainer: {
        minHeight: "100vh",
        marginTop: "-10rem",
    },
    headerCard: {
        maxWidth: "95vw",
        minHeight: "40vh",
        minWidth: "95vw",
        background: 'linear-gradient(45deg, #7CFF6B 20%, #0A8270 90%)',
    },
    headerText: {
        color: "white"
    },
    bodyContainerSiswa: {
        marginTop: "-10rem",
        marginBottom: "3rem"
    },
    // table (histori)
    tableBody: {
        maxWidth: "95vw",
        fontSize: "16px",
    },
    // table spp
    columnId: {
        minWidth: "5vw",
        fontSize: "16px"
    },
    columnTahun: {
        minWidth: "25vw",
        fontSize: "16px"
    },
    columnNominal: {
        minWidth: "25vw",
        fontSize: "16px"
    },
    columnAksi: {
        minWidth: "5vw",
        fontSize: "16px"
    },
    // table kelas
    columnKelas: {
        minWidth: "15vw",
        fontSize: "16px"
    },
    columnKompetensi: {
        minWidth: "25vw",
        fontSize: "16px"
    },
    // card siswa
    bodyCardSiswa: {
        minHeight: "20vh",
        maxHeight: "16vh",
        maxWidth: "95vw",
        marginTop: "2vh",
        marginBottom: "0rem"
    },
    bodyImgSiswa: {
        // maxWidth: "15vh",
        // maxHeight: "15vh",
        height: 100,
        width: 100,
        borderRadius: 10,
        margin: "2vh",
        objectFit:"cover"
    },
    // card admin
    bodyCardAdmin: {
        marginTop: "5px",
        minHeight: "50vh",
        maxWidth: "95vw"
    },
    bodyImgAdmin: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
        margin: "2vh",
        objectFit:"cover"
    },
    // button
    button: {
        minWidth: "110px",
        margin: "5px",
        fontSize: "12px"
    },
    buttonInfo: {
        minWidth: "110px",
        margin: "5px",
        fontSize: "12px",
        backgroundColor: "#ffc107"
    },
    footerContainer: {
        position: "fixed",
        bottom: "3vh",
        right: "3vh",
    },
    footerButton: {
        backgroundColor: "#0275d8",
        '&:hover': {
            backgroundColor: "#292b2c",
        },
    },
    buttonAdd: {
        minHeight: "100%",
        minWidth: "100%",
        backgroundColor: "#0275d8",
        fontSize: "12px",
        '&:hover': {
            backgroundColor: "#292b2c",
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperHistori: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "40vh",
        maxWidth: "50vw",
        
    },
    paperSpp: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "30vh",
        maxWidth: "50vw",
    },
    paperSiswa: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "40vh",
        maxWidth: "50vw",
    },
    paperKelas: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "30vh",
        maxWidth: "50vw",
    },
    paperAdmin: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "50vh",
        maxWidth: "50vw",
    },
    inputField: {
        minWidth: "100%",
        margin: "5px"
    },
    formContainer: {
        margin: "2vh"
    },
    infoContainer: {
        marginLeft: "7vw"
    },
    buttonSave: {
        margin: "2vh",
        backgroundColor: "#0275d8",
        '&:hover': {
            backgroundColor: "#292b2c",
        },
        minWidth: "120px",
        minHeight: "2vh",
        fontSize: "16px",
        borderRadius: "100px"
    },
    inputNone: {
        display: 'none'
    },
}))
export { useStyles }