<script setup lang="ts">
import Card from "./ui/card/Card.vue";
import CardContent from "./ui/card/CardContent.vue";
import CardHeader from "./ui/card/CardHeader.vue";
import CardTitle from "./ui/card/CardTitle.vue";
import { UseTimeAgo } from "@vueuse/components";
import { CardAction } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import InfoIcon from "~icons/material-symbols/info-rounded";

defineProps<{
  nextUpdate?: Date;
}>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Info</CardTitle>
      <CardAction>
        <InfoIcon />
      </CardAction>
    </CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell class="w-1/2">Next Update</TableCell>
            <TableCell class="w-1/2">
              <UseTimeAgo
                v-slot="{ timeAgo }"
                :time="nextUpdate"
                v-if="nextUpdate"
                :show-second="true"
                :update-interval="1000"
              >
                {{ timeAgo }}
              </UseTimeAgo>
              <template v-else>-</template>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
