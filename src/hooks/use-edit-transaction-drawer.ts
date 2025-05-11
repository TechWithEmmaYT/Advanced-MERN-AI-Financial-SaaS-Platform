// import { create } from 'zustand';

// interface EditTransactionDrawerStore {
//   isOpen: boolean;
//   transactionId: string | null;
//   open: (transactionId: string) => void;
//   close: () => void;
// }

// export const useEditTransactionDrawer = create<EditTransactionDrawerStore>((set) => ({
//   isOpen: false,
//   transactionId: null,
//   open: (transactionId) => set({ isOpen: true, transactionId }),
//   close: () => set({ isOpen: false }),
// }));