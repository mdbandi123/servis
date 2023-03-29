import * as React from "react";
import { useStore } from "../../store/store";

import { Box, Slide } from "@mui/material";
import { IconButton } from "@mui/material/";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import GlobalGreyBody1 from "../typographies/bodies/GreyBody1";
import GlobalBlackHeader5 from "../typographies/headers/BlackHeader5";
import GlobalIndigoTextButton from "../buttons/text/IndigoTextButton";
import GlobalOrangeTextButton from "../buttons/text/OrangeTextButton";
import GlobalTealContainedButton from "../buttons/contains/TealContainedButton";
import GlobalTealOutlinedButton from "../buttons/outlines/TealOutlinedButton";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConfirmPaymentModal(props) {
    const [openAlert, setOpenAlert] = React.useState(false);

    const [openConfirmPaymentModal, setOpenConfirmPaymentModal] =
        React.useState(false);
    const { user, paymentAlert, setPaymentAlert } = useStore();
    const confirmPaymentHandler = () => {
        setOpenConfirmPaymentModal(true);
    };

    const cancelConfirmPaymentHandler = () => {
        setOpenConfirmPaymentModal(false);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const confirmConfirmPaymentHandler = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/orders/session/${props.orderId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: user.Aa,
                    },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log(data.error);
                return;
            }
            console.log(data.message);
            setOpenConfirmPaymentModal(false);
        } catch (err) {
            console.log("Error ending session");
        }
        setOpenAlert(true);
        setPaymentAlert(true);
    };

    const closeIconButton = {
        position: "absolute",
        top: 0,
        right: 0,
    };

    const dialogAlignment = {
        alignItems: "center",
        display: "flex",
    };

    return (
        <React.Fragment>
            <GlobalTealContainedButton
                text={`Confirm Payment`}
                onClick={confirmPaymentHandler}
            />
            <Dialog
                keepMounted
                maxWidth="sm"
                fullWidth
                open={openConfirmPaymentModal}
                TransitionComponent={Transition}
                onClose={cancelConfirmPaymentHandler}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text={`Message Confirmation`} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <GlobalGreyBody1 text={props.context} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalTealOutlinedButton
                        text={`Cancel`}
                        onClick={cancelConfirmPaymentHandler}
                    />
                    <GlobalTealContainedButton
                        text={`Confirm`}
                        onClick={confirmConfirmPaymentHandler}
                    />
                </DialogActions>
            </Dialog>
            {/* <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert onClose={handleAlertClose} severity="success">
                    Payment Confirm Successfully!
                </Alert>
            </Snackbar> */}
        </React.Fragment>
    );
}

export default ConfirmPaymentModal;
