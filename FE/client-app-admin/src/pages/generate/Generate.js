import React, {useRef} from 'react';
import { useStore } from '../../store/store';
import QRCode from 'qrcode.react';
import ReactToPrint from 'react-to-print';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Avatar, Card, MenuItem, TextField, Stack, Box } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material/';

import GlobalGreyBody1 from '../../global/typographies/bodies/GreyBody1';
import GlobalBlueTextButton from '../../global/buttons/text/BlueTextButton';
import GlobalRedTextButton from '../../global/buttons/text/RedTextButton';
import GlobalPurpleHeader4 from '../../global/typographies/headers/PurpleHeader4';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalBlueContainedButton from '../../global/buttons/contains/BlueContainedButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function Generate() {
    const componentRef = useRef();

    const [url, setUrl] = React.useState(null);
    const [table, setTable] = React.useState(null);

    const { user } = useStore();

    const {TableData, setTableData} = useStore();

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
          width: '20%',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '10px',
        },
      
        qrCode: {
          width: '60px',
          height: '60px',
        },
      };
    
    const QRCodePrinter = (props) => {
        const componentRef = useRef();
      
        return (
          <div>
            <div ref={componentRef} style={styles.qrCodeContainer}>
            <p>{props.table}</p>
                <QRCode value={props.url} style={styles.qrCode}/>
                <p>Scan this QR Code to access online ordering on your device.</p>
            </div>
            
            <ReactToPrint
              trigger={() => <button>Print QR Code</button>}
              content={() => componentRef.current}
            />
          </div>
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

    return (
        <React.Fragment>
            <Box sx={pageTitleContainer}>
                <GlobalPurpleHeader4 text='Generate' />
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 item xs={12} sm={12} md={4} lg={4} lx={4}>
                    <Card sx={ qrCardContainer }>
                        <Stack direction='column' spacing={3}>
                            <Box sx={ qrHeader }>
                                <GlobalBlackHeader5 text='Create QR Code' />
                            </Box>
                            <Box>
                                <TextField color='primary' label='User' helperText='Select User' variant='filled' fullWidth select onChange={(e) => setTable(e.target.value)}>
                                    {TableData.map((tableList) => (
                                        <MenuItem key={tableList.table_name} value={tableList.table_name}>
                                            <Stack direction='row' alignItems='center' spacing={1}>
                                                <Box>
                                                    <Avatar></Avatar>
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
                <Grid2 item xs={12} sm={12} md={8} lg={8} lx={8}>
                    <Card sx={qrCardContainer}>
                        <Box sx={qrHeader}>
                            {url && table && <>
                                <GlobalBlackHeader5 text='Generated QR Code:' />
                                <QRCodePrinter table={table} url={url}/>
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