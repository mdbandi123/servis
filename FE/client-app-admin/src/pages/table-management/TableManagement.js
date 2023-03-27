import React from 'react';
import { useStore } from '../../store/store';

import { motion, AnimatePresence } from 'framer-motion';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, CardContent, Box, IconButton, Tooltip } from '@mui/material';
import { teal, grey } from '@mui/material/colors';
import FolderOffTwoToneIcon from '@mui/icons-material/FolderOffTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import GlobalIndigoHeader4 from '../../global/typographies/headers/IndigoHeader4';
import CreateUserModal from '../../global/modals/CreateUserModal';
import DeleteUserModal from '../../global/modals/DeleteUserModal';
import UpdateUserModal from '../../global/modals/UpdateUserModal';
import GlobalBlackBody1 from '../../global/typographies/bodies/BlackBody1';
import SlideDown from '../../animation/SlideDown';
import GlobalBlackHeader3 from '../../global/typographies/headers/BlackHeader3';
import GlobalGreyBody2 from '../../global/typographies/bodies/GreyBody2';

import TableMngmntSkeleton from '../../skeletons/TableMananagementSkeleton';

function TableManagement() {
    const { user, setTableData } = useStore();

    const [loading, setLoading] = React.useState(true);

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
                setTimeout(() => {
                    setLoading(false)
                }, 3000)
                
                setTableData(data.tables)
                // setLoading(false);
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

    const userTableCard = {
        m: 1
    };

    const cardActionArea2 = {
        p: 4,
    }

    const actionIcon = {
        color: teal[400]
    };

    const tableUserIcon = {
        color: grey[700],
        fontSize: '2em'
    };

    const tableName = {
        fontSize: '1em',
        fontWeight: 'bold'
    };

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    };

    const noItemIcon = {
        fontSize: '8em',
    };

    if (UserList.length === 0) {
        return (
            <SlideDown>
                <Box sx={pageTitleContainer}>
                    <GlobalIndigoHeader4 text='Table Management' />
                </Box>
                <Box sx={qrHeader}>
                    <CreateUserModal />
                </Box>
                    {
                        loading ? (
                            <Grid2 container>
                                <TableMngmntSkeleton />
                            </Grid2>
                        ) : (
                            <Grid2 container sx={centerAlignment} >
                                <Grid2 container sx={centerAlignment} spacing={1}>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <FolderOffTwoToneIcon sx={noItemIcon} />
                                    </Grid2>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <GlobalBlackHeader3 text={`No Table Found`} />
                                    </Grid2>
                                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                        <GlobalGreyBody2
                                            text={`We couldn't find any Table. Please create Table.`}
                                        />
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                        )
                    }
            </SlideDown>
        );
    }

    return (
        <SlideDown>
            <Box sx={pageTitleContainer}>
                <GlobalIndigoHeader4 text='Table Management' />
            </Box>
            <Box sx={qrHeader}>
                <CreateUserModal/>
            </Box>
            <Grid2 container >
                {
                    loading ? (
                        <TableMngmntSkeleton />
                    ) : (
                        <>
                            {UserList.map((userList) => (
                                <Grid2 item xs={12} sm={12} md={6} lg={4} lx={4}>
                                    <AnimatePresence>
                                        <motion.div layout initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}>
                                            <Card sx={userTableCard}>
                                                <CardContent sx={cardActionArea2}>
                                                    <Grid2 container justifyContent='center' alignItems='center'>
                                                        <Grid2 item xs={8} sm={8} md={8} lg={8} lx={8}>
                                                            <Grid2 container alignItems='center' spacing={2}>
                                                                <Grid2 item>
                                                                    <AccountCircleIcon sx={tableUserIcon} />
                                                                </Grid2>
                                                                <Grid2 item>
                                                                    <GlobalBlackBody1 sx={tableName} text={userList.table_name} />
                                                                </Grid2>
                                                            </Grid2>
                                                        </Grid2>
                                                        <Grid2 item xs={4} sm={4} md={4} lg={4} lx={4}>
                                                            <Grid2 container justifyContent='flex-end'>
                                                                <Grid2 item>
                                                                    <Tooltip title='Delete'>
                                                                        <IconButton>
                                                                            <DeleteUserModal tableName={userList.table_name} sx={actionIcon} message={`Delete Table`}
                                                                                context={<>
                                                                                    <Grid2 container>
                                                                                        Are you sure you want to delete
                                                                                        <GlobalBlackBody1 text={userList.table_name} sx={{ ml: 0.5, fontWeight: 'bold' }} />?
                                                                                    </Grid2>
                                                                                </>}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Grid2>
                                                                <Grid2 item>
                                                                    <Tooltip title='Update'>
                                                                        <IconButton>
                                                                            <UpdateUserModal tableName={userList.table_name} sx={actionIcon} title={`Update Table: ${userList.table_name}`} defaultName={userList.table_name} update={userList.table_name} />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Grid2>
                                                            </Grid2>
                                                        </Grid2>
                                                    </Grid2>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </AnimatePresence>
                                </Grid2>
                            ))}                    
                        </>
                    )
                }
            </Grid2>
        </SlideDown>
    );
};

export default TableManagement;