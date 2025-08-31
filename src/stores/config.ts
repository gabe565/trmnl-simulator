import { defineStore } from "pinia";
import { WifiOptions } from "@/sdk/trmnl";

export const useConfigStore = defineStore("config", {
  state: () => ({
    server: "https://trmnl.app",
    mac: "",
    apiKey: "",
    firmware: "",
    model: "og_png",
    battery: 100,
    wifi: WifiOptions[0]?.label ?? "",
    device: 0,
    isRunning: false,
    mirrorMode: false,
  }),
  persist: true,
});
