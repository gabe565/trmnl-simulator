<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import DevicePreview from "@/components/DevicePreview.vue";
import InfoCard from "@/components/InfoCard.vue";
import SimulatorControls from "@/components/SimulatorControls.vue";
import { CardAction, CardDescription } from "@/components/ui/card";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { PercentageToVoltage } from "@/data/battery.ts";
import { Options as WifiOptions } from "@/data/wifi.ts";
import { useConfigStore } from "@/stores/config";
import SettingsIcon from "~icons/material-symbols/settings-rounded";

const config = useConfigStore();
const { server, mac, apiKey, firmware, battery, wifi, isRunning, mirrorMode } = storeToRefs(config);

const intervalMs = ref(15 * 60 * 1000);
const nextUpdate = ref<Date | null>(null);
const imageSrc = ref("");

function ensureTrailingSlash(url: string) {
  return url.endsWith("/") ? url : url + "/";
}

async function setupRequest(base: string) {
  if (!base) throw new Error("Server is not populated.");
  if (!mac.value) throw new Error("MAC Address is not populated.");

  if (apiKey.value) {
    return [mac.value, apiKey.value] as const;
  }

  console.log("Setting up device");
  const url = new URL("api/setup", ensureTrailingSlash(base));
  const resp = await fetch(url, {
    headers: { ID: mac.value },
  });
  if (resp.status !== 200) throw new Error(`Server sent an error response: ${resp.status}.`);
  const json = await resp.json();
  if (json.status !== 200) {
    const message = json.message ?? `API send an error response: ${json["status"]}.`;
    throw new Error(message);
  }
  imageSrc.value = noCacheImageURL(json.image_url, json.filename);
  apiKey.value = json.api_key;
  return [mac.value, apiKey.value] as const;
}

type HeaderKey = "ID" | "Access-Token" | "Refresh-Rate" | "FW-Version" | "Battery-Voltage" | "RSSI";

async function displayRequest(base: string, deviceId: string, key: string, force: boolean = false) {
  if (!base) throw new Error("Server is not populated.");
  if (!deviceId) throw new Error("MAC Address is not populated.");
  if (!key) throw new Error("API Key is not populated.");

  let path = "api/display";
  let wantStatus = 0;
  if (mirrorMode.value && !force) {
    path = "api/current_screen";
    wantStatus = 200;
  }

  const headers: Partial<Record<HeaderKey, string>> = {
    ID: deviceId,
    "Access-Token": key,
    "Refresh-Rate": (intervalMs.value / 1000).toFixed(),
  };

  if (firmware.value) headers["FW-Version"] = firmware.value;
  if (battery.value) headers["Battery-Voltage"] = PercentageToVoltage(battery.value).toString();
  if (wifi.value) {
    const match = WifiOptions.find(({ label }) => label === wifi.value);
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
  imageSrc.value = noCacheImageURL(json.image_url, json.filename);
  const refreshSec = parseInt(json.refresh_rate, 10);
  if (!Number.isNaN(refreshSec)) {
    intervalMs.value = refreshSec * 1000;
    const next = new Date();
    next.setSeconds(next.getSeconds() + refreshSec);
    nextUpdate.value = next;
  }
}

function noCacheImageURL(url: string, filename: string) {
  const u = new URL(url);
  u.searchParams.set("cache", filename);
  return u.toString();
}

async function update(force: boolean = false) {
  console.log("Updating display...");
  try {
    const [deviceId, key] = await setupRequest(server.value);
    await displayRequest(server.value, deviceId, key, force);
  } catch (err) {
    console.error(err);
    alert(err);
    pause();
  }
}

const { pause, resume, isActive } = useIntervalFn(update, intervalMs, { immediate: false });

watch(isActive, (newVal) => (isRunning.value = newVal));

async function start() {
  await update();
  resume();
}

async function next() {
  await update(true);
  resume();
}

onMounted(async () => {
  if (isRunning.value && server.value && mac.value && apiKey.value) {
    await start();
  }
});
</script>

<template>
  <div class="min-h-dvh p-6 md:p-10">
    <div class="mx-auto max-w-6xl">
      <header class="mb-6">
        <h1 class="text-2xl font-semibold">TRMNL Simulator</h1>
        <p class="text-muted-foreground text-sm">Simulate a TRMNL device in your browser.</p>
      </header>

      <div class="grid gap-6 lg:grid-cols-[380px_1fr] items-start">
        <aside class="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle> Server Settings </CardTitle>
              <CardAction>
                <SettingsIcon />
              </CardAction>
              <CardDescription>
                If API Key is not specified, MAC Address will passed to the
                <code>/api/setup</code> endpoint to retrieve it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimulatorControls :running="isActive" @start="start" @stop="pause" @next="next" />
            </CardContent>
          </Card>
        </aside>

        <main class="space-y-4">
          <DevicePreview :image-src="imageSrc" />
        </main>

        <InfoCard :next-update="nextUpdate" />
      </div>
    </div>
  </div>
</template>
