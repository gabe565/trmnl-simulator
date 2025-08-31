<script setup lang="ts">
import BatterySlider from "@/components/BatterySlider.vue";
import ColorChooser from "@/components/ColorChooser.vue";
import InputSelect from "@/components/InputSelect.vue";
import ModelSelect from "@/components/ModelSelect.vue";
import PasswordViewInput from "@/components/PasswordViewInput.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { WifiOptions } from "@/sdk/trmnl";
import { useConfigStore } from "@/stores/config";
import PlayIcon from "~icons/material-symbols/play-arrow-rounded";
import NextIcon from "~icons/material-symbols/skip-next-rounded";
import StopIcon from "~icons/material-symbols/stop-rounded";

const config = useConfigStore();

const props = defineProps<{ running?: boolean }>();

const emits = defineEmits<{
  (e: "start"): void;
  (e: "stop"): void;
  (e: "next"): void;
}>();
</script>

<template>
  <div class="space-y-5">
    <div class="space-y-2">
      <Label for="server">Server</Label>
      <Input id="server" v-model="config.server" placeholder="https://trmnl.app" />
    </div>
    <div class="space-y-2">
      <Label for="mac">MAC Address</Label>
      <PasswordViewInput id="mac" v-model="config.mac" placeholder="00:11:22:33:44:55" masked />
    </div>
    <div class="space-y-2">
      <Label for="api-key">API Key</Label>
      <PasswordViewInput
        id="api-key"
        v-model="config.apiKey"
        placeholder="Leave blank to auto-retrieve"
        masked
      />
    </div>
    <div class="flex items-center space-x-2">
      <Switch id="mirror-mode" v-model="config.mirrorMode" />
      <Label for="mirror-mode">Mirror Mode</Label>
    </div>

    <Accordion type="single" collapsible>
      <AccordionItem value="1">
        <AccordionTrigger>Advanced</AccordionTrigger>
        <AccordionContent class="space-y-5">
          <div class="space-y-2">
            <Label>Device Color</Label>
            <ColorChooser v-model="config.device" />
          </div>

          <div class="space-y-2">
            <Label for="battery">Battery Percentage</Label>
            <BatterySlider v-model="config.battery" />
          </div>
          <div class="space-y-2">
            <Label for="rssi">WiFi Signal Strength</Label>
            <InputSelect
              id="rssi"
              v-model="config.wifi"
              :options="WifiOptions.map((v) => v.label)"
            />
          </div>
          <div class="space-y-2">
            <Label for="firmware">Firmware Version</Label>
            <Input id="firmware" v-model="config.firmware" placeholder="1.0.0" />
          </div>
          <div class="space-y-2">
            <Label for="model">Model</Label>
            <ModelSelect id="model" v-model="config.model" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <div class="flex flex-wrap gap-2 pt-1 justify-between">
      <Button v-if="!props.running" @click="emits('start')">
        <PlayIcon />
        Start
      </Button>
      <Button v-if="props.running" variant="secondary" @click="emits('stop')">
        <StopIcon />
        Stop
      </Button>
      <Button :disabled="!props.running" variant="outline" @click="emits('next')">
        <NextIcon />
        Next
      </Button>
    </div>
  </div>
</template>
