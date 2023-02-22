import * as React from "react";

import { styled } from "@mui/material/styles";
import { Switch } from "@mui/material/";
import { pink, grey } from "@mui/material/colors";

const CustomSwitch = styled((props) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: pink[500],
            "& + .MuiSwitch-track": {
                backgroundColor: pink[200],
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "yellow",
            border: "6px solid green",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color: grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: grey[500],
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

function GlobalPinkSwitch(props) {
    return (
        <CustomSwitch
            sx={{ m: 1 }}
            checked={props.checked}
            onChange={props.onChange}
            
        />
    );
}

export default GlobalPinkSwitch;
