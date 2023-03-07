import React from 'react';
import { UserList } from './data/Users';
import { useStore } from '../../store/store';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Avatar, Card, CardContent, Box, IconButton } from '@mui/material';
import { purple, grey } from '@mui/material/colors';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import GlobalPurpleHeader4 from '../../global/typographies/headers/PurpleHeader4';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import CreateUserModal from '../../global/modals/CreateUserModal';
import DeleteUserModal from '../../global/modals/DeleteUserModal';
import UpdateUserModal from '../../global/modals/UpdateUserModal';

function Settings() {
    const { user } = useStore();

    // const [UserList, setUserList] = useStore([]);

    React.useEffect(() => {
        document.title = 'Settings';

        fetch(`${process.env.REACT_APP_BACKEND_URL}/tables/`, {
            method: 'GET',
            headers: {
                "Authorization": user.Aa,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.items);
                // setUserList(data.tables)
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
        with: '80%',
        p: 3,
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
        color: purple[900]
    };

    const actionAddIcon = {
        color: grey[700],
        fontSize: '1.3em'
    }

    return (
        <React.Fragment>
            <Box sx={pageTitleContainer}>
                <GlobalPurpleHeader4 text='Settings' />
            </Box>
            <Card sx={settingsContainer}>
                <Box sx={qrHeader}>
                    <GlobalBlackHeader5 text='Users' />
                </Box>
                <Grid2 container >
                     <Grid2 item xs={12} sm={12} md={6} lg={4} lx={4}>
                        <Card sx={userTableCard}>
                            <CreateUserModal>
                                <CardContent sx={cardActionArea}>
                                    <Grid2 container justifyContent="center" alignItems="center">
                                        <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                            <Grid2 container justifyContent='center'>
                                                <Grid2 item>
                                                    <IconButton>
                                                        <AddCircleOutlineRoundedIcon sx={actionAddIcon} />
                                                    </IconButton>
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
                                <Grid2 container justifyContent="center" alignItems="center">
                                    <Grid2 item xs={8} sm={8} md={8} lg={8} lx={8}>
                                        <Grid2 container alignItems="center" spacing={2}>
                                            <Grid2 item>
                                                <Avatar />
                                            </Grid2>
                                            <Grid2 item>
                                                <GlobalBlackHeader6 text={'Table ' + userList.tableName.toUpperCase()} />
                                            </Grid2>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 item xs={4} sm={4} md={4} lg={4} lx={4}>
                                        <Grid2 container justifyContent='flex-end'>
                                            <Grid2 item>
                                                <IconButton>
                                                    <DeleteUserModal sx={actionIcon} context={`Are you sure do you want to delete Table ${userList.tableName.toUpperCase()}?`} message={`Delete Table ${userList.tableName.toUpperCase()}`} />
                                                </IconButton>
                                            </Grid2>
                                            <Grid2 item>
                                                <IconButton>
                                                    <UpdateUserModal sx={actionIcon} title={`Update Table ${userList.tableName.toUpperCase()}`} defaultName={userList.tableName.toUpperCase()} />
                                                </IconButton>
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
        </React.Fragment>
    );
};

export default Settings;