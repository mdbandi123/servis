import { pink, red, green, blue } from '@mui/material/colors';

export const PaymentData = [
    {
        userTableId: `#` + Math.floor(Math.random() * 100000),
        userTableName: ['Table #1'],
        userTableOrder: 12,
        totalAmount: `$` + 32,
        dateOrder: new Date(2022, 6, 25, 9, 30, 59),
        userTableColor: red[900],
        userOrders: ['Pork Tonkatsu', 'Orange']
    },
    {
        userTableId: `#` + Math.floor(Math.random() * 100000),
        userTableName: 'Table #2',
        userTableOrder: 23,
        totalAmount: `$` + 45.50,
        dateOrder: new Date(2022, 6, 25, 9, 30, 34),
        userTableColor: pink[900],
    },
    {
        userTableId: `#` + Math.floor(Math.random() * 100000),
        userTableName: 'Table #3',
        userTableOrder: 45,
        totalAmount: `$` + 33,
        dateOrder: new Date(2022, 6, 25, 11, 32, 45),
        userTableColor: green[900],
    },
    {
        userTableId: `#` + Math.floor(Math.random() * 100000),
        userTableName: 'Table #4',
        userTableOrder: 6,
        totalAmount: `$` + 32.10,
        dateOrder: new Date(2022, 6, 25, 10, 22, 38),
        userTableColor: blue[900],
    }
];