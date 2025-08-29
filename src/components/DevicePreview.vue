<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import { ref } from "vue";
import deviceImg from "@/assets/trmnl-device.png";
import { Button } from "@/components/ui/button";
import FullscreenIcon from "~icons/material-symbols/fullscreen-rounded";

const props = withDefaults(defineProps<{ imageSrc?: string }>(), { imageSrc: "" });

const fsRef = ref<HTMLElement | null>(null);
const screenRef = ref<HTMLImageElement | null>(null);
const { toggle, isFullscreen } = useFullscreen(screenRef);
defineExpose({ fsRef, screenRef });
</script>

<template>
  <div class="relative text-center rounded-lg px-6 pt-5 pb-15 mx-auto max-w-[900px]">
    <Button
      @click="toggle"
      class="absolute z-10 right-0 bottom-0 m-2 inset-shadow-sm/15 shadow-none"
    >
      <FullscreenIcon />
    </Button>
    <!-- Device frame sits above content -->
    <img
      class="w-full absolute left-0 top-0 rounded-lg select-none pointer-events-none"
      :src="deviceImg"
      alt="TRMNL Device"
      draggable="false"
    />
    <!-- Inner wrappers to constrain and clip the screen -->
    <div class="mx-auto h-full">
      <div class="h-full overflow-hidden">
        <div class="transition-transform duration-500 h-full flex mix-blend-multiply">
          <div class="w-full h-full relative flex-shrink-0">
            <img
              id="screen"
              ref="screenRef"
              :src="props.imageSrc"
              alt="TRMNL Screen"
              class="block w-full h-auto"
              :class="{ 'mix-blend-multiply': !isFullscreen }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
