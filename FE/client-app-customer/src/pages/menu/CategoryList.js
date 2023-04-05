import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../store/store";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
    Box,
    Stack,
    Card,
    CardContent,
    CardMedia,
    IconButton,
} from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ExtensionOffIcon from "@mui/icons-material/ExtensionOff";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import GlobalGreyContainedButton from "../../global/buttons/contains/GreyContainedButton";
import GlobalBlackHeader6 from "../../global/typographies/headers/BlackHeader6";
import GlobalBlackHeader4 from "../../global/typographies/headers/BlackHeader4";
import GlobalOrangeHeader6 from "../../global/typographies/headers/OrangeHeader6";
import GlobalGreyBody2 from "../../global/typographies/bodies/GreyBody2";
import GlobalTealContainedButton from "../../global/buttons/contains/TealContainedButton";
import GlobalBlackHeader5 from "../../global/typographies/headers/BlackHeader5";
import FadeIn from "../../global/animation/FadeIn";

import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import CategorySkeleton from "../../skeletons/CategoryListSkeleton";

function CategoryList() {
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const { category_name } = useParams();
    const [StartersData, setStartersData] = React.useState([]);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openNotAlert, setOpenNotAlert] = React.useState(false);

    const { order_id } = useStore();

    React.useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/menu_items/items/${category_name}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // console.log(data.items);
                    // setTimeout(() => {
                    //     setLoading(false)
                    // }, 3000);
                    setStartersData(data.items);
                    setLoading(false);
                } else {
                    console.log(data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const addToCart = (item_id) => {
        console.log(item_id);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/item/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item_id: item_id,
                quantity: 1,
                order_id: order_id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.message);
                } else {
                    console.log(data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setOpenAlert(true);
    };

    const notAvailable = () => {
        setOpenNotAlert(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const handleNotClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotAlert(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const notAction = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleNotClose} >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const pageContainer = {
        pb: 8,
        pr: 1,
        pl: 1,
        pt: 2,
    };

    const headerPage = {
        pb: 2,
        textAlign: {
            xs: "left",
            sm: "left",
            md: "center",
            lg: "center",
            lx: "center",
        },
    };

    const cardContainer = {
        minWidth: 160,
    };

    const cardContent = {
        textAlign: "center",
    };

    const itemNamePrice = {
        fontSize: "1.1em",
    };

    const centerAlignment = {
        pt: 3,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    };

    const noItemIcon = {
        fontSize: "6em",
        color: grey[600],
    };

    const addBtn = {
        width: "100%",
    };

    const categoryNamePriceContainer = {
        height: 90,
    };

    const uploadImageIcon = {
        fontSize: '8em',
        color: grey[600],
        display: 'flex',
    };

    if (StartersData.length === 0) {
        return (
            <FadeIn>
                <Box sx={pageContainer}>
                    <Stack
                        sx={headerPage}
                        direction="row"
                        alignItems="center"
                        alignContent="center"
                        spacing={1}
                    >
                        <IconButton onClick={() => navigate("/")}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                        <GlobalBlackHeader4 text={category_name} />
                    </Stack>
                    {
                        loading ? (
                            <Grid2 container justifyContent="start">
                                <Grid2 item>
                                    <Grid2 container justifyContent="start" spacing={1}>
                                        <CategorySkeleton />
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                        ) : (
                            <Grid2 container sx={centerAlignment} spacing={1}>
                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                    <ExtensionOffIcon sx={noItemIcon} />
                                </Grid2>
                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                    <GlobalBlackHeader5
                                        text={`No ${category_name} Found`}
                                    />
                                </Grid2>
                                <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                                    <GlobalGreyBody2
                                        text={`We couldn't find any ${category_name}. Admin might not have created yet.`}
                                    />
                                </Grid2>
                            </Grid2>
                        )
                    } 
                </Box>
            </FadeIn>
        );
    }

    return (
        <FadeIn>
            <Box sx={pageContainer}>
                <Stack
                    sx={headerPage}
                    direction="row"
                    alignItems="center"
                    alignContent="center"
                    spacing={1}
                >
                    <IconButton onClick={() => navigate("/")}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <GlobalBlackHeader4 text={category_name} />
                </Stack>
                <Grid2 container justifyContent="start">
                    <Grid2 item>
                        <Grid2 container justifyContent="start" spacing={1}>
                            {
                                loading ? (
                                    <>
                                        <CategorySkeleton />
                                    </>
                                ) : (
                                    <>
                                        {StartersData.map((startersList) => (
                                            <Grid2 item xs={6} sm={6} md={4} lg={3} lx={3}>
                                                
                                                <Card sx={cardContainer}>
                                                    <CardMedia
                                                        sx={{ filter: startersList.is_available ? 'grayscale(0)' : 'grayscale(1)' }}
                                                        component="img"
                                                        height="140"
                                                        image={`${process.env.REACT_APP_BACKEND_URL}${startersList.image}`}
                                                        alt={startersList.name}
                                                    />
                                                    <CardContent sx={cardContent}>
                                                        <Stack direction="column" spacing={2} >
                                                            <Box sx={ categoryNamePriceContainer } >
                                                                <GlobalBlackHeader6
                                                                    sx={[itemNamePrice, { color: startersList.is_available ? grey[900] : grey[500] }]}
                                                                    text={startersList.name}
                                                                />
                                                                <GlobalOrangeHeader6
                                                                    sx={[itemNamePrice, { color: startersList.is_available ? orange[700] : grey[500] }]}
                                                                    text={ "₱" + startersList.price .$numberDecimal }
                                                                />
                                                            </Box>
                                                            <Box>
                                                                {
                                                                    startersList.is_available ? (
                                                                        <>
                                                                            <GlobalTealContainedButton
                                                                                text="Add"
                                                                                sx={addBtn}
                                                                                startIcon={<AddRoundedIcon />}
                                                                                onClick={() => addToCart(startersList._id)}
                                                                            />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <GlobalGreyContainedButton
                                                                                text="Add"
                                                                                sx={addBtn}
                                                                                startIcon={<AddRoundedIcon />}
                                                                                onClick={() => notAvailable()}
                                                                            />
                                                                        </>
                                                                    )
                                                                }
                                                            </Box>
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                            </Grid2>
                                        ))}
                                    </>
                                )
                            }
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ mb: 4 }}
                open={openAlert}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Food added to your cart!"
                action={action}
            />
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ mb: 4 }}
                open={openNotAlert}
                autoHideDuration={2000}
                onClose={handleNotClose}
                message="Food is not available!"
                action={notAction}
            />
        </FadeIn>
    );
}

export default CategoryList;
