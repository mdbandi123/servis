import * as React from "react";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CardActions, CardMedia, CardContent, Card } from "@mui/material/";
import FolderOffTwoToneIcon from "@mui/icons-material/FolderOffTwoTone";

import GlobalPurpleHeader4 from "../../../global/typographies/headers/PurpleHeader4";
import GlobalBlackHeader6 from "../../../global/typographies/headers/BlackHeader6";
import GlobalBlackHeader3 from "../../../global/typographies/headers/BlackHeader3";
import GlobalGreyBody2 from "../../../global/typographies/bodies/GreyBody2";
import DeleteItemModal from "../../../global/modals/DeleteItemModal";
import CreateCategModal from "../../../global/modals/CreateCategModal";
import UpdateCategModal from "../../../global/modals/UpdateCategModal";

function CategoryItems() {
    const [CategoryData, setCategoryItems] = React.useState([]);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCategoryItems(data.categories);
            })
            .catch((error) => console.error(error));
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

    if (CategoryData.length === 0) {
        return (
            <React.Fragment>
                <Box sx={pageTitleContainer}>
                    <GlobalPurpleHeader4 text="Category Items" />
                </Box>
                <Box mb={3}>
                    <CreateCategModal />
                </Box>
                <Grid2 container sx={centerAlignment} spacing={1}>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <FolderOffTwoToneIcon sx={noItemIcon} />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalBlackHeader3 text="No Category Item Found" />
                    </Grid2>
                    <Grid2 item xs={12} sm={12} md={12} lg={12} lx={12}>
                        <GlobalGreyBody2
                            text={`We couldn't find any Category Items. Try to create your own Category Item.`}
                        />
                    </Grid2>
                </Grid2>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Box sx={pageTitleContainer}>
                <GlobalPurpleHeader4 text="Category Items" />
            </Box>
            <Box mb={3}>
                <CreateCategModal/>
            </Box>
            <Grid2 container spacing={3}>
                {CategoryData.map((categItemList) => (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} lx={2.4}>
                        <Card
                            sx={foodItemCardContainer}
                            key={categItemList._id}
                        >
                            <CardMedia
                                component="img"
                                alt={categItemList.category_name}
                                height="140"
                                image={categItemList.category_image}
                            />
                            <CardContent>
                                <GlobalBlackHeader6
                                    text={categItemList.category_name}
                                />
                            </CardContent>
                            <CardActions>
                                <UpdateCategModal
                                    title={
                                        "Update " + categItemList.category_name
                                    }
                                    value={categItemList.category_name}
                                    image={categItemList.category_image}
                                    alt={categItemList.category_name}
                                />
                                <DeleteItemModal
                                    context={
                                        "If you delete this category will be permanently gone. Are you sure you want to delete " +
                                        categItemList.category_name +
                                        "?"}
                                    category_id={categItemList._id}
                                />
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </React.Fragment>
    );
}

export default CategoryItems;
