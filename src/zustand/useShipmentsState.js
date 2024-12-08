import { create } from "zustand";

export const useShipmentsState = create((set) => ({
  selectedPeriod: "Daily",
  setSelectedPeriod: (data) => set({ selectedPeriod: data }),
  loadingShipments: false,
}));
