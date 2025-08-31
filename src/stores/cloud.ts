import { defineStore } from "pinia";
import { ref } from "vue";
import type { Model } from "@/sdk/trmnl";

export const useCloudStore = defineStore("cloud", {
  state: () => {
    const models = ref<Model[]>([]);
    return {
      models,
    };
  },
  persist: true,
});
