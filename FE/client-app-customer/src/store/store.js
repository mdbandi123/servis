import { create } from "zustand";

const useStore = create((set) => ({
    table_number: null,
    setTableNumber: (table_number) => set({ table_number: table_number }),
    order_id: null,
    setOrderId: (order_id) => set({ order_id: order_id }),
    CategoryData: [],
    setCategoryItems: (categories) => set({ CategoryData: categories }),
    orderedItems: [],
    setOrderedItems: (orders) => set({ orderedItems: orders }),
    cartItems: [],
    setCartItems: (cartItems) => set({ cartItems: cartItems }),
    menuItems: [],
    setMenuItems: (menuItems) => set({ menuItems: menuItems }),
}));

export default useStore;
