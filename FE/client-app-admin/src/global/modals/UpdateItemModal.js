import * as React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useStore } from "../../store/store";

import { Box, Slide } from "@mui/material";
import { IconButton, Button } from "@mui/material/";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material/";
import { Stack, TextField, FormControlLabel, MenuItem } from "@mui/material/";
import { CardMedia, Card } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import GlobalBlackHeader5 from "../typographies/headers/BlackHeader5";
import GlobalRedTextButton from "../buttons/text/RedTextButton";
import GlobalBlueTextButton from "../buttons/text/BlueTextButton";
import GlobalPinkSwitch from "../switches/PinkSwitch";
import { grey } from "@mui/material/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UpdateItemModal(props) {
    const [openUpdateItemModal, setOpenUpdateItemModal] = React.useState(false);
    const [valueName, setValueName] = React.useState(props.valueName);
    const [valuePrice, setValuePrice] = React.useState(props.valuePrice);
    const [valueCateg, setValueCateg] = React.useState(props.valueCateg);
    const [image, setImage] = React.useState(null);
    const [valueStatus, setValueStatus] = React.useState(props.availability);
    const [CategoryData, setCategoryData] = React.useState([]);

    const { user } = useStore();

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/menu/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user.Aa,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCategoryData(data.categories);
            })
            .catch((error) => console.error(error));
    }, []);

    const ItemUpdateHandler = () => {
        setOpenUpdateItemModal(true);
    };

    const cancelItemUpdateHandler = () => {
        setOpenUpdateItemModal(false);
    };

    const confirmItemUpdateHandler = () => {
        if (image) {
            const formData = new FormData();
            formData.append("file", image);  

            fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
            method: "POST",
            headers: {
                "Authorization": user.Aa,
            },
            body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("File uploaded successfully");
                fetch(`${process.env.REACT_APP_BACKEND_URL}/menu_items/item`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": user.Aa,
                    },
                    body: JSON.stringify({
                        item_id: props.id,
                        name: valueName,
                        price: valuePrice,
                        image: data.imageUrl,
                        old_category: props.valueCateg,
                        new_category: valueCateg,
                        is_available: valueStatus,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setOpenUpdateItemModal(false);
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/menu_items/item`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": user.Aa,
                },
                body: JSON.stringify({
                    item_id: props.id,
                    name: valueName,
                    price: valuePrice,
                    image: props.image,
                    old_category: props.valueCateg,
                    new_category: valueCateg,
                    is_available: valueStatus,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setOpenUpdateItemModal(false);
                })
                .catch((error) => console.error(error));
        }
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

    const uploadSection = {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    };

    const disableItem = {
        color: grey[900],
    };

    return (
        <React.Fragment>
            <GlobalBlueTextButton text="Update" onClick={ItemUpdateHandler} />
            <Dialog
                keepMounted
                maxWidth="sm"
                fullWidth
                open={openUpdateItemModal}
                TransitionComponent={Transition}
                onClose={cancelItemUpdateHandler}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={dialogAlignment}>
                    <GlobalBlackHeader5 text={props.title} />
                </DialogTitle>
                <Box sx={closeIconButton}>
                    <IconButton>
                        <CloseIcon onClick={cancelItemUpdateHandler} />
                    </IconButton>
                </Box>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid2 container spacing={2}>
                            <Grid2
                                item
                                sx={uploadSection}
                                xs={12}
                                sm={12}
                                md={6}
                                lg={6}
                                lx={6}
                            >
                                <Stack spacing={2}>
                                    <Box>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt={props.alt}
                                                height="280"
                                                image={image ? URL.createObjectURL(image) : `${process.env.REACT_APP_BACKEND_URL}${props.image}`}
                                            />
                                        </Card>
                                    </Box>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={<FileUploadIcon />}
                                        >
                                            Upload{" "}
                                            <input
                                                hidden
                                                accept="image/*"
                                                multiple
                                                type="file"
                                                onChange={(e) => {setImage(e.target.files[0])}}
                                            />
                                        </Button>
                                    </Box>
                                </Stack>
                            </Grid2>
                            <Grid2 item xs={12} sm={12} md={6} lg={6} lx={6}>
                                <Stack spacing={1}>
                                    <Box>
                                        <TextField
                                            id="outlined-textarea"
                                            defaultValue={props.valueName}
                                            color="primary"
                                            type="text"
                                            label="Name"
                                            placeholder="Enter Food Name"
                                            variant="filled"
                                            onChange={(e) => {
                                                setValueName(e.target.value);
                                            }}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            id="outlined-textarea"
                                            defaultValue={props.valuePrice}
                                            color="primary"
                                            type="number"
                                            label="Price"
                                            placeholder="Enter Food Price"
                                            variant="filled"
                                            onChange={(e) => {
                                                setValuePrice(e.target.value);
                                            }}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            id="filled-select-currency"
                                            defaultValue={props.valueCateg}
                                            color="primary"
                                            label="Category"
                                            helperText="Select Category"
                                            variant="filled"
                                            onChange={(e) => {
                                                setValueCateg(e.target.value);
                                            }}
                                            fullWidth
                                            select
                                        >
                                            {CategoryData.map((selectCateg) => (
                                                <MenuItem
                                                    key={
                                                        selectCateg.category_name
                                                    }
                                                    value={
                                                        selectCateg.category_name
                                                    }
                                                >
                                                    {selectCateg.category_name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                    <Box>
                                        <FormControlLabel
                                            sx={disableItem}
                                            control={<GlobalPinkSwitch checked={valueStatus}/>}
                                            onChange={(e) => {
                                                setValueStatus(e.target.checked);
                                            }}
                                            label="Enabled"
                                        />
                                    </Box>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GlobalRedTextButton
                        text="Cancel"
                        onClick={cancelItemUpdateHandler}
                    />
                    <GlobalBlueTextButton
                        text="Update"
                        onClick={confirmItemUpdateHandler}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default UpdateItemModal;
