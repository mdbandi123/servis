import { create } from "zustand";

export const useStore = create((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories: categories }),
    order_id: null,
    setOrderId: (order_id) => set({ order_id: order_id }),
    orderedItems: [],
    setOrderedItems: (orders) => set({ orderedItems: orders }),
    menuItems: [],
    setMenuItems: (menuItems) => set({ menuItems: menuItems }),
}));
