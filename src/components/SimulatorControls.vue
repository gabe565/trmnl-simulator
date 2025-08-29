<script setup lang="ts">
import { storeToRefs } from "pinia";
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
import { useConfigStore } from "@/stores/config";
import PlayIcon from "~icons/material-symbols/play-arrow-rounded";
import NextIcon from "~icons/material-symbols/skip-next-rounded";
import StopIcon from "~icons/material-symbols/stop-rounded";

const config = useConfigStore();
const { server, mac, apiKey, firmware, battery, rssi, mirrorMode } = storeToRefs(config);

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
      <Input id="server" v-model="server" placeholder="https://trmnl.app" />
    </div>
    <div class="space-y-2">
      <Label for="mac">MAC Address</Label>
      <PasswordViewInput id="mac" v-model="mac" placeholder="00:11:22:33:44:55" masked />
    </div>
    <div class="space-y-2">
      <Label for="api-key">API Key</Label>
      <PasswordViewInput
        id="api-key"
        v-model="apiKey"
        placeholder="Leave blank to auto-retrieve"
        masked
      />
    </div>
    <div class="flex items-center space-x-2">
      <Switch id="mirror-mode" v-model="mirrorMode" />
      <Label for="mirror-mode">Mirror Mode</Label>
    </div>

    <Accordion type="single" collapsible>
      <AccordionItem value="1">
        <AccordionTrigger>Advanced</AccordionTrigger>
        <AccordionContent class="space-y-5">
          <div class="space-y-2">
            <Label for="firmware">Firmware</Label>
            <Input id="firmware" v-model="firmware" placeholder="1.0.0" />
          </div>
          <div class="space-y-2">
            <Label for="battery">Battery Voltage</Label>
            <Input id="battery" type="number" v-model="battery" placeholder="4.2" />
          </div>
          <div class="space-y-2">
            <Label for="rssi">WiFi RSSI</Label>
            <Input id="rssi" type="number" v-model="rssi" placeholder="-45" />
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
