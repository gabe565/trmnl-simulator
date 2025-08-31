import { useIntervalFn } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { PercentageToVoltage } from "@/data/battery.ts";
import { Options as WifiOptions } from "@/data/wifi.ts";
import { useConfigStore } from "@/stores/config.ts";
import { ensureTrailingSlash } from "@/stores/utils.ts";

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

    const doSetup = async (base: string) => {
      if (!base) throw new Error("Server is not populated.");
      if (!config.mac) throw new Error("MAC Address is not populated.");

      if (config.apiKey) {
        return [config.mac, config.apiKey] as const;
      }

      console.log("Setting up device");
      const url = new URL("api/setup", ensureTrailingSlash(base));
      const resp = await fetch(url, {
        headers: { ID: config.mac },
      });
      if (resp.status !== 200) throw new Error(`Server sent an error response: ${resp.status}.`);
      const json = await resp.json();
      if (json.status !== 200) {
        const message = json.message ?? `API send an error response: ${json["status"]}.`;
        throw new Error(message);
      }
      imageURL.value = noCacheImageURL(json.image_url, json.filename);
      config.apiKey = json.api_key;
      return [config.mac, config.apiKey] as const;
    };

    type HeaderKey =
      | "ID"
      | "Access-Token"
      | "Refresh-Rate"
      | "FW-Version"
      | "Battery-Voltage"
      | "RSSI"
      | "Model";

    const doDisplay = async (
      base: string,
      deviceId: string,
      key: string,
      force: boolean = false,
    ) => {
      if (!base) throw new Error("Server is not populated.");
      if (!deviceId) throw new Error("MAC Address is not populated.");
      if (!key) throw new Error("API Key is not populated.");

      let path = "api/display";
      let wantStatus = 0;
      if (config.mirrorMode && !force) {
        path = "api/current_screen";
        wantStatus = 200;
      }

      const headers: Partial<Record<HeaderKey, string>> = {
        ID: deviceId,
        "Access-Token": key,
        "Refresh-Rate": (intervalMs.value / 1000).toFixed(),
      };

      if (config.model) headers["Model"] = config.model;
      if (config.firmware) headers["FW-Version"] = config.firmware;
      if (config.battery)
        headers["Battery-Voltage"] = PercentageToVoltage(config.battery).toString();
      if (config.wifi) {
        const match = WifiOptions.find(({ label }) => label === config.wifi);
        if (match) {
          headers["RSSI"] = match.value;
        }
      }

      const url = new URL(path, ensureTrailingSlash(base));
      const resp = await fetch(url, { headers });
      if (resp.status !== 200) throw new Error(`Server sent an error response: ${resp.status}.`);
      const json = await resp.json();
      if (json.status !== wantStatus) {
        const message = json?.error ?? `API sent an error response: ${json.status}.`;
        throw new Error(message);
      }
      imageURL.value = noCacheImageURL(json.image_url, json.filename);
      const refreshSec = parseInt(json.refresh_rate, 10);
      if (!Number.isNaN(refreshSec)) {
        intervalMs.value = refreshSec * 1000;
        const next = new Date();
        next.setSeconds(next.getSeconds() + refreshSec);
        nextUpdate.value = next;
      }
    };

    const update = async (force: boolean = false) => {
      console.log("Updating display...");
      error.value = undefined;
      try {
        const [deviceId, key] = await doSetup(config.server);
        await doDisplay(config.server, deviceId, key, force);
        if (!isActive.value) resume();
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
