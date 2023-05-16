<template>
  <AddItem @click="numberOfAdditionalElements += $event"></AddItem>
  <ScrollbarTemplate :additional-elements-number="numberOfAdditionalElements"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { attach, WrapperPlacement } from "../assets/dist/index.modern.mjs";
import AddItem from './addItem.vue';
import ScrollbarTemplate from './scrollbarTemplate.vue';

const numberOfAdditionalElements = ref(0);

onMounted(() => {
  const scrollbarContainerElement = document.querySelector(".my-scrollbar");
  attach(scrollbarContainerElement, {
    wrapperPlacement: WrapperPlacement.outside
  });
})
</script>

<style lang="scss">
  @import '../assets/scss/examples.scss';
  @import '../assets/dist/index.css';
</style>
