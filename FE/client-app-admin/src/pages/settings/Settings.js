import React from 'react';
import { useStore } from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, CardContent, Box, IconButton, Tooltip } from '@mui/material';
import { teal, grey } from '@mui/material/colors';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import GlobalIndigoHeader4 from '../../global/typographies/headers/IndigoHeader4';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import CreateUserModal from '../../global/modals/CreateUserModal';
import DeleteUserModal from '../../global/modals/DeleteUserModal';
import UpdateUserModal from '../../global/modals/UpdateUserModal';
import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import SlideDown from '../../animation/SlideDown';

function Settings() {
    const { user, setTableData } = useStore();

    const UserList = useStore(state => state.tableData) || [];

    React.useEffect(() => {
        document.title = 'Settings';

        fetch(`${process.env.REACT_APP_BACKEND_URL}/tables/`, {
            method: 'GET',
            headers: {
                'Authorization': user.Aa,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTableData(data.tables)
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    const pageTitleContainer = {
        mb: 3,
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    };

    const qrHeader = {
        textAlign: 'left',
        mb: 2,
        ml: 1
    };

    const settingsContainer = {
        with: '100%',
        pt: 3,
        pb: 1,
        pl: 1,
        pr: 1,
        backgroundColor: grey[100]
    };

    const userTableCard = {
        m: 1
    };

    const cardActionArea = {
        p: 3,
    }

    const cardActionArea2 = {
        p: 4,
    }

    const actionIcon = {
        color: teal[400]
    };

    const actionAddIcon = {
        color: grey[700],
        fontSize: '1.3em'
    };

    const tableUserIcon = {
        color: grey[700],
        fontSize: '2em'
    };

    const tableName = {
        fontSize: '1em',
        fontWeight: 'bold'
    }

    return (
        <SlideDown>
            <Box sx={pageTitleContainer}>
                <GlobalIndigoHeader4 text='Settings' />
            </Box>
            <Card sx={settingsContainer}>
                <Box sx={qrHeader}>
                    <GlobalBlackHeader5 text='Table Users' />
                </Box>
                <Grid2 container >
                     <Grid2 item xs={12} sm={12} md={6} lg={4} lx={4}>
                        <Card sx={userTableCard}>
                            <CreateUserModal>
                                <CardContent sx={cardActionArea}>
                                    <Grid2 container justifyContent='center' alignItems='center'>
                                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                            <Grid2 container justifyContent='center'>
                                                <Grid2 item>
                                                    <Tooltip title='Add User'>
                                                        <IconButton>
                                                            <AddCircleOutlineRoundedIcon sx={actionAddIcon} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid2>
                                            </Grid2>
                                        </Grid2>
                                    </Grid2>
                                </CardContent>
                            </CreateUserModal>
                        </Card>
                    </Grid2>
                    {UserList.map((userList) => (
                    <Grid2 item xs={12} sm={12} md={6} lg={4} lx={4}>
                        <Card sx={userTableCard}>
                            <CardContent sx={cardActionArea2}>
                                <Grid2 container justifyContent='center' alignItems='center'>
                                    <Grid2 item xs={8} sm={8} md={8} lg={8} lx={8}>
                                        <Grid2 container alignItems='center' spacing={2}>
                                            <Grid2 item>
                                                <AccountCircleIcon sx={tableUserIcon} />
                                            </Grid2>
                                            <Grid2 item>
                                                <GlobalBlackBody1 sx={ tableName } text={userList.table_name} />
                                            </Grid2>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 item xs={4} sm={4} md={4} lg={4} lx={4}>
                                        <Grid2 container justifyContent='flex-end'>
                                            <Grid2 item>
                                                <Tooltip title='Delete'>
                                                    <IconButton>
                                                        <DeleteUserModal tableName={userList.table_name} sx={actionIcon} context={`Are you sure do you want to delete Table ${userList.table_name}?`} message={`Delete Table ${userList.table_name}`} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid2>
                                            <Grid2 item>
                                                <Tooltip title='Edit'>
                                                    <IconButton>
                                                        <UpdateUserModal tableName={userList.table_name} sx={actionIcon} title={`Update Table ${userList.table_name}`} defaultName={userList.table_name} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid2>
                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>
                    </Grid2>
                    ))}
                </Grid2>
            </Card>
        </SlideDown>
    );
};

export default Settings;