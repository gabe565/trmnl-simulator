<script setup lang="ts">
import { computed } from "vue";
import { Slider } from "@/components/ui/slider";

const model = defineModel<number>();

const normalized = computed(() => (model.value === undefined ? null : [model.value]));
</script>

<template>
  <Slider
    id="battery"
    :model-value="normalized"
    @update:model-value="model = $event![0]"
    :min="0"
    :max="100"
  />
  <div class="flex justify-center">{{ model }}%</div>
</template>
