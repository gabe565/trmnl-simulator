<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Colors } from "@/sdk/trmnl";

const model = defineModel<number>();
</script>

<template>
  <TooltipProvider>
    <fieldset class="flex space-x-3">
      <Tooltip v-for="(color, k) in Colors" :key="color.label">
        <TooltipTrigger as-child>
          <input
            type="radio"
            class="appearance-none cursor-pointer size-6 rounded-full transition-all border-2 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-300 outline-gray-500 dark:outline-gray-300 checked:outline-offset-1 checked:border-0 checked:outline-2"
            :style="{ 'background-color': color.color }"
            @change="model = k"
            name="color"
            :value="color.label"
            :checked="model === k"
          />
        </TooltipTrigger>
        <TooltipContent side="bottom">{{ color.label }}</TooltipContent>
      </Tooltip>
    </fieldset>
  </TooltipProvider>
</template>
