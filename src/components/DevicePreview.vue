<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import { ref } from "vue";
import TrmnlLogo from "@/assets/trmnl-logo.svg?raw";
import { Button } from "@/components/ui/button";
import { Colors } from "@/sdk/trmnl";
import { useConfigStore } from "@/stores/config";
import FullscreenIcon from "~icons/material-symbols/fullscreen-rounded";

const config = useConfigStore();

const props = withDefaults(defineProps<{ imageSrc?: string }>(), { imageSrc: "" });

const screenRef = ref<HTMLImageElement | null>(null);
const { toggle, isFullscreen } = useFullscreen(screenRef);
</script>

<template>
  <div
    class="relative rounded-lg mx-auto max-w-[800px] p-[3.4%] pt-[3.3%] pb-[7.6%] transition-all"
    :style="{ 'background-color': Colors[config.device]?.color }"
  >
    <Button
      @click="toggle"
      class="absolute right-0 bottom-0 m-2 inset-shadow-sm/15 shadow-none bg-white/15 size-6 sm:size-9"
      size="icon"
    >
      <FullscreenIcon />
    </Button>
    <div
      class="pointer-events-none absolute bottom-0 left-0 w-full flex justify-center pb-[2.4%]"
      aria-hidden="true"
    >
      <div class="w-[15%] fill-black opacity-15" v-html="TrmnlLogo" />
    </div>
    <div
      class="aspect-5/3 w-full bg-[#f7f7f7] rounded-sm overflow-hidden inset-shadow-[0_5px_70px_rgba(0,0,0,0.25)]"
    >
      <img
        v-if="props.imageSrc"
        ref="screenRef"
        :src="props.imageSrc"
        alt="TRMNL Screen"
        :class="{ 'mix-blend-multiply': !isFullscreen }"
      />
    </div>
  </div>
</template>
