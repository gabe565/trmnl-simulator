<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import { ref } from "vue";
import TrmnlLogo from "@/assets/trmnl-logo.svg?raw";
import { Button } from "@/components/ui/button";
import FullscreenIcon from "~icons/material-symbols/fullscreen-rounded";

const props = withDefaults(defineProps<{ imageSrc?: string }>(), { imageSrc: "" });

const screenRef = ref<HTMLImageElement | null>(null);
const { toggle, isFullscreen } = useFullscreen(screenRef);
</script>

<template>
  <div class="relative rounded-lg mx-auto max-w-[800px] bg-[#f7f7f7] p-[25px] pt-[24px] pb-[57px]">
    <Button @click="toggle" class="absolute right-0 bottom-0 m-2 inset-shadow-sm/15 shadow-none">
      <FullscreenIcon />
    </Button>
    <div
      class="pointer-events-none absolute bottom-0 left-0 w-full flex justify-center pb-4.5"
      aria-hidden="true"
    >
      <div class="w-28 fill-[#bababa]" v-html="TrmnlLogo" />
    </div>
    <div
      class="aspect-5/3 w-full bg-[#f7f7f7] rounded-sm overflow-hidden inset-shadow-[0_5px_70px_rgba(0,0,0,0.25)]"
    >
      <img
        ref="screenRef"
        :src="props.imageSrc"
        alt="TRMNL Screen"
        :class="{ 'mix-blend-multiply': !isFullscreen }"
      />
    </div>
  </div>
</template>
