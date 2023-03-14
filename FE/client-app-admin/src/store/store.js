import { create } from "zustand";

export const useStore = create((set) => ({
    CategoryData: [],
    setCategoryItems: (categories) => set({ CategoryData: categories }),
    order_id: null,
    setOrderId: (order_id) => set({ order_id: order_id }),
    orderedItems: [],
    setOrderedItems: (orders) => set({ orderedItems: orders }),
    menuItems: [],
    setMenuItems: (menuItems) => set({ menuItems: menuItems }),
    tableData: [],
    setTableData: (tableData) => set({tableData: tableData}),
    user: null,
    setUser: (user) => set({ user: user}),
}));
