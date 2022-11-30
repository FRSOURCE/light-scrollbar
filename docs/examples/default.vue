<template>
  <AddItem :instance="innerElementRef"></AddItem>
  <ScrollbarTemplate/>
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

const innerElementRef = ref();
onMounted(() => {
  let instance: ReturnType<typeof attach>;
  watch(showOnHover, showOnHover => {
    if(innerElementRef.value) {
      instance?.detach();
      innerElementRef.value = null;
    }
    if(!innerElementRef.value) {
      const scrollbarContainerElement = document.querySelector(".my-scrollbar");
      instance = attach(scrollbarContainerElement, { showOnHover });
      innerElementRef.value = instance?.innerElement;
    }
  }, { immediate: true });
});
</script>

<style lang="scss">
  @import '../assets/scss/examples.scss';
  @import '../assets/dist/index.css';
</style>
