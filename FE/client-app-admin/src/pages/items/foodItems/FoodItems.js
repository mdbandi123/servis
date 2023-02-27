import * as React from "react";
import { useStore } from "../../../store/store";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CardActions, CardMedia, CardContent, Card } from "@mui/material/";
import FolderOffTwoToneIcon from "@mui/icons-material/FolderOffTwoTone";

import GlobalPurpleHeader4 from "../../../global/typographies/headers/PurpleHeader4";
import GlobalBlackHeader6 from "../../../global/typographies/headers/BlackHeader6";
import GlobalGreyBody2 from "../../../global/typographies/bodies/GreyBody2";
import GlobalPinkHeader6 from "../../../global/typographies/headers/PinkHeader6";
import GlobalBlackHeader3 from "../../../global/typographies/headers/BlackHeader3";
import DeleteItemModal from "../../../global/modals/DeleteItemModal";
import CreateItemModal from "../../../global/modals/CreateItemModal";
import UpdateItemModal from "../../../global/modals/UpdateItemModal";

function FoodItems() {
    const {menuItems, setMenuItems} = useStore();

    console.log(menuItems);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/menu_items/`)
            .then((res) => res.json())
            .then((data) => {
                setMenuItems(data.items);
            });
    }, []);

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

    const foodItemCardContainer = {
        maxWidth: 350,
    };

    const centerAlignment = {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    };

    const noItemIcon = {
        fontSize: "8em",
    };

    if (menuItems.length === 0) {
        return (
            <React.Fragment>
                <Box sx={pageTitleContainer}>
                    <GlobalPurpleHeader4 text="Food Items" />
                </Box>
                <Box mb={3}>
                    <CreateItemModal />
                </Box>
                <Grid2 container sx={centerAlignment} spacing={1}>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <FolderOffTwoToneIcon sx={noItemIcon} />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalBlackHeader3 text="No Food Item Found" />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalGreyBody2
                            text={`We couldn't find any Food Items. Try to create your own Food Item.`}
                        />
                    </Grid2>
                </Grid2>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Box sx={pageTitleContainer}>
                <GlobalPurpleHeader4 text="Food Items" />
            </Box>
            <Box mb={3}>
                <CreateItemModal />
            </Box>
            <Grid2 container spacing={3}>
                {menuItems.map((foodItemList) => (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} lx={2.4}>
                        <Card sx={foodItemCardContainer} key={foodItemList._id}>
                            <CardMedia
                                component="img"
                                alt={foodItemList.name}
                                height="140"
                                image={`${process.env.REACT_APP_BACKEND_URL}${foodItemList.image}`}
                            />
                            <CardContent>
                                <GlobalBlackHeader6 text={foodItemList.name} />
                                <GlobalGreyBody2
                                    text={foodItemList.category_name}
                                />
                                <GlobalPinkHeader6
                                    text={foodItemList.price.$numberDecimal}
                                />
                            </CardContent>
                            <CardActions>
                                <UpdateItemModal
                                    title={"Update " + foodItemList.name}
                                    id={foodItemList._id}
                                    image={foodItemList.image}
                                    alt={foodItemList.name}
                                    valueName={foodItemList.name}
                                    valuePrice={
                                        foodItemList.price.$numberDecimal
                                    }
                                    valueCateg={foodItemList.category_name}
                                    availability={foodItemList.is_available}
                                />
                                <DeleteItemModal
                                    context={
                                        "If you delete this item will be permanently gone. Are you sure you want to delete " +
                                        foodItemList.name +
                                        "?"
                                    }
                                    item_id={foodItemList._id}
                                />
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </React.Fragment>
    );
}

export default FoodItems;
