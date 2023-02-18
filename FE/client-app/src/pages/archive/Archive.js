import * as React from 'react';
import { archiveHeadCellsList } from './datas/ArchiveCellsListData';
import { rows } from './datas/ArchiveData';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';

import { alpha } from '@mui/material/styles';
import { Box, Toolbar, Stack } from '@mui/material/';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material/';
import { FormControlLabel, Checkbox, Tooltip, Paper, IconButton } from '@mui/material/';
import { purple, pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';

import GlobalPurpleHeader4 from '../../global/typographies/headers/PurpleHeader4';
import GlobalPinkSwitch from '../../global/switches/PinkSwitch';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalBlueContainedButton from '../../global/buttons/contains/BlueContainedButton';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    } if (b[orderBy] > a[orderBy]) {
        return 1;
    };

    return 0;
};

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
};

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        };
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const selectAllCheckbox = {
        '&.Mui-checked': { 
            color: pink[500] 
        },
        '&.MuiCheckbox-indeterminate': {
            color: pink[500] 
        }
    };

    const tableHeadTitleSort = {
        fontWeight: 'bold',
        color: purple[900],
        transition: '0.5s',
        '&:hover': {
            color: purple[700],
            transition: '0.5s'
        }
    };

    return (
        <TableHead>
            <TableRow >
                <TableCell padding='checkbox'>
                    <Checkbox sx={ selectAllCheckbox } indeterminate={ numSelected > 0 && numSelected < rowCount } checked={ rowCount > 0 && numSelected === rowCount } onChange={ onSelectAllClick } inputProps={{ 'aria-label': 'select all items' }} />
                </TableCell>
                {archiveHeadCellsList.map((archiveHeadItem) => (
                    <TableCell key={ archiveHeadItem.id } align={ archiveHeadItem.dataAlignment ? 'right' : 'left' } padding={ archiveHeadItem.disablePadding ? 'none' : 'normal' } sortDirection={ orderBy === archiveHeadItem.id ? order : false } >
                        <TableSortLabel active={ orderBy === archiveHeadItem.id } direction={ orderBy === archiveHeadItem.id ? order : 'asc' } onClick={ createSortHandler(archiveHeadItem.id) } sx={ tableHeadTitleSort } >
                            { archiveHeadItem.label }
                            { orderBy === archiveHeadItem.id ? (
                                <Box component='span' sx={ visuallyHidden }>
                                    { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                                </Box>
                            ) : null }
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    const toolbarContainer = {
        pl: { sm: 2 },
        pr: {  xs: 1, sm: 1 },
        ...(numSelected > 0 && {
            bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
    };

    const toolbarDynamicText = {
        flex: '1 1 100%'
    };

    const iconFilterDelete = {
        color: purple[900]
    };

    return (
        <Toolbar sx={ toolbarContainer } >
            { numSelected > 0 ? (
                <Typography sx={ toolbarDynamicText } variant='subtitle1' >
                    {numSelected > 1 ? (
                        <Typography> { numSelected } items selected</Typography>
                    ) : (
                        <Typography> { numSelected } item selected</Typography>
                    )};
                </Typography>
            ) : (
                <Typography sx={ toolbarDynamicText } variant='h6' id='tableTitle' component='div'>
                    Data
                </Typography>
            )}
            { numSelected > 0 ? (
                <Tooltip title='Delete'>
                    <IconButton sx={ iconFilterDelete }>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title='Filter list'>
                    <IconButton sx={ iconFilterDelete }>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('timeDate');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.orderId);
            setSelected(newSelected);
            return;
        };
        setSelected([]);
    };

    const handleClick = (event, orderId) => {
        const selectedIndex = selected.indexOf(orderId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, orderId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1));
        };

        setSelected(newSelected);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    
    const pageTitleContainer = {
        mb: 3,
        textAlign: { xs: 'center', sm: 'center', md: 'left', lg: 'left', lx: 'left' }
    };

    const archiveTable = {
        minWidth: 750
    };

    const archiveTablePaper = {
        width: '100%',
        mb: 2
    };

    const tableContainerWidth = {
        width: '100%'
    };

    const uniqueId = {
        fontWeight: 'bold'
    };

    const centerAlignment = {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        p: 2
    };

    const noDataIcon = {
        fontSize: '3em'
    };

    const rowCheckbox = {
        '&.Mui-checked': { 
            color: pink[500] 
        }
    };

    if (rows.length === 0) {
        return (
            <React.Fragment>
                <Box sx={ pageTitleContainer }>
                    <GlobalPurpleHeader4 text='Archive' />
                </Box>
                <Box mb={3}>
                    <GlobalBlueContainedButton text='Generate' />
                </Box>
                <Box sx={ tableContainerWidth }>
                    <Paper sx={ archiveTablePaper }>
                        <EnhancedTableToolbar numSelected={ selected.length } />
                        <TableContainer>
                            <Table sx={ archiveTable } aria-labelledby='tableTitle' size={ dense ? 'small' : 'medium' } >
                                <EnhancedTableHead numSelected={ selected.length } order={ order } orderBy={ orderBy } onSelectAllClick={ handleSelectAllClick } onRequestSort={ handleRequestSort } />
                            </Table>
                            <Stack direction='row' sx={ centerAlignment } spacing={1}>
                                <FindInPageTwoToneIcon sx={ noDataIcon } />
                                <GlobalBlackHeader5 text='No Data Found' />
                            </Stack>
                        </TableContainer>
                        <TablePagination rowsPerPageOptions={[5, 10, 15, 20, 25, 30]} component='div' count={ rows.length } rowsPerPage={ rowsPerPage } page={ page } onPageChange={ handleChangePage } onRowsPerPageChange={ handleChangeRowsPerPage } />
                    </Paper>
                    <FormControlLabel control={ <GlobalPinkSwitch disabled /> } label='Dense padding' />
                </Box>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Box sx={ pageTitleContainer }>
                <GlobalPurpleHeader4 text='Archive' />
            </Box>
            <Box mb={3}>
                <GlobalBlueContainedButton text='Generate' />
            </Box>
            <Box sx={ tableContainerWidth }>
                <Paper sx={ archiveTablePaper }>
                    <EnhancedTableToolbar numSelected={ selected.length } />
                    <TableContainer>
                        <Table sx={ archiveTable } aria-labelledby='tableTitle' size={ dense ? 'small' : 'medium' } >
                            <EnhancedTableHead numSelected={ selected.length } order={ order } orderBy={ orderBy } onSelectAllClick={ handleSelectAllClick } onRequestSort={ handleRequestSort } rowCount={ rows.length } />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const isItemSelected = isSelected(row.orderId);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow hover onClick={ (event) => handleClick(event, row.orderId) } role='checkbox' aria-checked={ isItemSelected } tabIndex={ -1 } key={ row.orderId } selected={ isItemSelected } >
                                                <TableCell padding='checkbox'>
                                                    <Checkbox sx={ rowCheckbox } checked={ isItemSelected } inputProps={{ 'aria-labelledby': labelId }} />
                                                </TableCell>
                                                <TableCell component='th' id={ labelId } scope='row' padding='none' sx={ uniqueId }>{row.orderId}</TableCell>
                                                <TableCell align='left'>{row.orderName}</TableCell>
                                                <TableCell align='left'>{row.category}</TableCell>
                                                <TableCell align='left'>{row.code}</TableCell>
                                                <TableCell align='left'>{[row.timeDate.getMonth() + '/', row.timeDate.getDate() + '/', row.timeDate.getFullYear() + ' ' + row.timeDate.getHours() + ':' + row.timeDate.getMinutes() + ':' + row.timeDate.getSeconds()]}</TableCell>
                                            </TableRow>
                                        );
                                    })};
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination rowsPerPageOptions={[5, 10, 15, 20, 25, 30]} component='div' count={ rows.length } rowsPerPage={ rowsPerPage } page={ page } onPageChange={ handleChangePage } onRowsPerPageChange={ handleChangeRowsPerPage } />
                </Paper>
                <FormControlLabel control={ <GlobalPinkSwitch checked={ dense } onChange={ handleChangeDense } /> } label='Dense padding' />
            </Box>
        </React.Fragment>
    );
};