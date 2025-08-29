import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    server: "https://trmnl.app",
    mac: "",
    apiKey: "",
    isRunning: false,
    mirrorMode: false,
  }),
  persist: true,
});
