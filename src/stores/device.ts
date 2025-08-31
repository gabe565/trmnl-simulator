import { useIntervalFn } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { getDisplay, getSetup } from "@/sdk/trmnl";
import { useConfigStore } from "@/stores/config.ts";

const noCacheImageURL = (url: string, filename: string) => {
  const u = new URL(url);
  u.searchParams.set("cache", filename);
  return u.toString();
};

export const useDeviceStore = defineStore("device", {
  state: () => {
    const imageURL = ref<string | undefined>(undefined);
    const nextUpdate = ref<Date | undefined>(undefined);
    const intervalMs = ref(15 * 60 * 1000);
    const error = ref<any>(undefined);

    const config = useConfigStore();

    const update = async (force: boolean = false) => {
      console.log("Updating display...");
      error.value = undefined;
      try {
        if (!config.apiKey) {
          const { api_key } = await getSetup({ server: config.server, mac: config.mac });
          if (api_key) {
            config.apiKey = api_key;
          }
        }
        const res = await getDisplay({
          server: config.server,
          api_key: config.apiKey,
          battery: config.battery,
          device_id: config.mac,
          firmware: config.firmware,
          intervalMs: intervalMs.value,
          mirror: config.mirrorMode && !force,
          wifi: config.wifi,
        });

        if (res.image_url) {
          if (res.filename) {
            res.image_url = noCacheImageURL(res.image_url, res.filename);
          }
          imageURL.value = res.image_url;
          if (res.refresh_rate) intervalMs.value = res.refresh_rate * 1000;
          nextUpdate.value = res.next_update;

          if (!isActive.value) resume();
        }
      } catch (err) {
        console.error(err);
        error.value = err;
        if (isActive.value) stop();
      }
    };

    const { pause, resume, isActive } = useIntervalFn(update, intervalMs, { immediate: false });

    watch(isActive, (v) => (config.isRunning = v));

    const stop = () => {
      pause();
      nextUpdate.value = undefined;
      intervalMs.value = 0;
    };

    return {
      imageURL,
      nextUpdate,
      intervalMs,
      update,
      stop,
      error,
    };
  },
});
