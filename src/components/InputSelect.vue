<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CloseIcon from "~icons/material-symbols/close-rounded";

type Option = string | { label: string; value: string; secondary?: string };

const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    options: Option[];
    id?: string;
    clearable?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: "Select…",
  },
);

const normalized = computed(() =>
  props.options.map((o) =>
    typeof o === "string"
      ? { label: String(o), value: o }
      : { label: o.label, value: o.value, secondary: o.secondary },
  ),
);

const selectedOption = computed(() => normalized.value.find((opt) => opt.value === model.value));
</script>

<template>
  <div class="flex">
    <Select v-model="model">
      <SelectTrigger :id="id" v-bind="$attrs" class="w-full">
        <SelectValue :placeholder="placeholder">
          {{ selectedOption?.label }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="opt in normalized" :key="opt.value" :value="String(opt.value)">
          <div class="flex w-full items-center justify-between gap-4">
            <SelectItemText>{{ opt.label }}</SelectItemText>
            <span v-if="opt.secondary" class="text-muted-foreground text-xs">
              {{ opt.secondary }}
            </span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
    <Button
      variant="ghost"
      size="icon"
      @click="model = undefined"
      :disabled="!model"
      class="ml-1"
      v-if="clearable"
    >
      <CloseIcon />
    </Button>
    <slot name="append" />
  </div>
</template>
