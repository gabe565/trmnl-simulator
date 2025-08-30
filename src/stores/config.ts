import { defineStore } from "pinia";
import { Options as WifiOptions } from "@/data/wifi.ts";

export const useConfigStore = defineStore("config", {
  state: () => ({
    server: "https://trmnl.app",
    mac: "",
    apiKey: "",
    firmware: "",
    battery: 100,
    wifi: WifiOptions[0]?.label ?? "",
    device: 0,
    isRunning: false,
    mirrorMode: false,
  }),
  persist: true,
});
