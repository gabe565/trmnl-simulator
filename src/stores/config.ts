import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    server: "https://trmnl.app",
    mac: "",
    apiKey: "",
    firmware: "",
    battery: "",
    rssi: "",
    isRunning: false,
    mirrorMode: false,
  }),
  persist: true,
});
