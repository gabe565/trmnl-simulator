<script setup lang="ts">
import Card from "./ui/card/Card.vue";
import CardContent from "./ui/card/CardContent.vue";
import CardHeader from "./ui/card/CardHeader.vue";
import CardTitle from "./ui/card/CardTitle.vue";
import { UseTimeAgo } from "@vueuse/components";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

defineProps<{
  nextUpdate: Date | null;
}>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Info</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Next Update</TableCell>
            <TableCell>
              <UseTimeAgo
                v-slot="{ timeAgo }"
                :time="nextUpdate"
                v-if="nextUpdate"
                :show-second="true"
                :update-interval="1000"
              >
                {{ timeAgo }}
              </UseTimeAgo>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
