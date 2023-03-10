import React, {useRef} from 'react';
import { useStore } from '../../store/store';
import QRCode from 'qrcode.react';
import ReactToPrint from 'react-to-print';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Avatar, Card, MenuItem, TextField, Stack, Box } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material/';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import GlobalGreyBody1 from '../../global/typographies/bodies/GreyBody1';
import GlobalGreyBody3 from '../../global/typographies/bodies/GreyBody3';
import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import GlobalBlueTextButton from '../../global/buttons/text/BlueTextButton';
import GlobalRedTextButton from '../../global/buttons/text/RedTextButton';
import GlobalPurpleHeader4 from '../../global/typographies/headers/PurpleHeader4';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalBlueContainedButton from '../../global/buttons/contains/BlueContainedButton';
import { grey } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function Generate() {
    const componentRef = useRef();

    const [url, setUrl] = React.useState(null);
    const [table, setTable] = React.useState(null);

    const { user } = useStore();

    const {tableData, setTableData} = useStore();

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/tables/`, {
            method: 'GET',
            headers: {
                "Authorization": user.Aa,
            },
        })
            .then(response => response.json())
            .then(data => {
                setTableData(data.tables);
            }
        ).catch((error) => {
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
            method: 'POST',
            headers: {
                "Authorization": user.Aa,
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            setUrl(data.url);
            setOpenConfirmModal(false);
        }
        ).catch((error) => {
            console.log(error);
        });
    };

    const styles = {
        qrCodeContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
        },
      
        qrCode: {
          width: '600px',
          height: '600px'
        },
      };
    
    const QRCodePrinter = (props) => {
        const componentRef = useRef();
      
        return (
          <React.Fragment>
            <Stack direction='column' spacing={1} ref={componentRef} sx={styles.qrCodeContainer}>
                <Box>
                    <GlobalBlackBody1 text={props.table} />
                </Box>
                <Box>
                    <QRCode value={props.url} sx={styles.qrCode} />
                </Box>
                <Box>
                    <GlobalGreyBody3 text='Scan this QR Code to access online ordering on your device.' />
                </Box>
            </Stack>
            <Box pt={2}>
                    <ReactToPrint
                    trigger={() => <GlobalBlueContainedButton text='Print' />}
                    content={() => componentRef.current}
                    />
                </Box>
          </React.Fragment>
        );
      };

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    };

    const pageTitleContainer = {
        mb: 3,
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    };

    const qrCardContainer = {
        p: 4
    };

    const qrBtnContainer = {
        width: '100%'
    };

    const qrHeader = {
        textAlign: 'center',
        mb: 2
    };

    const qrCardResult = {
        height: 450,
    };

    const userTableIcon = {
        color: grey[800],
        fontSize: '2.5em'
    }

    return (
        <React.Fragment>
            <Box sx={pageTitleContainer}>
                <GlobalPurpleHeader4 text='Generate' />
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 item xs={12} sm={12} md={5} lg={5} lx={5}>
                    <Card sx={ qrCardContainer }>
                        <Stack direction='column' spacing={3}>
                            <Box sx={ qrHeader }>
                                <GlobalBlackHeader5 text='Create QR Code' />
                            </Box>
                            <Box>
                                <TextField color='warning' label='User' helperText='Select User' variant='filled' fullWidth select onChange={(e) => setTable(e.target.value)}>
                                    {tableData.map((tableList) => (
                                        <MenuItem key={tableList.table_name} value={tableList.table_name}>
                                            <Stack direction='row' alignItems='center' spacing={1}>
                                                <Box>
                                                    <AccountCircleIcon sx={userTableIcon} />
                                                </Box>
                                                <Box>
                                                    {tableList.table_name}
                                                </Box>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box sx={ qrBtnContainer }>
                                <GlobalBlueContainedButton sx={qrBtnContainer} text='Generate' variant='{props.variant}' onClick={confirmHandler} />
                            </Box>
                        </Stack>
                    </Card>
                </Grid2>
                <Grid2 item xs={12} sm={12} md={7} lg={7} lx={7}>
                    <Card sx={[qrCardContainer, qrCardResult]}>
                        <Box sx={qrHeader}>
                            {url && table && <>
                                <Stack direction='column' spacing={3}>
                                    <Box>
                                        <GlobalBlackHeader5 text='Generated QR Code:' />
                                    </Box>
                                    <Box>
                                        <QRCodePrinter table={table} url={url} />
                                    </Box>
                                </Stack>
                            </>}
                        </Box>
                    </Card>
                </Grid2>
            </Grid2>
            <Dialog keepMounted maxWidth='sm' fullWidth open={openConfirmModal} TransitionComponent={Transition} onClose={cancelConfirmHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text='Message Confirmation' />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        <GlobalGreyBody1 text='Are you sure do you want to Generate QR Code?' />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={cancelConfirmHandler} />
                    <GlobalBlueTextButton text='Confirm' onClick={proceedConfirmHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Generate;