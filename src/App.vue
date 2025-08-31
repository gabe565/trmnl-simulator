<script setup lang="ts">
import { onMounted } from "vue";
import DevicePreview from "@/components/DevicePreview.vue";
import InfoCard from "@/components/InfoCard.vue";
import SimulatorControls from "@/components/SimulatorControls.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CardAction, CardDescription } from "@/components/ui/card";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { useConfigStore } from "@/stores/config.ts";
import { useDeviceStore } from "@/stores/device.ts";
import ErrorIcon from "~icons/material-symbols/error-rounded";
import SettingsIcon from "~icons/material-symbols/settings-rounded";

const config = useConfigStore();
const device = useDeviceStore();

onMounted(async () => {
  if (config.isRunning && config.server && config.mac && config.apiKey) {
    await device.update();
  }
});
</script>

<template>
  <div class="min-h-dvh p-6 md:p-10">
    <div class="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 class="text-2xl font-semibold">TRMNL Simulator</h1>
        <p class="text-muted-foreground text-sm">Simulate a TRMNL device in your browser.</p>
      </header>

      <Alert v-if="device.error" variant="destructive">
        <ErrorIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {{ device.error }}
        </AlertDescription>
      </Alert>

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
              <SimulatorControls
                :running="config.isRunning"
                @start="device.update"
                @stop="device.stop"
                @next="device.update(true)"
              />
            </CardContent>
          </Card>
        </aside>

        <main class="space-y-4">
          <DevicePreview :image-src="device.imageURL" />
        </main>

        <InfoCard :next-update="device.nextUpdate" />
      </div>
    </div>
  </div>
</template>
