<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Colors } from "@/sdk/trmnl";

const model = defineModel<number>();
</script>

<template>
  <TooltipProvider>
    <div class="flex space-x-3">
      <Tooltip v-for="(color, k) in Colors" :key="color.label">
        <TooltipTrigger as-child>
          <button
            class="size-6 rounded-full transition-all border-2 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-300 outline-gray-500 dark:outline-gray-300 data-[active=true]:outline-offset-1 data-[active=true]:border-0 data-[active=true]:outline-2"
            :style="{ 'background-color': color.color }"
            @click="model = k"
            :data-active="model === k"
          />
        </TooltipTrigger>
        <TooltipContent side="bottom">{{ color.label }}</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
