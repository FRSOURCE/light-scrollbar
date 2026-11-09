<template>
  <div class="custom-scrollbar">
    <AddItem @click="numberOfAdditionalElements += $event"></AddItem>
    <ScrollbarTemplate :additional-elements-number="numberOfAdditionalElements"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { attach } from "../assets/dist/index.modern.mjs";
import { rail } from "../assets/dist/rail.modern.mjs";
import AddItem from './addItem.vue';
import ScrollbarTemplate from './scrollbarTemplate.vue';

const numberOfAdditionalElements = ref(0);

onMounted(() => {
  const scrollbarContainerElement = document.querySelector(".custom-scrollbar .my-scrollbar");
  attach(scrollbarContainerElement, {
    enableRail: true,
    plugins: [rail],
    bar: { y: { width: 6, offset: [3, 0] }, x: { height: 6, offset: [0, 3] } },
    rail: { y: { width: 12, offset: [0, 0] }, x: { height: 12, offset: [0, 0] } },
  });
})
</script>

<style lang="scss">
  @use '../assets/scss/examples';
  @use '../assets/dist/index';
  @use '../assets/dist/rail';
  @use './customStyles';
</style>
