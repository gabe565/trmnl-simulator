<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import InputSelect from "@/components/InputSelect.vue";
import { Button } from "@/components/ui/button";
import { getModels } from "@/sdk/trmnl";
import { useCloudStore } from "@/stores/cloud.ts";
import { useDeviceStore } from "@/stores/device.ts";
import RefreshIcon from "~icons/material-symbols/refresh-rounded";

const model = defineModel<string>();

const cloud = useCloudStore();
const device = useDeviceStore();

const options = computed(() => cloud.models.map(({ label, name }) => ({ label, value: name })));
const loading = ref(false);

onMounted(async () => {
  if (cloud.models.length === 0) {
    await update();
  }
});

const update = async () => {
  loading.value = true;
  try {
    cloud.models = await getModels();
  } catch (err) {
    console.error(err);
    device.error = err;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <InputSelect v-model="model" :options="options" :disabled="loading" class="w-full" clearable>
    <template #append>
      <Button @click="update" variant="ghost" size="icon">
        <RefreshIcon :class="{ 'animate-spin': loading }" />
      </Button>
    </template>
  </InputSelect>
</template>
