<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CloseIcon from "~icons/material-symbols/close-rounded";

type Option = string | { label: string; value: string };

const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    options: Option[];
    clearable?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: "Select…",
    clearable: true,
  },
);

const normalized = computed(() =>
  props.options.map((o) =>
    typeof o === "string" ? { label: String(o), value: o } : { label: o.label, value: o.value },
  ),
);
</script>

<template>
  <div class="flex">
    <Select v-model="model">
      <SelectTrigger v-bind="$attrs" class="w-full">
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="opt in normalized" :key="opt.value" :value="String(opt.value)">
          {{ opt.label }}
        </SelectItem>
      </SelectContent>
    </Select>
    <Button variant="ghost" size="icon" @click="model = undefined" :disabled="!model" class="ml-1">
      <CloseIcon />
    </Button>
    <slot name="append" />
  </div>
</template>
