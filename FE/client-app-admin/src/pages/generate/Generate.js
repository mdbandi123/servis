import React, { useRef } from "react";
import { useStore } from "../../store/store";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Card, MenuItem, TextField, Stack, Box } from "@mui/material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material/";
import { grey } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import GlobalGreyBody1 from "../../global/typographies/bodies/GreyBody1";
import GlobalGreyBody3 from "../../global/typographies/bodies/GreyBody3";
import GlobalBlackBody1 from "../../global/typographies/bodies/BlackBody1";
import GlobalIndigoTextButton from "../../global/buttons/text/IndigoTextButton";
import GlobalOrangeTextButton from "../../global/buttons/text/OrangeTextButton";
import GlobalIndigoHeader4 from "../../global/typographies/headers/IndigoHeader4";
import GlobalBlackHeader5 from "../../global/typographies/headers/BlackHeader5";
import GlobalTealContainedButton from "../../global/buttons/contains/TealContainedButton";
import SlideDown from "../../animation/SlideDown";
import GlobalTealOutlinedButton from "../../global/buttons/outlines/TealOutlinedButton";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Generate() {
    const componentRef = useRef();

    const [url, setUrl] = React.useState(null);
    const [table, setTable] = React.useState(null);
    const [generate, setGenerate] = React.useState(null);
    const [openAlert, setOpenAlert] = React.useState(false);

    const { user } = useStore();

    const { setTableData } = useStore();

    let tableData = useStore((state) => state.tableData) || [];

    //filter table data to only those not in use
    tableData = tableData.filter((table) => table.in_use === false);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/tables/`, {
            method: "GET",
            headers: {
                Authorization: user.Aa,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTableData(data.tables);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [openConfirmModal, setOpenConfirmModal] = React.useState(false);

    const confirmHandler = () => {
        setOpenConfirmModal(true);
    };

    const cancelConfirmHandler = () => {
        setOpenConfirmModal(false);
    };

    const proceedConfirmHandler = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/create/${table}`, {
            method: "POST",
            headers: {
                Authorization: user.Aa,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUrl(data.url);
                setOpenConfirmModal(false);
                setGenerate(!generate);
            })
            .catch((error) => {
                console.log(error);
            });
        
        setOpenAlert(true);
    };

    const generateButtonEnableHandler = (e) => {
        setTable(e.target.value);
        setGenerate(!generate);
    }

    const styles = {
        qrCodeContainer: {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
        },

        qrCode: {
            width: "600px",
            height: "600px",
        },
    };

    const QRCodePrinter = (props) => {
        const componentRef = useRef();

        return (
            <React.Fragment>
                <Stack
                    direction="column"
                    spacing={1}
                    ref={componentRef}
                    sx={styles.qrCodeContainer}
                >
                    <Box>
                        <GlobalBlackBody1 text={props.table} />
                    </Box>
                    <Box>
                        <QRCode value={props.url} sx={styles.qrCode} />
                    </Box>
                    <Box>
                        <GlobalGreyBody3 text="Scan this QR Code to access Smart Menu." />
                    </Box>
                </Stack>
                <Stack
                    direction="column"
                    spacing={1}
                    sx={styles.qrCodeContainer}
                >
                    <Box pt={2}>
                        <ReactToPrint
                            trigger={() => (
                                <GlobalTealContainedButton text="Print" />
                            )}
                            content={() => componentRef.current}
                        />
                    </Box>
                </Stack>
            </React.Fragment>
        );
    };

    const dialogAlignment = {
        alignItems: "center",
        display: "flex",
    };

    const pageTitleContainer = {
        mb: 3,
        textAlign: {
            xs: "center",
            sm: "center",
            md: "left",
            lg: "left",
            lx: "left",
        },
    };

    const qrCardContainer = {
        p: 4,
    };

    const qrBtnContainer = {
        width: "100%",
    };

    const qrHeader = {
        textAlign: "center",
        mb: 2,
    };

    const qrCardResult = {
        height: 450,
    };

    const userTableIcon = {
        color: grey[800],
        fontSize: "2.5em",
    };

    const QrIcon = {
        fontSize: "8em",
        color: grey[500],
    };

    return (
        <SlideDown>
            <Box sx={pageTitleContainer}>
                <GlobalIndigoHeader4 text="Generate QR" />
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 item xs={12} sm={12} md={5} lg={5} lx={5}>
                    <Card sx={qrCardContainer}>
                        <Stack direction="column" spacing={3}>
                            <Box sx={qrHeader}>
                                <GlobalBlackHeader5 text="Create QR Code" />
                            </Box>
                            <Box>
                                <TextField
                                    color="warning"
                                    label="Table"
                                    helperText="Select Table"
                                    variant="filled"
                                    fullWidth
                                    select
                                    onChange={generateButtonEnableHandler}
                                >
                                    {tableData.map((tableList) => (
                                        <MenuItem
                                            key={tableList.table_name}
                                            value={tableList.table_name}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <Box>
                                                    <AccountCircleIcon
                                                        sx={userTableIcon}
                                                    />
                                                </Box>
                                                <Box>
                                                    {tableList.table_name}
                                                </Box>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box sx={qrBtnContainer}>
                                <GlobalTealContainedButton
                                    sx={qrBtnContainer}
                                    text="Generate"
                                    onClick={confirmHandler}
                                    disabled={!generate}
                                />
                            </Box>
                        </Stack>
                    </Card>
                </Grid2>
                <Grid2 item xs={12} sm={12} md={7} lg={7} lx={7}>
                    <Card sx={[qrCardContainer, qrCardResult]}>
                        <Box sx={qrHeader}>
                            {url && table ? (
                                <>
                                    <Stack direction="column" spacing={3}>
                                        <Box>
                                            <GlobalBlackHeader5 text="Generated QR Code:" />
                                        </Box>
                                        <Box>
                                            <QRCodePrinter
                                                table={table}
                                                url={url}
                                            />
                                        </Box>
                                    </Stack>
                                </>
                            ) : (
                                <>
                                    <Stack direction="column" spacing={3}>
                                        <Box>
                                            <GlobalBlackHeader5 text="Generated QR Code:" />
                                        </Box>
                                        <Box>
                                            <Stack
                                                direction="column"
                                                spacing={1}
                                                sx={styles.qrCodeContainer}
                                            >
                                                <Box>
                                                    <GlobalBlackBody1 text="No QR code generate" />
                                                </Box>
                                                <Box>
                                                    <QrCodeIcon sx={QrIcon} />
                                                </Box>
                                                <Box>
                                                    <GlobalGreyBody3 text="Please select user and generate QR code" />
                                                </Box>
                                                <Box pt={2}>
                                                    <GlobalTealContainedButton
                                                        text="Print"
                                                        disabled={true}
                                                    />
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </>
                            )}
                        </Box>
                    </Card>
                </Grid2>
            </Grid2>
            <Dialog
                keepMounted
                maxWidth="sm"
                fullWidth
                open={openConfirmModal}
                TransitionComponent={Transition}
                onClose={cancelConfirmHandler}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text="Generate QR Code" />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <GlobalGreyBody1 text={<>
                            <Grid2 container>
                                Are you sure you want to Generate QR Code for
                                <GlobalBlackBody1 text={table} sx={{ ml: 0.5, fontWeight: 'bold' }} />?
                            </Grid2> </>
                        } />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalTealOutlinedButton
                        text="Cancel"
                        onClick={cancelConfirmHandler}
                    />
                    <GlobalTealContainedButton
                        text="Confirm"
                        onClick={proceedConfirmHandler}
                    />
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert onClose={handleAlertClose} severity="success">
                    Table Generate Successfully!
                </Alert>
            </Snackbar>
        </SlideDown>
    );
}

export default Generate;
