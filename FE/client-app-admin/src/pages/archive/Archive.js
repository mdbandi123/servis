import * as React from "react";

import PropTypes from "prop-types";
import { useStore } from "../../store/store";
import { Box, Stack } from "@mui/material/";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material/";
import { FormControlLabel, Paper } from "@mui/material/";
import { indigo, grey } from "@mui/material/colors";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";

import GlobalIndigoHeader4 from "../../global/typographies/headers/IndigoHeader4";
import GlobalTealSwitch from "../../global/switches/TealSwitch";
import GlobalBlackHeader5 from "../../global/typographies/headers/BlackHeader5";
import GlobalTealContainedButton from "../../global/buttons/contains/TealContainedButton";
import GenerateDatePickerModal from "../../global/modals/GenerateDatePickerModal";
import SlideDown from "../../animation/SlideDown";

const archiveHeadCellsList = [
    {
        id: "orderId",
        dataAlignment: false,
        disablePadding: true,
        label: "TABLE",
    },
    {
        id: "orderName",
        dataAlignment: false,
        disablePadding: false,
        label: "NAME",
    },
    {
        id: "quantity",
        dataAlignment: false,
        disablePadding: false,
        label: "QUANTITY",
    },
    {
        id: "category",
        dataAlignment: false,
        disablePadding: false,
        label: "CATEGORY",
    },
    {
        id: "timeDate",
        dataAlignment: false,
        disablePadding: false,
        label: "TIME AND DATE",
    },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const tableHeadTitleSort = {
        fontWeight: "bold",
        color: indigo[900],
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                {archiveHeadCellsList.map((archiveHeadItem) => (
                    <TableCell
                        sx={tableHeadTitleSort}
                        key={archiveHeadItem.id}
                        align={archiveHeadItem.dataAlignment ? "right" : "left"}
                        padding={
                            archiveHeadItem.disablePadding ? "none" : "normal"
                        }
                        sortDirection={
                            orderBy === archiveHeadItem.id ? order : false
                        }
                    >
                        {archiveHeadItem.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const user = useStore((state) => state.user);
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/order_items/archive`, {
            method: "GET",
            headers: {
                Authorization: user.Aa,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data here");
                console.log(data);
                setRows(data.items);
            })
            .catch((error) => console.log(error));
    }, []);

    const [order, setOrder] = React.useState("desc");
    const [orderBy, setOrderBy] = React.useState("timeDate");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.orderId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (orderId) => selected.indexOf(orderId) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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

    const archiveTable = {
        minWidth: 750,
    };

    const archiveTablePaper = {
        width: "100%",
        mb: 2,
    };

    const tableContainerWidth = {
        width: "100%",
    };

    const uniqueId = {
        fontWeight: "bold",
    };

    const centerAlignment = {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        p: 2,
    };

    const noDataIcon = {
        fontSize: "3em",
    };

    const zebraStriped = {
        "&:nth-of-type(odd)": {
            backgroundColor: grey[200],
        },
    };

    if (rows.length === 0) {
        return (
            <SlideDown>
                <Box sx={pageTitleContainer}>
                    <GlobalIndigoHeader4 text="Archive" />
                </Box>
                <Box mb={3}>
                    <GlobalTealContainedButton
                        text="Generate"
                        disabled={true}
                    />
                </Box>
                <Box sx={tableContainerWidth}>
                    <Paper sx={archiveTablePaper}>
                        <TableContainer>
                            <Table
                                sx={archiveTable}
                                aria-labelledby="tableTitle"
                                size={dense ? "small" : "medium"}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                />
                            </Table>
                            <Stack
                                direction="row"
                                sx={centerAlignment}
                                spacing={1}
                            >
                                <FindInPageTwoToneIcon sx={noDataIcon} />
                                <GlobalBlackHeader5 text="No Data Found" />
                            </Stack>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <FormControlLabel
                        control={<GlobalTealSwitch disabled />}
                        label="Dense padding"
                    />
                </Box>
            </SlideDown>
        );
    }

    return (
        <SlideDown>
            <Box sx={pageTitleContainer}>
                <GlobalIndigoHeader4 text="Archive" />
            </Box>
            <Box mb={3}>
                <GenerateDatePickerModal />
            </Box>
            <Box sx={tableContainerWidth}>
                <Paper sx={archiveTablePaper}>
                    <TableContainer>
                        <Table
                            sx={archiveTable}
                            aria-labelledby="tableTitle"
                            size={dense ? "small" : "medium"}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(
                                            row.orderId
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                sx={zebraStriped}
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.orderId}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox" />
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    sx={uniqueId}
                                                >
                                                    {row.table_number}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.item_name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.quantity}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.item_category}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {new Date(
                                                        row.time_ordered
                                                    ).getMonth() +
                                                        1 +
                                                        "-" +
                                                        new Date(
                                                            row.time_ordered
                                                        ).getDate() +
                                                        "-" +
                                                        new Date(
                                                            row.time_ordered
                                                        ).getFullYear() +
                                                        " | " +
                                                        new Date(
                                                            row.time_ordered
                                                        ).getHours() +
                                                        ":" +
                                                        new Date(
                                                            row.time_ordered
                                                        ).getMinutes() +
                                                        ":" +
                                                        new Date(
                                                            row.time_ordered
                                                        ).getSeconds()}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height:
                                                (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={
                        <GlobalTealSwitch
                            checked={dense}
                            onChange={handleChangeDense}
                        />
                    }
                    label="Dense padding"
                />
            </Box>
        </SlideDown>
    );
}
