<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import DarkIcon from "~icons/material-symbols/brightness-2-rounded";
import LightIcon from "~icons/material-symbols/brightness-5-rounded";
import AutoIcon from "~icons/material-symbols/brightness-auto-rounded";

const mode = useColorMode({ disableTransition: false, emitAuto: true });

const nextMode = computed(() => {
  if (mode.value === "auto") return "dark";
  if (mode.value === "dark") return "light";
  return "auto";
});

const ModeIcon = computed(() => {
  if (mode.value === "auto") return AutoIcon;
  if (mode.value === "light") return LightIcon;
  return DarkIcon;
});
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child :key="mode">
      <Button variant="ghost" @click="mode = nextMode" class="rounded-full">
        <ModeIcon />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">Change to {{ nextMode }} mode</TooltipContent>
  </Tooltip>
</template>
