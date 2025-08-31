<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import GitHubIcon from "~icons/simple-icons/github";
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button
        as="a"
        href="https://github.com/gabe565/trmnl-simulator"
        target="_blank"
        variant="ghost"
        size="icon"
        class="rounded-full"
      >
        <GitHubIcon />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">View source on GitHub</TooltipContent>
  </Tooltip>
</template>
