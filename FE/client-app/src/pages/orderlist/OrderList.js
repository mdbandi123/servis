import React from "react";
import Box from '@mui/material/Box';
import GlobalPurpleHeader4 from "../../global/typographies/headers/PurpleHeader4";

import GlobalBlackBody1 from "../../global/typographies/bodies/BlackBody1";
import GlobalBlackBody2 from "../../global/typographies/bodies/BlackBody2";
import GlobalGreyBody3 from "../../global/typographies/bodies/GreyBody3";
import GlobalBlackHeader1 from "../../global/typographies/headers/BlackHeader1";
import GlobalBlackHeader2 from "../../global/typographies/headers/BlackHeader2";
import GlobalBlackHeader3 from "../../global/typographies/headers/BlackHeader3";
import GlobalBlackHeader4 from "../../global/typographies/headers/BlackHeader4";
import GlobalBlackHeader5 from "../../global/typographies/headers/BlackHeader5";
import GlobalBlackOverline from "../../global/typographies/overlines/BlackOverline";
import GlobalBlackCaption from "../../global/typographies/captions/BlackCaption";

function OrderList() {
    return (
        <Box>
            <GlobalPurpleHeader4 text="Order List"/>

            <GlobalBlackOverline text="Overline" />

            <GlobalBlackBody1 text="Body1" />
            <GlobalBlackBody2 text="Body2" />
            <GlobalGreyBody3 text="Body3" />

            <GlobalBlackCaption text="Caption" />

            <GlobalBlackHeader1 text="h1" />
            <GlobalBlackHeader2 text="h2" />
            <GlobalBlackHeader3 text="h3" />
            <GlobalBlackHeader4 text="h4" />
            <GlobalBlackHeader5 text="h5" />
        </Box>
    );
}

export default OrderList;
