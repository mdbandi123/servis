import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Box, Slide } from '@mui/material';
import { IconButton, Button } from '@mui/material/';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { Stack, TextField } from '@mui/material/';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalGreyBody1 from '../typographies/bodies/GreyBody1';
import GlobalBlackHeader5 from '../typographies/headers/BlackHeader5';
import GlobalRedTextButton from '../buttons/text/RedTextButton';
import GlobalBlueTextButton from '../buttons/text/BlueTextButton';
import GlobalBlueContainedButton from '../buttons/contains/BlueContainedButton';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function GenerateDatePickerModal(props) {
    const [openGenerateReportModal, setOpenGenerateReportModal] = React.useState(false);

    const GenerateReportHandler = () => {
        setOpenGenerateReportModal(true);
    };

    const cancelGenerateReportHandler = () => {
        setOpenGenerateReportModal(false);
    };

    const confirmGenerateReportHandler = () => {
        setOpenGenerateReportModal(false);
    };

    const closeIconButton = {
        position: 'absolute',
        top: 0,
        right: 0
    };

    const dialogAlignment = {
        alignItems: 'center',
        display: 'flex'
    };

    return (
        <React.Fragment>
            <GlobalBlueContainedButton text='Generate' onClick={GenerateReportHandler} />
            <Dialog keepMounted maxWidth='sm' fullWidth open={openGenerateReportModal} TransitionComponent={Transition} onClose={cancelGenerateReportHandler} aria-describedby='alert-dialog-slide-description'>
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text='Set Date Range To Generate Report' />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton >
                        <CloseIcon onClick={cancelGenerateReportHandler} />
                    </IconButton>
                </Box>
                <DialogContent >
                    <DialogContentText id='alert-dialog-slide-description'>
                        <Stack direction='row' justifyContent="space-between">
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker label="Start" slotProps={{ textField: { helperText: 'MM / DD / YYYY' } }} />
                                </LocalizationProvider>
                            </Box>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker label="End" slotProps={{ textField: { helperText: 'MM / DD / YYYY' } }} />
                                </LocalizationProvider>
                            </Box>
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton text='Cancel' onClick={cancelGenerateReportHandler} />
                    <GlobalBlueTextButton text='Generate' onClick={confirmGenerateReportHandler} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default GenerateDatePickerModal;