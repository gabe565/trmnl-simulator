<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";
import VisibilityOffIcon from "~icons/material-symbols/visibility-off-rounded";
import VisibilityIcon from "~icons/material-symbols/visibility-rounded";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    id?: string;
    masked?: boolean;
  }>(),
  {
    modelValue: "",
    placeholder: "",
    masked: true,
  },
);

const emits = defineEmits<{ (e: "update:modelValue", v: string): void }>();
const model = useVModel(props, "modelValue", emits, { passive: true, defaultValue: "" });
const show = ref(!props.masked);
</script>

<template>
  <div class="relative">
    <Input
      :id="id"
      v-model="model"
      :type="show ? 'text' : 'password'"
      :placeholder="placeholder"
      class="pr-20"
    />
    <div class="absolute inset-y-0 right-2 flex items-center gap-1">
      <Button type="button" variant="ghost" size="icon" class="h-7 w-7" @click="show = !show">
        <VisibilityIcon v-if="!show" class="size-4" />
        <VisibilityOffIcon v-else class="size-4" />
      </Button>
    </div>
  </div>
</template>
