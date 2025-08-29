import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    server: "https://trmnl.app" as string,
    mac: "" as string,
    apiKey: "" as string,
    mirrorMode: false as boolean,
  }),
  persist: true,
});
