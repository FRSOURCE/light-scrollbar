<template>
  <AddItem :instance="innerElementRef"></AddItem>
  <ScrollbarTemplate/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { attach } from "../assets/dist/index.modern.mjs";
import AddItem from './addItem.vue';
import ScrollbarTemplate from './scrollbarTemplate.vue';

const innerElementRef = ref();
onMounted(() => {
  const scrollbarContainerElement = document.querySelector(".my-scrollbar");
  const { innerElement } = attach(scrollbarContainerElement);
  innerElementRef.value = innerElement;
})
</script>

<style lang="scss">
  @import '../assets/scss/examples.scss';
  @import '../assets/dist/index.css';
</style>
