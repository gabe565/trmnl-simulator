<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import { ref } from "vue";
import deviceImg from "@/assets/trmnl-device.png";
import { Button } from "@/components/ui/button";
import FullscreenIcon from "~icons/material-symbols/fullscreen-rounded";

const props = withDefaults(defineProps<{ imageSrc?: string }>(), { imageSrc: "" });

const screenRef = ref<HTMLImageElement | null>(null);
const { toggle, isFullscreen } = useFullscreen(screenRef);
</script>

<template>
  <div class="relative text-center rounded-lg mx-auto max-w-[900px]">
    <Button
      @click="toggle"
      class="absolute z-10 right-0 bottom-0 m-2 inset-shadow-sm/15 shadow-none"
    >
      <FullscreenIcon />
    </Button>
    <img
      class="w-full rounded-lg select-none pointer-events-none"
      :src="deviceImg"
      alt="TRMNL Frame"
      draggable="false"
    />
    <img
      id="screen"
      ref="screenRef"
      :src="props.imageSrc"
      alt="TRMNL Screen"
      class="absolute inset-0 px-6 pt-5.5 pb-15"
      :class="{ 'mix-blend-multiply': !isFullscreen }"
    />
  </div>
</template>
