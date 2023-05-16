<template>
  <AddItem @click="numberOfAdditionalElements += $event"></AddItem>
  <ScrollbarTemplate :additional-elements-number="numberOfAdditionalElements"/>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
import { attach } from "../assets/dist/index.modern.mjs";
import AddItem from './addItem.vue';
import ScrollbarTemplate from './scrollbarTemplate.vue';

const props = defineProps({
  showOnHover: {
    type: Boolean,
    default: false
  }
});
const { showOnHover } = toRefs(props);

const numberOfAdditionalElements = ref(0);

onMounted(() => {
  let instance: ReturnType<typeof attach>;
  watch(showOnHover, showOnHover => {
    instance?.detach();
    const scrollbarContainerElement = document.querySelector(".my-scrollbar");
    instance = attach(scrollbarContainerElement, { showOnHover });
  }, { immediate: true });
});
</script>

<style lang="scss">
  @import '../assets/scss/examples.scss';
  @import '../assets/dist/index.css';
</style>
