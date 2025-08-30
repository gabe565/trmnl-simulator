<script setup lang="ts">
import { computed } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CloseIcon from "~icons/material-symbols/close-small-rounded";

type Option = string | { label: string; value: string };

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    options: Option[];
    clearable?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: "Select…",
    size: "default",
  },
);

const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const normalized = computed(() =>
  props.options.map((o) =>
    typeof o === "string" ? { label: String(o), value: o } : { label: o.label, value: o.value },
  ),
);

const selected = computed({
  get: () => props.modelValue ?? "",
  set: (v: string) => emits("update:modelValue", v),
});
</script>

<template>
  <Select v-model="selected" class="flex">
    <SelectTrigger v-bind="$attrs">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <template v-if="clearable">
        <SelectItem :value="null"> <CloseIcon /> Clear </SelectItem>
        <SelectSeparator />
      </template>
      <SelectItem v-for="opt in normalized" :key="opt.value" :value="String(opt.value)">
        {{ opt.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
