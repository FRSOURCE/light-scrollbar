<template>
  <AddItem @click="numberOfAdditionalElements += $event"></AddItem>
  <ScrollbarTemplate :additional-elements-number="numberOfAdditionalElements"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { attach } from "../assets/dist/index.modern.mjs";
import { rail } from "../assets/dist/rail.modern.mjs";
import AddItem from './addItem.vue';
import ScrollbarTemplate from './scrollbarTemplate.vue';

const numberOfAdditionalElements = ref(0);

onMounted(() => {
  const scrollbarContainerElement = document.querySelector(".my-scrollbar");
  attach(scrollbarContainerElement, {
    enableRail: true,
    plugins: [rail],
    bar: { y: { offset: [2, 0] }, x: { offset: [0, 2] } },
    rail: { y: { width: 10, offset: [0, 0] }, x: { height: 10, offset: [0, 0] } },
  });
})
</script>

<style lang="scss">
  @use '../assets/scss/examples';
  @use '../assets/dist/index';
  @use '../assets/dist/rail';
</style>
