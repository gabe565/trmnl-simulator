<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import { computed, useTemplateRef } from "vue";
import setupLogo from "@/assets/setup-logo.png";
import TrmnlLogo from "@/assets/trmnl-logo.svg";
import { Button } from "@/components/ui/button";
import { Colors } from "@/sdk/trmnl";
import { useConfigStore } from "@/stores/config";
import FullscreenIcon from "~icons/material-symbols/fullscreen-rounded";

const config = useConfigStore();

const props = defineProps<{ imageSrc?: string }>();

const { toggle, isFullscreen } = useFullscreen(useTemplateRef("screen"));

const color = computed(() => Colors[config.device]);

const imageSrc = computed(() => props.imageSrc || setupLogo);
</script>

<template>
  <div class="relative w-full" @dblclick="toggle">
    <svg viewBox="0 0 850 570">
      <!-- Background -->
      <rect
        x="0"
        y="0"
        width="850"
        height="570"
        rx="10"
        ry="10"
        :fill="color?.color"
        class="transition-colors"
      />

      <!-- Logo -->
      <TrmnlLogo href="#trmnl-logo" x="365" y="522" width="120" height="30" opacity="0.25" />

      <!-- Screen -->
      <mask id="screen-mask" mask-type="alpha">
        <rect x="25" y="25" width="800" height="480" rx="5" ry="5" />
      </mask>
      <filter id="inset-shadow">
        <!-- Shadow offset -->
        <feOffset dx="0" dy="0" />
        <!-- Shadow blur -->
        <feGaussianBlur stdDeviation="30" result="offset-blur" />
        <!-- Invert drop shadow to make an inset shadow -->
        <feComposite operator="out" in="SourceAlpha" in2="offset-blur" result="inverse" />
        <!-- Cut color inside shadow -->
        <feFlood flood-color="black" flood-opacity=".55" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        <!-- Placing shadow over element -->
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>
      <rect
        x="25"
        y="25"
        width="800"
        height="480"
        fill="#f7f7f7"
        filter="url(#inset-shadow)"
        mask="url(#screen-mask)"
      />

      <image
        ref="screenRef"
        :href="imageSrc"
        x="25"
        y="25"
        width="800"
        height="480"
        class="mix-blend-multiply"
        mask="url(#screen-mask)"
      />
    </svg>

    <img ref="screen" :src="imageSrc" alt="TRMNL Screen" :class="{ hidden: !isFullscreen }" />

    <Button
      @click="toggle"
      class="absolute right-0 bottom-0 size-6 sm:size-9 rounded-none rounded-tl-lg"
      :style="{ color: color?.text }"
      :class="{ 'mix-blend-difference': !color?.text }"
      variant="ghost"
      size="icon"
    >
      <FullscreenIcon />
    </Button>
  </div>
</template>
