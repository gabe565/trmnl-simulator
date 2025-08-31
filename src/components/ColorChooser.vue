<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Colors } from "@/sdk/trmnl";

const model = defineModel<number>();
</script>

<template>
  <TooltipProvider>
    <div class="flex space-x-3 pl-1">
      <Tooltip v-for="(color, k) in Colors" :key="color.label">
        <TooltipTrigger as-child>
          <button
            class="w-5 h-5 rounded-full transition-all outline-0 outline-gray-400 outline-offset-2 hover:outline-2 data-[active=true]:outline-2 data-[active=true]:outline-gray-200"
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
