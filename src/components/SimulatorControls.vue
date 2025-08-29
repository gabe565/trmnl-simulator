<script setup lang="ts">
import { storeToRefs } from "pinia";
import PasswordViewInput from "@/components/PasswordViewInput.vue";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useConfigStore } from "@/stores/config";
import PlayIcon from "~icons/material-symbols/play-arrow-rounded";
import StopIcon from "~icons/material-symbols/stop-rounded";

const config = useConfigStore();
const { server, mac, apiKey, mirrorMode } = storeToRefs(config);

const props = defineProps<{ running?: boolean }>();

const emits = defineEmits<{
  (e: "start"): void;
  (e: "stop"): void;
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

    <div class="flex flex-wrap gap-2 pt-1 justify-end">
      <Button v-if="!props.running" @click="emits('start')">
        <PlayIcon />
        Start
      </Button>
      <Button v-if="props.running" variant="secondary" @click="emits('stop')">
        <StopIcon />
        Stop
      </Button>
    </div>
  </div>
</template>
